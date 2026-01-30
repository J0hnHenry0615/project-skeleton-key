// src/components/blocks/TeamProfilesBlock.js

'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function TeamProfilesBlock({ data }) {
  const {
    section_heading,
    section_description,
    team_members,
    layout_style = 'grid', // grid, list, carousel
    columns = '3', // 2, 3, 4
    background_color = 'white',
    show_social_links = true,
  } = data;

  const [activeModal, setActiveModal] = useState(null);

  // Don't render if no team members
  if (!team_members || team_members.length === 0) {
    return null;
  }

  // Map background colors
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
  };

  // Map column counts to grid classes
  const columnClasses = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  // Single Team Member Card
  const TeamMemberCard = ({ member, index }) => {
    const {
      name,
      position,
      bio,
      photo,
      email,
      phone,
      linkedin_url,
      twitter_url,
      instagram_url,
    } = member;

    return (
      <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Photo */}
        <div className="relative aspect-square overflow-hidden bg-gray-200">
          {photo?.url ? (
            <Image
              src={photo.url}
              alt={photo.alt || name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
              <svg
                className="w-24 h-24 text-blue-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
          <p className="text-blue-600 font-medium mb-3">{position}</p>

          {bio && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{bio}</p>
          )}

          {/* Contact Info */}
          {(email || phone) && (
            <div className="space-y-2 mb-4">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
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
                  <span className="truncate">{email}</span>
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
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
                  {phone}
                </a>
              )}
            </div>
          )}

          {/* Social Links */}
          {show_social_links && (linkedin_url || twitter_url || instagram_url) && (
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              {linkedin_url && (
                <a
                  href={linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
              {twitter_url && (
                <a
                  href={twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
              )}
              {instagram_url && (
                <a
                  href={instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-600 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
            </div>
          )}

          {/* View Full Bio Button (if bio is longer) */}
          {bio && bio.length > 150 && (
            <button
              onClick={() => setActiveModal(index)}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
            >
              View Full Bio
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  };

  // Modal for full bio
  const Modal = ({ member, onClose }) => {
    if (!member) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              {member.photo?.url && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={member.photo.url}
                    alt={member.photo.alt || member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-blue-600 font-semibold text-lg">{member.position}</p>
                {member.email && (
                  <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-blue-600">
                    {member.email}
                  </a>
                )}
              </div>
            </div>

            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 leading-relaxed">{member.bio}</p>
            </div>
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

        {/* Team Grid */}
        <div className={`grid ${columnClasses[columns] || columnClasses['3']} gap-8 max-w-7xl mx-auto`}>
          {team_members.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>

      </div>

      {/* Modal */}
      {activeModal !== null && (
        <Modal
          member={team_members[activeModal]}
          onClose={() => setActiveModal(null)}
        />
      )}
    </section>
  );
}
