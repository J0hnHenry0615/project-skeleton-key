// src/components/blocks/LocationMapBlock.js

'use client';

import { useState, useEffect } from 'react';

export default function LocationMapBlock({ data }) {
  const {
    section_heading,
    section_description,
    locations,
    map_api_key,
    map_zoom = 12,
    map_style = 'roadmap', // roadmap, satellite, hybrid, terrain
    show_location_cards = true,
    background_color = 'white',
    default_center_lat,
    default_center_lng,
  } = data;

  const [selectedLocation, setSelectedLocation] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Don't render if no locations
  if (!locations || locations.length === 0) {
    return null;
  }

  // Map background colors
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
  };

  // Get center point (use first location or provided default)
  const centerLat = default_center_lat || locations[0]?.latitude || 0;
  const centerLng = default_center_lng || locations[0]?.longitude || 0;

  // Build Google Maps embed URL
  const buildMapUrl = (location) => {
    if (!location?.latitude || !location?.longitude) return null;
    
    const params = new URLSearchParams({
      q: `${location.latitude},${location.longitude}`,
      z: map_zoom,
      t: map_style === 'satellite' ? 'k' : map_style === 'hybrid' ? 'h' : 'm',
      output: 'embed',
    });

    return `https://maps.google.com/maps?${params.toString()}`;
  };

  // Build multiple markers URL for showing all locations
  const buildMultiMarkerUrl = () => {
    const markers = locations
      .filter(loc => loc.latitude && loc.longitude)
      .map(loc => `markers=${loc.latitude},${loc.longitude}`)
      .join('&');
    
    return `https://maps.google.com/maps?${markers}&z=${map_zoom}&output=embed`;
  };

  const currentMapUrl = locations.length === 1 
    ? buildMapUrl(locations[0])
    : selectedLocation !== null 
      ? buildMapUrl(locations[selectedLocation])
      : buildMultiMarkerUrl();

  // Single Location Card
  const LocationCard = ({ location, index, isSelected }) => {
    const {
      location_name,
      address,
      city,
      state,
      zip_code,
      country,
      phone,
      email,
      hours,
      additional_info,
    } = location;

    const fullAddress = [address, city, state, zip_code, country]
      .filter(Boolean)
      .join(', ');

    return (
      <div
        onClick={() => setSelectedLocation(index)}
        className={`cursor-pointer bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border-2 ${
          isSelected ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent'
        }`}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-3">{location_name}</h3>

        {/* Address */}
        {fullAddress && (
          <div className="flex items-start gap-3 mb-3">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-gray-600 text-sm">{fullAddress}</p>
          </div>
        )}

        {/* Phone */}
        {phone && (
          <div className="flex items-center gap-3 mb-3">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <a
              href={`tel:${phone}`}
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              {phone}
            </a>
          </div>
        )}

        {/* Email */}
        {email && (
          <div className="flex items-center gap-3 mb-3">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a
              href={`mailto:${email}`}
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors truncate"
            >
              {email}
            </a>
          </div>
        )}

        {/* Hours */}
        {hours && (
          <div className="flex items-start gap-3 mb-3">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-gray-600 text-sm">
              <div
                dangerouslySetInnerHTML={{ __html: hours }}
              />
            </div>
          </div>
        )}

        {/* Additional Info */}
        {additional_info && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-600 text-sm">{additional_info}</p>
          </div>
        )}

        {/* Get Directions Button */}
        {location.latitude && location.longitude && (
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Get Directions
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
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

        <div className="max-w-7xl mx-auto">
          {/* Map Container */}
          <div className="rounded-xl overflow-hidden shadow-xl mb-8">
            {currentMapUrl ? (
              <iframe
                src={currentMapUrl}
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                onLoad={() => setMapLoaded(true)}
              />
            ) : (
              <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <p className="text-gray-600">Map location not available</p>
                </div>
              </div>
            )}
          </div>

          {/* Location Cards */}
          {show_location_cards && (
            <div className={`grid gap-6 ${
              locations.length === 1 
                ? 'grid-cols-1 max-w-2xl mx-auto' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {locations.map((location, index) => (
                <LocationCard
                  key={index}
                  location={location}
                  index={index}
                  isSelected={selectedLocation === index}
                />
              ))}
            </div>
          )}

          {/* Alternative: Simple Address List (if cards disabled) */}
          {!show_location_cards && (
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
              <div className="space-y-6">
                {locations.map((location, index) => (
                  <div key={index} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {location.location_name}
                    </h3>
                    {[location.address, location.city, location.state, location.zip_code, location.country]
                      .filter(Boolean)
                      .join(', ') && (
                      <p className="text-gray-600 mb-2">
                        {[location.address, location.city, location.state, location.zip_code, location.country]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                    )}
                    {location.phone && (
                      <p className="text-gray-600">
                        Phone: <a href={`tel:${location.phone}`} className="text-blue-600 hover:underline">{location.phone}</a>
                      </p>
                    )}
                    {location.email && (
                      <p className="text-gray-600">
                        Email: <a href={`mailto:${location.email}`} className="text-blue-600 hover:underline">{location.email}</a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
