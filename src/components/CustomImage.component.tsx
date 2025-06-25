import React from 'react';
import { isNotNullAndUndefined } from '../utils/helper';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name?: string;
}

interface ImageData {
  [key: string]: { src: string; alt: string };
}
const CustomImage: React.FC<ImageProps> = ({ name = '', ...props }) => {
  const images: ImageData = RP_IMAGES;

  const imageSrc = name && images[name]?.src ? images[name]?.src : props.src;
  const imageAlt = name && images[name]?.alt ? images[name]?.alt : props.alt;

  return (
    <img
      src={!isNotNullAndUndefined(props.src) ? `${imageSrc}` : props.src}
      alt={imageAlt}
      {...props}
    />
  );
};

export default CustomImage;

const RP_IMAGES: ImageData = {
  bouncingCircles: {
    src: '/images/loaders/bouncing-circles.svg',
    alt: 'bouncing-circles',
  },
  fadeStaggerCircles: {
    src: '/images/loaders/fade-stagger-circles.svg',
    alt: 'fade-stagger-circles',
  },
  gearSpinner: {
    src: '/images/loaders/gear-spinner.svg',
    alt: 'gear-spinner',
  },
  gearsSpinner: {
    src: '/images/loaders/gears-spinner.svg',
    alt: 'gears-spinner',
  },
  infiniteSpinner: {
    src: '/images/loaders/infinite-spinner.svg',
    alt: 'infinite-spinner',
  },
  ripples: {
    src: '/images/loaders/ripples.svg',
    alt: 'ripples',
  },
  tubeSpinner: {
    src: '/images/loaders/tube-spinner.svg',
    alt: 'tube-spinner',
  },
};
