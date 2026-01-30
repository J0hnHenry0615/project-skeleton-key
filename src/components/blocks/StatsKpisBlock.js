// src/components/blocks/StatsKpisBlock.js

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function StatsKpisBlock({ data }) {
  const {
    section_heading,
    section_description,
    stats,
    layout_style = 'grid',
    background_color = 'blue',
  } = data;

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!stats || stats.length === 0) {
    return null;
  }

  const bgColors = {
    white: 'bg-white',
    blue: 'bg-blue-50',
    gray: 'bg-gray-50',
  };

  return (
    <section ref={sectionRef} className={`py-20 ${bgColors[background_color]}`}>
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

        {/* Stats Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} gap-8 md:gap-12 max-w-6xl mx-auto`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              {stat.icon?.url && (
                <div className="mb-4 flex justify-center">
                  <div className="relative w-16 h-16">
                    <Image
                      src={stat.icon.url}
                      alt={stat.label || 'Stat icon'}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Number */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>

              {/* Label */}
              <div className="text-gray-700 font-medium text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}