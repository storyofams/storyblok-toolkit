import React, { CSSProperties, useEffect, useRef, useState } from 'react';

import { getImageProps, GetImagePropsOptions } from './getImageProps';
import { hasNativeLazyLoadSupport, useImageLoader } from './helpers';
import { Picture } from './Picture';
import { Placeholder } from './Placeholder';
import { Wrapper } from './Wrapper';

interface ImageProps
  extends React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
    GetImagePropsOptions {
  /*
    It's recommended to put lazy=false on images that are already in viewport
    on load
    @default true
  */
  lazy?: boolean;
  media?: string;
}

export const Image = ({
  fixed,
  fluid,
  height,
  smart,
  width,
  ref,
  ...props
}: ImageProps) => {
  const [isLoading, setLoading] = useState(props.lazy === false);
  const { onLoad, isLoaded, setLoaded } = useImageLoader();
  const imgRef = useRef<HTMLImageElement>();
  const observer = useRef<IntersectionObserver>();

  const addIntersectionObserver = async () => {
    observer.current = await (
      await import('./createIntersectionObserver')
    ).createIntersectionObserver(imgRef.current, () => {
      setLoading(true);
    });
  };

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.src) {
      setLoaded(true);
      return;
    }

    if (!isLoading) {
      if (hasNativeLazyLoadSupport()) {
        setLoading(true);
        return;
      } else {
        // Use IntersectionObserver as fallback
        if (observer.current) observer.current.disconnect();

        if (imgRef.current) {
          addIntersectionObserver();
        }

        return () => {
          if (observer.current) {
            if (imgRef.current) {
              observer.current.unobserve(imgRef.current);
            }

            observer.current.disconnect();
          }
        };
      }
    }
  }, []);

  if (props.src?.split('/f/')?.length !== 2) {
    console.error('[storyblok-toolkit]: Image needs a Storyblok image as src');
    return null;
  }

  const imageProps = getImageProps(props.src, { fixed, fluid, smart });

  const pictureStyles: CSSProperties = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
  };

  const pictureProps = {
    ...props,
    ...imageProps,
    style: pictureStyles,
  };

  return (
    <Wrapper style={{ height, width }}>
      <div
        aria-hidden
        style={{
          paddingTop: `${(imageProps.height / imageProps.width) * 100}%`,
        }}
      />

      <Placeholder src={props.src} shouldShow={!isLoaded} />

      <Picture
        {...pictureProps}
        style={{
          ...pictureStyles,
          transform: 'translateZ(0)',
          transition: 'opacity 250ms linear',
          willChange: 'opacity',
          opacity: isLoaded ? 1 : 0,
        }}
        shouldLoad={isLoading}
        onLoad={onLoad}
        ref={imgRef}
      />

      <noscript>
        <Picture
          {...pictureProps}
          style={{ ...pictureStyles, opacity: 1 }}
          shouldLoad={true}
        />
      </noscript>
    </Wrapper>
  );
};
