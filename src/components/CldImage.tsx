import React from 'react';
import { CldImage } from 'next-cloudinary';

interface CldImageComponent {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export default function CldImageComponent({
  src,
  alt = "Image",
  width = 500,
  height = 500,
}: CldImageComponent) {
  if (!src) return null;

  return (
    <CldImage
      src={src}
      width={width}
      height={height}
      crop="fill"
      alt={alt}
      quality="auto"
      format="auto"
    />
  );
}
