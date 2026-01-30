// src/components/blocks/PricingPlansBlock.js

import Link from 'next/link';

export default function PricingPlansBlock({ data }) {
  const {
    section_heading,
    section_description,
    plans,
    background_color = 'gray',
  } = data;

  if (!plans || plans.length === 0) {
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

        {/* Pricing Cards - Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative ${
                plan.is_featured 
                  ? 'bg-blue-600 text-white z-10 md:shadow-2xl' 
                  : 'bg-white text-gray-900'
              } ${
                index === 0 ? 'md:rounded-l-2xl' : ''
              } ${
                index === plans.length - 1 ? 'md:rounded-r-2xl' : ''
              } ${
                !plan.is_featured ? 'border border-gray-200' : ''
              }`}
            >
              {/* Plan Content */}
              <div className="p-8 md:p-10">
                {/* Plan Name */}
                <h3 className={`text-2xl font-bold mb-3 ${
                  plan.is_featured ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.plan_name}
                </h3>

                {/* Plan Description */}
                {plan.plan_description && (
                  <p className={`text-sm mb-8 ${
                    plan.is_featured ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {plan.plan_description}
                  </p>
                )}

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-bold ${
                      plan.is_featured ? 'text-white' : 'text-gray-900'
                    }`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ${
                      plan.is_featured ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      / {plan.billing_period.replace('per ', '')}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={plan.button_link || '#'}
                  className={`block w-full text-center font-semibold py-3 px-6 rounded-lg transition-all mb-8 ${
                    plan.is_featured
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-600'
                  }`}
                >
                  {plan.button_text || 'Get Started'}
                </Link>

                {/* Features List */}
                {plan.features && plan.features.length > 0 && (
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        {feature.feature_included ? (
                          <svg 
                            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                              plan.is_featured ? 'text-white' : 'text-blue-600'
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg 
                            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                              plan.is_featured ? 'text-blue-300' : 'text-gray-300'
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={`text-sm ${
                          feature.feature_included 
                            ? (plan.is_featured ? 'text-white' : 'text-gray-700')
                            : (plan.is_featured ? 'text-blue-200 line-through' : 'text-gray-400 line-through')
                        }`}>
                          {feature.feature_text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}