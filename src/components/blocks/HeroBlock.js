// src/components/blocks/HeroBlock.js

import Image from 'next/image';
import Link from 'next/link';
import { getYouTubeId } from '@/lib/utils';

export default function HeroBlock({ data }) {
  const {
    headline,
    subheadline,
    background_type,
    background_image,
    background_video,
    button_text,
    button_link,
  } = data;

  // Check if it's a YouTube video
  const youtubeId = background_type === 'video' ? getYouTubeId(background_video) : null;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      
      {/* Background - Image */}
      {background_type === 'image' && background_image?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={background_image.url}
            alt={background_image.alt || headline || 'Hero background'}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Background - Video (YouTube Embed) */}
      {background_type === 'video' && youtubeId && (
        <div className="absolute inset-0 z-0">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
            className="w-full h-full object-cover pointer-events-none"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '100vh',
              transform: 'translate(-50%, -50%) scale(1.5)',
            }}
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Background - Video (Direct MP4) */}
      {background_type === 'video' && !youtubeId && background_video && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={background_video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        {headline && (
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {headline}
          </h1>
        )}
        
        {subheadline && (
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {subheadline}
          </p>
        )}

        {button_text && button_link && (
          <Link 
            href={button_link}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105"
          >
            {button_text}
          </Link>
        )}
      </div>
    </section>
  );
}