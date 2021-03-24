export interface GetImagePropsOptions {
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

export const getImageProps = (
  imageUrl: string,
  options?: GetImagePropsOptions,
) => {
  if (!imageUrl) {
    return {};
  }

  const imageService = '//img2.storyblok.com';
  const path = imageUrl.replace('//a.storyblok.com', '').replace('https:', '');
  const smart = options?.smart === false ? '' : '/smart';

  const dimensions = path.match(/\/(\d*)x(\d*)\//);
  const originalWidth = parseInt(dimensions?.[1]);
  const originalHeight = parseInt(dimensions?.[2]);

  if (options) {
    if (options.fixed) {
      return {
        src: `${imageService}${path}`,
        srcSet: `${imageService}/${options.fixed[0]}x${
          options.fixed[1]
        }${smart}${path} 1x,
      ${imageService}/${options.fixed[0] * 2}x${
          options.fixed[1] * 2
        }${smart}/filters:quality(70)${path} 2x,
      ${imageService}/${options.fixed[0] * 3}x${
          options.fixed[1] * 3
        }${smart}/filters:quality(50)${path} 3x,`,
        width: originalWidth,
        height: originalHeight,
      };
    } else if (options.fluid) {
      const widths = [0.25, 0.5, 1, 1.5, 2];
      const srcSets = [];
      const fluidWidth = Array.isArray(options.fluid)
        ? options.fluid[0]
        : options.fluid;
      const fluidHeight = Array.isArray(options.fluid) ? options.fluid[1] : 0;

      for (let i = 0; i <= widths.length; i += 1) {
        const currentWidth = Math.round(widths[i] * fluidWidth);

        if (widths[i] * fluidWidth <= originalWidth) {
          srcSets.push(
            `${imageService}/${currentWidth}x${
              widths[i] * fluidHeight
            }${smart}${path} ${currentWidth}w`,
          );
        } else if (widths[i] <= 1) {
          srcSets.push(
            `${imageService}/${currentWidth}x${
              widths[i] * fluidHeight
            }${smart}${path} ${originalWidth}w`,
          );
          break;
        }
      }

      return {
        sizes: `(max-width: ${fluidWidth}px) 100vw, ${fluidWidth}px`,
        srcSet: srcSets.join(', '),
        src: `${imageService}/${fluidWidth}x${fluidHeight}${smart}${path}`,
        width: originalWidth,
        height: originalHeight,
      };
    }
  }

  return {
    src: `${imageService}${path}`,
    width: originalWidth,
    height: originalHeight,
  };
};
