// src/components/blocks/RichTextBlock.js

import Image from 'next/image';
import Link from 'next/link';
import { getYouTubeId } from '@/lib/utils';

export default function RichTextBlock({ data }) {
  const {
    heading,
    content,
    media_type,
    media_image,
    media_video,
    media_position,
    button_text,
    button_link,
  } = data;

  // Check if media should be on left or right
  const isMediaLeft = media_position === 'left';
  
  // Check if it's a YouTube video
  const youtubeId = media_type === 'video' ? getYouTubeId(media_video) : null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* If no media, show text only (centered) */}
        {media_type === 'none' && (
          <div className="max-w-4xl mx-auto">
            {heading && (
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                {heading}
              </h2>
            )}
            {content && (
              <div 
                className="prose prose-lg max-w-none mb-8 text-gray-700"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
            {button_text && button_link && (
              <Link 
                href={button_link}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {button_text}
              </Link>
            )}
          </div>
        )}

        {/* If there's media, show two-column layout */}
        {media_type !== 'none' && (
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
            
            {/* Text Column */}
            <div className={isMediaLeft ? 'lg:order-2' : 'lg:order-1'}>
              {heading && (
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  {heading}
                </h2>
              )}
              {content && (
                <div 
                  className="prose prose-lg max-w-none mb-8 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}
              {button_text && button_link && (
                <Link 
                  href={button_link}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  {button_text}
                </Link>
              )}
            </div>

            {/* Media Column */}
            <div className={isMediaLeft ? 'lg:order-1' : 'lg:order-2'}>
              
              {/* Image */}
              {media_type === 'image' && media_image?.url && (
                <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl bg-gray-200">
                  <Image
                    src={media_image.url}
                    alt={media_image.alt || heading || 'Section image'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}

              {/* Video - YouTube */}
              {media_type === 'video' && youtubeId && (
                <div className="relative rounded-lg overflow-hidden shadow-xl aspect-video bg-gray-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Video - Direct MP4 */}
              {media_type === 'video' && !youtubeId && media_video && (
                <div className="rounded-lg overflow-hidden shadow-xl bg-gray-900">
                  <video
                    controls
                    className="w-full"
                  >
                    <source src={media_video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}