// src/components/blocks/FaqAccordionBlock.js

'use client';

import { useState } from 'react';

export default function FaqAccordionBlock({ data }) {
  const {
    section_heading,
    section_description,
    faq_items,
    layout_style = 'single',
    background_color = 'white',
    first_open = true,
  } = data;

  // State to track which FAQ is open
  const [openIndex, setOpenIndex] = useState(first_open ? 0 : null);

  // Don't render if no FAQ items
  if (!faq_items || faq_items.length === 0) {
    return null;
  }

  // Toggle FAQ open/closed
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Map background colors
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
  };

  // Split FAQs into two columns if needed
  const midPoint = Math.ceil(faq_items.length / 2);
  const leftColumn = layout_style === 'two' ? faq_items.slice(0, midPoint) : faq_items;
  const rightColumn = layout_style === 'two' ? faq_items.slice(midPoint) : [];

  // Single FAQ Item Component
  const FaqItem = ({ item, index }) => {
    const isOpen = openIndex === index;

    return (
      <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
        {/* Question Button */}
        <button
          onClick={() => toggleFaq(index)}
          className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
          aria-expanded={isOpen}
        >
          <span className="text-lg font-semibold text-gray-900 pr-8">
            {item.question}
          </span>
          
          {/* Toggle Icon */}
          <svg
            className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Answer */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 pb-6 pt-2">
            <div
              className="prose prose-blue max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={`py-20 ${bgColors[background_color] || 'bg-white'}`}>
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        {(section_heading || section_description) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            {section_heading && (
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                {section_heading}
              </h2>
            )}
            {section_description && (
              <p className="text-xl text-gray-600">
                {section_description}
              </p>
            )}
          </div>
        )}

        {/* FAQ Grid */}
        <div className="max-w-5xl mx-auto">
          {layout_style === 'single' ? (
            // Single Column Layout
            <div>
              {faq_items.map((item, index) => (
                <FaqItem key={index} item={item} index={index} />
              ))}
            </div>
          ) : (
            // Two Column Layout
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                {leftColumn.map((item, index) => (
                  <FaqItem key={index} item={item} index={index} />
                ))}
              </div>
              
              {/* Right Column */}
              <div>
                {rightColumn.map((item, index) => (
                  <FaqItem
                    key={index + midPoint}
                    item={item}
                    index={index + midPoint}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

              {/* Contact CTA (Optional) */}
            <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
                Still have questions?
            </p>

            <a
                href="/contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
                Contact Us
            </a>
            </div>

      </div>
    </section>
  );
}