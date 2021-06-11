---
id: Image
title: Image
sidebar_label: Image
hide_title: true
---

# `Image`

A component that renders optimized and responsive images using Storyblok's image service. With support for lazy loading and LQIP (Low-Quality Image Placeholders).

The component will automatically try to load a WebP version of the image if the browser supports it.

Lazy loading uses the native browser implementation if available, otherwise an IntersectionObserver (polyfilled if needed) is used as fallback.

The low-quality image placeholder is a small (max 32 pixels wide), blurred version of the image that is loaded as fast as possible and presented while the full image is loading. As soon as the full image loads, the placeholder is faded out. Optionally the placeholder can be disabled, then it will just fade it in the full-size image.

## Parameters

`Image` accepts the normal HTML `img` attributes, but the `src` is expected to be a Storyblok asset URL.

There are two important parameters that make sure the images are responsive: `fixed` and `fluid`. You should use one or the other.
- `fixed`: use if you know the exact size the image will be.
- `fluid`: is made for images that stretch a container of variable size (different size based on screen size). Use if you don't know the exact size the image will be.

```ts no-transpile
interface GetImagePropsOptions {
  /**
   * Optimize the image sizes for a fixed size. Use if you know the exact size
   * the image will be.
   * Format: `[width, height]`.
   */
  fixed?: [number, number];
  /**
   * Optimize the image sizes for a fluid size. Fluid is for images that stretch
   * a container of variable size (different size based on screen size).
   * Use if you don't know the exact size the image will be.
   * Format: `width` or `[width, height]`.
   */
  fluid?: number | [number, number];
  /**
   * Focus point to define the center of the image.
   * Format: <left>x<top>:<right>x<bottom>
   * @see https://www.storyblok.com/docs/image-service#custom-focal-point
   */
  focus?: string;
  /**
   * Apply the `smart` filter.
   * @see https://www.storyblok.com/docs/image-service#facial-detection-and-smart-cropping
   *
   * @default true
   */
  smart?: boolean;
}

interface ImageProps
  extends React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
    GetImagePropsOptions {
  /**
   * Object-fit the image.
   *
   * @default 'cover'
   */
  fit?: 'contain' | 'cover';
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
   * This function will be called once the full-size image loads.
   */
  onLoad?(): void;
  /**
   * Show a Low-Quality Image Placeholder.
   *
   * @default true
   */
  showPlaceholder?: boolean;
}

const Image: (props: ImageProps) => JSX.Element
```

## Usage

### Basic example

```ts
<Image
  src={storyblok_image?.filename}
  fluid={696}
  alt={storyblok_image?.alt}
  width="100%"
/>
```
