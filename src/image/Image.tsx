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
  /**
   * It's recommended to put lazy=false on images that are already in viewport
   * on load. If false, the image is loaded eagerly.
   *
   * @default true
   */
  lazy?: boolean;
  /**
   * The media attribute specifies a media condition (similar to a media query)
   * that the user agent will evaluate for each <source> element.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture#the_media_attribute
   */
  media?: string;
  /**
   * Show a Low-Quality Image Placeholder.
   *
   * @default true
   */
  showPlaceholder?: boolean;
}

const cache = new Set();

export const Image = ({
  fixed,
  fluid,
  height,
  showPlaceholder = true,
  smart,
  width,
  ref,
  ...props
}: ImageProps) => {
  const [isLoading, setLoading] = useState(props.lazy === false);
  const { onLoad, isLoaded, setLoaded } = useImageLoader();
  const imgRef = useRef<HTMLImageElement>();
  const observer = useRef<IntersectionObserver>();
  const isCached = useRef(cache.has(props.src));

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
        if (imgRef.current) {
          addIntersectionObserver();
        }

        return () => {
          if (observer.current) {
            observer.current.disconnect();
          }
        };
      }
    }
  }, []);

  useEffect(() => {
    if (isLoaded && !cache.has(props.src)) {
      cache.add(props.src);
    }
  }, [isLoaded]);

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

      {showPlaceholder && (
        <Placeholder src={props.src} shouldShow={!isLoaded} />
      )}

      <Picture
        {...pictureProps}
        style={{
          ...pictureStyles,
          transform: 'translateZ(0)',
          transition: 'opacity 250ms linear',
          willChange: 'opacity',
          opacity: isCached.current || isLoaded ? 1 : 0,
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
