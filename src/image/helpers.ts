import { ReactEventHandler, useState } from 'react';

export const hasNativeLazyLoadSupport = (): boolean =>
  typeof HTMLImageElement !== `undefined` &&
  `loading` in HTMLImageElement.prototype;

export const useImageLoader = () => {
  const [isLoaded, setLoaded] = useState(false);

  const onLoad: ReactEventHandler<HTMLImageElement> = (e) => {
    if (isLoaded) {
      return;
    }

    const target = e.currentTarget;
    const img = new Image();
    img.src = target.currentSrc;

    if (img.decode) {
      // Decode the image through javascript to support our transition
      img
        .decode()
        .catch(() => {
          // ignore error, we just go forward
        })
        .then(() => {
          setLoaded(true);
        });
    } else {
      setLoaded(true);
    }
  };

  return { onLoad, isLoaded, setLoaded };
};
