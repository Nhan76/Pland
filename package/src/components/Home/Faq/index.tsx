// components/Faq.js
"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusIcon } from "lucide-react";

const faqData = [
  {
    question: "What is PLAND?",
    answer:
      "PLAND is an AI-driven portfolio command center for crypto investors who want clearer analysis, disciplined execution, and transparent reasoning.",
  },
  {
    question: "Who is PLAND built for?",
    answer: "PLAND is built for retail investors, active portfolio operators, and small teams that need a structured way to evaluate multiple assets together.",
  },
  {
    question: "How does the multi-agent workflow help?",
    answer:
      "It separates analysis into specialized roles, lets bullish and bearish cases challenge each other, and then applies a final risk review before any action is suggested.",
  },
  {
    question: "Why is explainability important in PLAND?",
    answer:
      "Every recommendation keeps an audit trail, so the investor can inspect what data mattered, how the debate changed, and why the final answer was produced.",
  },
  {
    question: "Does PLAND replace investor judgment?",
    answer:
      "No. PLAND is designed to support disciplined decisions, not hide them behind a black box. The final call stays with the user.",
  },
  {
    question: "What risk controls does PLAND support?",
    answer:
      "PLAND is designed around cash awareness, concentration checks, weak-trend exposure review, and other portfolio-level guardrails that keep actions inside defined limits.",
  },
];

const Faq = () => {
  return (
    <section id="faq" className=" py-16 text-white">
      <div className="container">
        <div className=" mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-green-400 uppercase text-sm">
              Popular questions
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2">
              Learn more about PLAND
            </h2>
            <p className="text-gray-400 mt-2">
              Clear answers on how PLAND evaluates portfolios and risk
            </p>
          </div>
          <Accordion className="space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/5 rounded-lg border-none px-4"
              >
                <AccordionTrigger className="text-lg font-medium hover:no-underline py-4 **:data-[slot=accordion-trigger-icon]:hidden">
                  {item.question}
                  <PlusIcon className="w-6 h-6 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-45" />
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
