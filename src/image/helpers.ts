import { ReactEventHandler, useState } from 'react';

export const hasNativeLazyLoadSupport = (): boolean =>
  typeof HTMLImageElement !== `undefined` &&
  `loading` in HTMLImageElement.prototype;

export const useImageLoader = (onLoadProp?: () => void) => {
  const [isLoaded, setLoadedState] = useState(false);

  const setLoaded = () => {
    setLoadedState(true);

    if (onLoadProp) {
      onLoadProp();
    }
  };

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
          setLoaded();
        });
    } else {
      setLoaded();
    }
  };

  return { onLoad, isLoaded, setLoaded };
};
