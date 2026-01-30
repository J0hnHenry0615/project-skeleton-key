// src/components/blocks/TimelineStepsBlock.js

import Image from 'next/image';

export default function TimelineStepsBlock({ data }) {
  const {
    section_heading,
    section_description,
    steps,
    layout_style = 'vertical',
    background_color = 'white',
  } = data;

  if (!steps || steps.length === 0) {
    return null;
  }

  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50',
  };

  return (
    <section className={`py-20 ${bgColors[background_color]}`}>
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        {(section_heading || section_description) && (
          <div className="text-center mb-16 max-w-3xl mx-auto">
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

        {/* Vertical Timeline */}
        {layout_style === 'vertical' && (
          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const stepNumber = step.step_number || String(index + 1).padStart(2, '0');
              
              return (
                <div key={index} className="relative pl-12 pb-12 last:pb-0">
                  {/* Timeline Line */}
                  {index !== steps.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-blue-200" />
                  )}

                  {/* Step Number Circle */}
                  <div className="absolute left-0 top-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {stepNumber}
                  </div>

                  {/* Step Content */}
                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      {step.step_icon?.url && (
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={step.step_icon.url}
                            alt={step.step_title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 text-gray-900">
                          {step.step_title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.step_description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Horizontal Steps */}
        {layout_style === 'horizontal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => {
              const stepNumber = step.step_number || String(index + 1).padStart(2, '0');
              
              return (
                <div key={index} className="relative">
                  {/* Arrow */}
                  {index !== steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 text-blue-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}

                  {/* Step Card */}
                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all h-full">
                    {/* Step Number */}
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg">
                      {stepNumber}
                    </div>

                    {/* Icon */}
                    {step.step_icon?.url && (
                      <div className="relative w-16 h-16 mb-4">
                        <Image
                          src={step.step_icon.url}
                          alt={step.step_title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {step.step_title}
                    </h3>
                    <p className="text-gray-600">
                      {step.step_description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}