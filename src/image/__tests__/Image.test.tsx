import * as React from 'react';
import { cleanup, render, act, screen, waitFor } from '@testing-library/react';

import * as helpers from '../helpers';
import { Image } from '../Image';

const storyblokImage =
  'https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg';

jest.mock('intersection-observer', () => ({}));

describe('[image] Image', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render an image with the src to load', async () => {
    act(() => {
      render(<Image alt="flowers" src={storyblokImage} />);
    });

    expect(screen.getByAltText('')).toHaveStyle('opacity: 1');

    expect(screen.getByAltText('flowers')).not.toHaveAttribute('src');
    expect(screen.getByAltText('flowers')).toHaveAttribute('data-src');
  });

  it('should let native loading handle loading if supported', async () => {
    global.HTMLImageElement.prototype.loading = 'lazy';

    act(() => {
      render(<Image alt="flowers" src={storyblokImage} />);
    });

    expect(screen.getByAltText('flowers')).toHaveAttribute('src');
  });

  const observe = jest.fn();
  const unobserve = jest.fn();
  const disconnect = jest.fn();
  let observerCb;

  const observerMock = jest.fn((cb) => {
    observerCb = cb;

    return {
      observe,
      unobserve,
      disconnect,
    };
  });

  beforeEach(() => {
    window.IntersectionObserver = observerMock as any;
  });

  it('should use io as loading fallback', async () => {
    global.HTMLImageElement.prototype.loading = undefined;

    const setLoadingMock = jest.fn();

    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [false, setLoadingMock]);

    act(() => {
      render(<Image alt="flowers" src={storyblokImage} />);
    });

    await waitFor(() => expect(observe).toHaveBeenCalledTimes(1));

    const target = document.querySelector(`img[alt="flowers"]`);
    observerCb([{ target, isIntersecting: true }]);

    expect(setLoadingMock).toHaveBeenCalledWith(true);
  });

  it('should hide placeholder on load', async () => {
    jest.spyOn(helpers, 'useImageLoader').mockImplementation(() => ({
      onLoad: jest.fn(),
      isLoaded: true,
      setLoaded: jest.fn(),
    }));

    act(() => {
      render(<Image alt="flowers" src={storyblokImage} />);
    });

    expect(screen.getByAltText('')).toHaveStyle('opacity: 0');
    expect(screen.getByAltText('flowers')).toHaveAttribute('src');
    expect(screen.getByAltText('flowers')).not.toHaveAttribute('data-src');
  });

  it('should render null if src is not a storyblok asset', async () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());

    act(() => {
      render(<Image data-testid="img" src="http://localhost/test.png" />);
    });

    expect(screen.queryByTestId('img')).toBeNull();
  });
});
