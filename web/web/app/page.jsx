'use client';
import MediaCarousel from '@/components/MediaCarousel'

const heroSlides = [
  {
    type: 'video',
    src: 'https://www.youtube.com/watch?v=29XymHesxa0',
    title: 'Empower Your Transformation',
    subtitle: 'Solutions designed to scale your impact.',
    cta: { label: 'Let’s Talk', href: '/contact' },
  },
  {
    type: 'image',
    src: '/img/hero1.jpg',
    alt: 'Hero 1',
    title: 'We Build With You',
    subtitle: 'Digital strategy, data, AI, and beyond.',
  },
];

export default function Home() {
  return (
    <div id="app">
      <div id='featured-stories' className='relative'>
        <MediaCarousel slides={heroSlides} />
      </div>
    </div>
  );
}
