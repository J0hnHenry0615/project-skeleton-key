// src/components/blocks/BlockRenderer.js

import HeroBlock from './HeroBlock';
import RichTextBlock from './RichTextBlock';
import FeatureGridBlock from './FeatureGridBlock';
import FaqAccordionBlock from './FaqAccordionBlock';
import TestimonialSliderBlock from './TestimonialSliderBlock';
import StatsKpisBlock from './StatsKpisBlock';
import TimelineStepsBlock from './TimelineStepsBlock';
import PricingPlansBlock from './PricingPlansBlock';
import TeamProfilesBlock from './TeamProfilesBlock';
import LocationMapBlock from './LocationMapBlock';

export default function BlockRenderer({ blocks }) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.acf_fc_layout) {
          case 'hero_section':
            return <HeroBlock key={index} data={block} />;
          
          case 'rich_text_section':
            return <RichTextBlock key={index} data={block} />;
          
          case 'feature_grid':
            return <FeatureGridBlock key={index} data={block} />;
          
          case 'faq_accordion':
            return <FaqAccordionBlock key={index} data={block} />;
          
          case 'testimonial_slider':
            return <TestimonialSliderBlock key={index} data={block} />;
          
          case 'stats_kpis':
            return <StatsKpisBlock key={index} data={block} />;
          
          case 'timeline_steps':
            return <TimelineStepsBlock key={index} data={block} />;
          
          case 'pricing_plans':
            return <PricingPlansBlock key={index} data={block} />;
          
          case 'team_profiles':
            return <TeamProfilesBlock key={index} data={block} />;
          
          case 'location_map':
            return <LocationMapBlock key={index} data={block} />;
          
          default:
            console.warn(`Unknown block type: ${block.acf_fc_layout}`);
            return null;
        }
      })}
    </>
  );
}
