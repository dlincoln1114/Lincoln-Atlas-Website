'use client';
import MediaCarousel from '@/components/MediaCarousel'

const slides = [
  {
    type: 'image',
    src: '/images/earth.jpg',
    alt: 'Earth from space',
    title: 'Earth',
    subtitle: 'Our blue home',
    cta: { label: 'Learn More', href: '/earth' },
  },
  {
    type: 'image',
    src: '/images/spacex.jpg',
    title: 'Blue Planet',
    subtitle: 'A cinematic journey through the oceans',
    cta: { label: 'Watch Trailer', href: '/blue-planet' },
  },
  {
    type: 'image',
    src: '/images/mars.jpg',
    alt: 'Mars surface',
    title: 'Mars',
    subtitle: 'The red frontier',
  },
];

export default function Home() {
  return (
    <div id="app">
      <div id='featured-stories' className='relative'>
        <MediaCarousel slides={slides} autoPlayDelay={10000}/>
      </div>
    </div>
  );
}
