"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  Mesh,
  NormalBlending,
  OrthographicCamera,
  RawShaderMaterial,
  SRGBColorSpace,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";

import { cn } from "@/lib/utils";

import {
  LASER_FLOW_FRAGMENT_SHADER,
  LASER_FLOW_VERTEX_SHADER,
} from "./laserFlowShader";

type LaserFlowProps = {
  className?: string;
  style?: CSSProperties;
  /** When false a single still frame is rendered (e.g. reduced motion). */
  animate?: boolean;
  /**
   * Upper bound for the canvas pixel ratio. The effect is a soft glow, so it
   * does not need the full device pixel ratio to look crisp.
   */
  maxPixelRatio?: number;
  wispDensity?: number;
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  flowSpeed?: number;
  verticalSizing?: number;
  horizontalSizing?: number;
  fogIntensity?: number;
  fogScale?: number;
  wispSpeed?: number;
  wispIntensity?: number;
  flowStrength?: number;
  decay?: number;
  falloffStart?: number;
  fogFallSpeed?: number;
  color?: string;
};

type LaserFlowUniforms = {
  iResolution: { value: Vector3 };
  uTime: { value: number };
  uWispDensity: { value: number };
  uBeamXFrac: { value: number };
  uBeamYFrac: { value: number };
  uFlowSpeed: { value: number };
  uVLenFactor: { value: number };
  uHLenFactor: { value: number };
  uFogIntensity: { value: number };
  uFogScale: { value: number };
  uWSpeed: { value: number };
  uWIntensity: { value: number };
  uFlowStrength: { value: number };
  uDecay: { value: number };
  uFalloffStart: { value: number };
  uFogFallSpeed: { value: number };
  uColor: { value: Vector3 };
  uFade: { value: number };
};

/** Render at most ~60 fps, even on 120 Hz+ displays. */
const TARGET_FRAME_MS = 1000 / 60;
const FRAME_SLACK_MS = 1;
const MIN_STEP_S = 0.001;
const MAX_STEP_S = 0.033;
const FADE_IN_S = 1;

/**
 * Adaptive quality: when the GPU cannot sustain the target frame rate, lower
 * the render scale. It only ever steps down so the drawing buffer is not
 * reallocated back and forth (each resize is an expensive GPU allocation).
 */
const PERF_WINDOW_MS = 2000;
const LOW_FPS_THRESHOLD = 45;
const PIXEL_RATIO_STEP = 0.75;
const MIN_PIXEL_RATIO = 0.5;

const FULLSCREEN_TRIANGLE = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]);

const LaserFlow = ({
  className,
  style,
  animate = true,
  maxPixelRatio = 1,
  wispDensity = 1,
  horizontalBeamOffset = 0.1,
  verticalBeamOffset = 0,
  flowSpeed = 0.35,
  verticalSizing = 2,
  horizontalSizing = 0.5,
  fogIntensity = 0.45,
  fogScale = 0.3,
  wispSpeed = 15,
  wispIntensity = 5,
  flowStrength = 0.25,
  decay = 1.1,
  falloffStart = 1.2,
  fogFallSpeed = 0.6,
  color = "#FF79C6",
}: LaserFlowProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const uniformsRef = useRef<LaserFlowUniforms | null>(null);
  const requestRenderRef = useRef<() => void>(() => {});

  useEffect(() => {
    const mountElement = mountRef.current;

    if (!mountElement) {
      return;
    }

    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    mountElement.appendChild(canvas);

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(FULLSCREEN_TRIANGLE, 3));

    const uniforms: LaserFlowUniforms = {
      iResolution: { value: new Vector3(1, 1, 1) },
      uTime: { value: 0 },
      uWispDensity: { value: 1 },
      uBeamXFrac: { value: 0 },
      uBeamYFrac: { value: 0 },
      uFlowSpeed: { value: 0 },
      uVLenFactor: { value: 1 },
      uHLenFactor: { value: 1 },
      uFogIntensity: { value: 0 },
      uFogScale: { value: 1 },
      uWSpeed: { value: 0 },
      uWIntensity: { value: 0 },
      uFlowStrength: { value: 0 },
      uDecay: { value: 1 },
      uFalloffStart: { value: 1 },
      uFogFallSpeed: { value: 0 },
      uColor: { value: new Vector3(1, 1, 1) },
      uFade: { value: animate ? 0 : 1 },
    };
    uniformsRef.current = uniforms;

    const material = new RawShaderMaterial({
      vertexShader: LASER_FLOW_VERTEX_SHADER,
      fragmentShader: LASER_FLOW_FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: NormalBlending,
    });

    const mesh = new Mesh(geometry, material);
    mesh.frustumCulled = false;

    const scene = new Scene();
    scene.add(mesh);
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let pixelRatio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
    let isReady = false;
    let isInView = false;
    let isContextLost = false;
    let frameId = 0;
    let frameSlotAt = 0;
    let lastFrameAt = 0;
    let perfWindowStart = 0;
    let perfWindowFrames = 0;

    const draw = () => {
      if (isReady && !isContextLost) {
        renderer.render(scene, camera);
      }
    };

    const resize = () => {
      const width = mountElement.clientWidth || 1;
      const height = mountElement.clientHeight || 1;

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      uniforms.iResolution.value.set(width * pixelRatio, height * pixelRatio, pixelRatio);
      draw();
    };

    const resetPerfWindow = (now: number) => {
      perfWindowStart = now;
      perfWindowFrames = 0;
    };

    const adaptPixelRatio = (now: number) => {
      perfWindowFrames += 1;
      const elapsed = now - perfWindowStart;

      if (elapsed < PERF_WINDOW_MS) {
        return;
      }

      const fps = (perfWindowFrames * 1000) / elapsed;
      resetPerfWindow(now);

      if (fps < LOW_FPS_THRESHOLD && pixelRatio > MIN_PIXEL_RATIO) {
        pixelRatio = Math.max(MIN_PIXEL_RATIO, pixelRatio * PIXEL_RATIO_STEP);
        resize();
      }
    };

    const tick = (now: number) => {
      frameId = requestAnimationFrame(tick);

      const sinceFrameSlot = now - frameSlotAt;

      if (sinceFrameSlot < TARGET_FRAME_MS - FRAME_SLACK_MS) {
        return;
      }

      // Keep frame slots aligned to the target cadence so high refresh-rate
      // displays settle at ~60 fps instead of drifting to a lower rate.
      frameSlotAt = now - (sinceFrameSlot % TARGET_FRAME_MS);

      const step = Math.min(MAX_STEP_S, Math.max(MIN_STEP_S, (now - lastFrameAt) / 1000));
      lastFrameAt = now;

      uniforms.uTime.value += step;

      if (uniforms.uFade.value < 1) {
        uniforms.uFade.value = Math.min(1, uniforms.uFade.value + step / FADE_IN_S);
      }

      draw();
      adaptPixelRatio(now);
    };

    const stopLoop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    // The loop only runs while the canvas is on screen, the tab is visible and
    // the shader is compiled; otherwise no frames are requested at all.
    const syncLoop = () => {
      const shouldRun =
        animate && isReady && isInView && !isContextLost && !document.hidden;

      if (!shouldRun) {
        stopLoop();
        return;
      }

      if (frameId === 0) {
        const now = performance.now();
        frameSlotAt = now - TARGET_FRAME_MS;
        lastFrameAt = frameSlotAt;
        resetPerfWindow(now);
        frameId = requestAnimationFrame(tick);
      }
    };

    requestRenderRef.current = () => {
      if (frameId === 0) {
        draw();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mountElement);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isInView = entry?.isIntersecting ?? false;
      syncLoop();
    });
    intersectionObserver.observe(mountElement);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      isContextLost = true;
      syncLoop();
    };

    const onContextRestored = () => {
      isContextLost = false;
      resize();
      syncLoop();
    };

    document.addEventListener("visibilitychange", syncLoop);
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    let isDisposed = false;
    resize();

    // Compile off the main thread (KHR_parallel_shader_compile) so the intro
    // animation does not stall on shader compilation.
    renderer
      .compileAsync(scene, camera)
      .catch(() => undefined)
      .then(() => {
        if (isDisposed) {
          return;
        }

        isReady = true;
        draw();
        syncLoop();
      });

    return () => {
      isDisposed = true;
      stopLoop();
      requestRenderRef.current = () => {};
      uniformsRef.current = null;

      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", syncLoop);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    };
  }, [animate, maxPixelRatio]);

  useEffect(() => {
    const uniforms = uniformsRef.current;

    if (!uniforms) {
      return;
    }

    uniforms.uWispDensity.value = wispDensity;
    uniforms.uBeamXFrac.value = horizontalBeamOffset;
    uniforms.uBeamYFrac.value = verticalBeamOffset;
    uniforms.uFlowSpeed.value = flowSpeed;
    uniforms.uVLenFactor.value = verticalSizing;
    uniforms.uHLenFactor.value = horizontalSizing;
    uniforms.uFogIntensity.value = fogIntensity;
    uniforms.uFogScale.value = fogScale;
    uniforms.uWSpeed.value = wispSpeed;
    uniforms.uWIntensity.value = wispIntensity;
    uniforms.uFlowStrength.value = flowStrength;
    uniforms.uDecay.value = decay;
    uniforms.uFalloffStart.value = falloffStart;
    uniforms.uFogFallSpeed.value = fogFallSpeed;

    // The shader expects the raw (non-linearised) sRGB channels of the color.
    const { r, g, b } = new Color(color).getRGB({ r: 0, g: 0, b: 0 }, SRGBColorSpace);
    uniforms.uColor.value.set(r, g, b);

    requestRenderRef.current();
  }, [
    animate,
    maxPixelRatio,
    color,
    decay,
    falloffStart,
    flowSpeed,
    flowStrength,
    fogFallSpeed,
    fogIntensity,
    fogScale,
    horizontalBeamOffset,
    horizontalSizing,
    verticalBeamOffset,
    verticalSizing,
    wispDensity,
    wispIntensity,
    wispSpeed,
  ]);

  return <div ref={mountRef} className={cn("relative h-full w-full", className)} style={style} />;
};

export default LaserFlow;
