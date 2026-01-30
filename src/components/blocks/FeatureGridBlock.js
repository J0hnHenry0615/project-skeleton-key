// src/components/blocks/FeatureGridBlock.js

import Image from 'next/image';

export default function FeatureGridBlock({ data }) {
  const {
    section_heading,
    section_description,
    columns = '3',
    features,
    background_color = 'white',
  } = data;

  // Don't render if no features
  if (!features || features.length === 0) {
    return null;
  }

  // Map columns to Tailwind grid classes
  const gridCols = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  // Map background colors
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
  };

  return (
    <section className={`py-20 ${bgColors[background_color] || 'bg-white'}`}>
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

        {/* Features Grid */}
        <div className={`grid ${gridCols[columns]} gap-8`}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group text-center p-8 rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              {/* Icon */}
              {feature.icon?.url && (
                <div className="mb-6 flex justify-center">
                  <div className="relative w-16 h-16 transform group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={feature.icon.url}
                      alt={feature.icon.alt || feature.title || 'Feature icon'}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                </div>
              )}

              {/* Title */}
              {feature.title && (
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
              )}

              {/* Description */}
              {feature.description && (
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}