/**
 * Software rasterizers that browsers fall back to when the GPU is unavailable
 * or blocklisted (headless Chrome, VMs, some Linux drivers, remote desktops).
 */
const SOFTWARE_RENDERER_PATTERN = /swiftshader|llvmpipe|softpipe|software|basic render/i;

let cachedHasHardwareWebGL: boolean | undefined;

const detectHardwareWebGL = () => {
  if (typeof document === "undefined") {
    return false;
  }

  // `failIfMajorPerformanceCaveat` makes the browser refuse a context it would
  // only be able to provide through software rendering.
  const gl = document
    .createElement("canvas")
    .getContext("webgl2", { failIfMajorPerformanceCaveat: true });

  if (!gl) {
    return false;
  }

  try {
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = String(
      gl.getParameter(debugInfo ? debugInfo.UNMASKED_RENDERER_WEBGL : gl.RENDERER),
    );

    return !SOFTWARE_RENDERER_PATTERN.test(renderer);
  } finally {
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  }
};

/**
 * Whether WebGL2 is hardware accelerated. Heavy fragment shaders on a software
 * rasterizer run on the CPU and can block the main thread for seconds, so
 * shader effects should only be used when this returns true. Cached after the
 * first call.
 */
export const hasHardwareWebGL = () => {
  cachedHasHardwareWebGL ??= detectHardwareWebGL();
  return cachedHasHardwareWebGL;
};
