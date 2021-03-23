import React, { forwardRef, Ref } from 'react';

import { GetImagePropsOptions } from './getImageProps';

interface ImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  imgRef?: Ref<HTMLImageElement>;
  shouldLoad?: boolean;
}

interface PictureProps extends ImageProps, GetImagePropsOptions {
  lazy?: boolean;
  media?: string;
  shouldLoad?: boolean;
}

const Image = ({
  alt = '',
  imgRef,
  shouldLoad,
  src,
  srcSet,
  ...props
}: ImageProps) => (
  <img
    {...props}
    alt={alt}
    decoding="async"
    src={shouldLoad ? src : undefined}
    data-src={!shouldLoad ? src : undefined}
    srcSet={shouldLoad ? srcSet : undefined}
    data-srcset={!shouldLoad ? srcSet : undefined}
    ref={imgRef}
  />
);

export const Picture = forwardRef(
  (
    {
      lazy = true,
      media,
      shouldLoad = false,
      sizes,
      src,
      srcSet,
      ...props
    }: PictureProps,
    ref: Ref<HTMLImageElement>,
  ) => {
    const splitSrc = src?.split('/f/');
    const webpSrc = `${splitSrc[0]}/filters:format(webp)/f/${splitSrc[1]}`;
    let webpSrcset = srcSet || webpSrc;

    if (webpSrcset) {
      webpSrcset = webpSrcset
        .replace(/\/filters:(.*)\/f\//gm, '/filters:$1:format(webp)/f/')
        .replace(/\/(?!filters:)([^/]*)\/f\//gm, '/$1/filters:format(webp)/f/');
    }

    return (
      <picture>
        <source
          srcSet={webpSrcset}
          sizes={sizes}
          type="image/webp"
          media={media}
        />
        <Image
          {...props}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          loading={!lazy ? 'eager' : 'lazy'}
          shouldLoad={shouldLoad}
          imgRef={ref}
        />
      </picture>
    );
  },
);
