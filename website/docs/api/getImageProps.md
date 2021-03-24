---
id: getImageProps
title: getImageProps
sidebar_label: getImageProps
hide_title: true
---

# `getImageProps`

A utility function that returns optimized (responsive) image attributes `src`, `srcSet`, etc.

Used internally by the `Image` component.

## Parameters

`getImageProps` accepts an image URL (Storyblok asset URL!) and a configuration object parameter, with the following options:

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
   * Apply the `smart` filter.
   * @see https://www.storyblok.com/docs/image-service#facial-detection-and-smart-cropping
   *
   * @default true
   */
  smart?: boolean;
}

const getImageProps: (imageUrl: string, options?: GetImagePropsOptions) => {
  src?: undefined;
  srcSet?: undefined;
  width?: undefined;
  height?: undefined;
  sizes?: undefined;
}
```

## Usage

### Basic example

```ts
const imageProps = getImageProps(storyblok_image?.filename, {
  fluid: 696
});
```
