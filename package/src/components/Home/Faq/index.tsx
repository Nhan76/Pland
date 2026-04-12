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
    question: "What is Pland?",
    answer:
      "Pland is a focused landing page for crypto spot trading products, designed to present pricing, services, and trust signals clearly.",
  },
  {
    question: "Who is Pland built for?",
    answer: "Pland fits exchanges, brokers, wallets, and fintech teams that need a polished go-to-market page.",
  },
  {
    question: "Can I adapt Pland to my own brand?",
    answer:
      "Yes. Colors, copy, section order, and imagery can be tailored to match your product and campaign goals.",
  },
  {
    question: "Does Pland work well on mobile devices?",
    answer:
      "Yes. The layout is responsive and designed to keep key conversion paths clear on smaller screens.",
  },
  {
    question: "How quickly can I launch with Pland?",
    answer:
      "Most teams can publish a branded version quickly because the page structure and core sections are already in place.",
  },
  {
    question: "Can Pland support ongoing growth experiments?",
    answer:
      "Yes. You can iterate on headlines, CTAs, service blocks, and trust sections without rebuilding the entire page.",
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
              Learn more about Pland
            </h2>
            <p className="text-gray-400 mt-2">
              A focused landing system for crypto spot trading teams
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
