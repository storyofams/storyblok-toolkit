import React from 'react';

interface PlaceholderProps {
  src: string;
  shouldShow?: boolean;
}

export const Placeholder = ({
  shouldShow,
  src,
  ...props
}: PlaceholderProps) => {
  const imageService = '//img2.storyblok.com';
  const path = src.replace('//a.storyblok.com', '').replace('https:', '');
  const blurredSrc = `${imageService}/32x0/filters:blur(10)${path}`;

  return (
    <div
      hidden
      style={{
        display: 'block',
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
      }}
    >
      <img
        {...props}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          transition: 'opacity 500ms linear',
          opacity: shouldShow ? 1 : 0,
        }}
        alt=""
        aria-hidden
        role="presentation"
        decoding="async"
        src={blurredSrc}
      />
    </div>
  );
};
