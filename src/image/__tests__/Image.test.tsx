import React from 'react';
import { cleanup, render, act, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

import { createIntersectionObserver } from '../createIntersectionObserver';
import * as helpers from '../helpers';
import { Image } from '../Image';

const storyblokImage =
  'https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg';

jest.mock('../createIntersectionObserver');

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

  it('should use io as loading fallback', async () => {
    global.HTMLImageElement.prototype.loading = undefined;
    delete global.HTMLImageElement.prototype.loading;

    const setLoadingMock = jest.fn();

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, setLoadingMock]);

    const disconnect = jest.fn();
    const createIoMock = jest.fn(() => ({
      disconnect,
    }));

    (createIntersectionObserver as jest.Mock).mockReset();
    (createIntersectionObserver as jest.Mock).mockImplementation(createIoMock);

    act(() => {
      render(<Image alt="flowers" src={storyblokImage} />);
    });

    await waitFor(() =>
      expect(createIntersectionObserver as jest.Mock).toHaveBeenCalled(),
    );

    act(() => {
      ((createIntersectionObserver as jest.Mock).mock as any).calls[0][1]();
    });

    expect(setLoadingMock).toHaveBeenCalledWith(true);
  });

  it('should disconnect io on unmount', async () => {
    global.HTMLImageElement.prototype.loading = undefined;
    delete global.HTMLImageElement.prototype.loading;

    const container = document.createElement('div');
    document.body.appendChild(container);

    jest.spyOn(React, 'useRef').mockReturnValueOnce({
      current: { src: storyblokImage },
    });

    const disconnect = jest.fn();

    (createIntersectionObserver as jest.Mock).mockImplementation(() => ({
      disconnect,
    }));

    act(() => {
      render(<Image alt="flowers" src={storyblokImage} />, { container });
    });

    expect(disconnect).not.toHaveBeenCalled();

    unmountComponentAtNode(container);

    await waitFor(() => expect(disconnect).toHaveBeenCalled());
  });

  it('should not add io if already loading', async () => {
    global.HTMLImageElement.prototype.loading = undefined;

    const disconnect = jest.fn();
    const createIoMock = jest.fn(() => ({
      disconnect,
    }));

    (createIntersectionObserver as jest.Mock).mockImplementation(createIoMock);

    act(() => {
      render(<Image alt="flowers" src={storyblokImage} lazy={false} />);
    });

    expect(createIoMock).not.toHaveBeenCalled();
  });

  it('should not add io if no image ref', async () => {
    global.HTMLImageElement.prototype.loading = undefined;
    delete global.HTMLImageElement.prototype.loading;

    const disconnect = jest.fn();
    const createIoMock = jest.fn(() => ({
      disconnect,
    }));

    (createIntersectionObserver as jest.Mock).mockReset();
    (createIntersectionObserver as jest.Mock).mockImplementation(createIoMock);

    let ref = {} as any;
    Object.defineProperty(ref, 'current', {
      get: jest.fn(() => false),
      set: jest.fn(),
    });
    jest.spyOn(React, 'useRef').mockReturnValue(ref);

    act(() => {
      render(<Image alt="flowers" src={storyblokImage} />);
    });

    await waitFor(() =>
      expect(createIntersectionObserver as jest.Mock).not.toHaveBeenCalled(),
    );

    ref = {};
    Object.defineProperty(ref, 'current', {
      get: jest.fn(() => true),
      set: jest.fn(),
    });
    jest.spyOn(React, 'useRef').mockReturnValueOnce(ref);

    act(() => {
      render(<Image alt="flowers" src={storyblokImage} />);
    });

    await waitFor(() =>
      expect(createIntersectionObserver as jest.Mock).toHaveBeenCalled(),
    );
  });

  it('should hide placeholder on load', async () => {
    global.HTMLImageElement.prototype.loading = 'lazy';

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

  it('should set loaded if img complete', async () => {
    global.HTMLImageElement.prototype.loading = 'lazy';

    const setLoaded = jest.fn();

    jest.spyOn(console, 'error').mockImplementation(jest.fn());

    jest.spyOn(helpers, 'useImageLoader').mockImplementation(() => ({
      onLoad: jest.fn(),
      isLoaded: false,
      setLoaded,
    }));

    jest.spyOn(React, 'useRef').mockImplementation(() => ({
      current: { src: 'image.png', complete: true },
    }));

    act(() => {
      render(<Image alt="flowers" src="image.png" />);
    });

    expect(setLoaded).toHaveBeenCalled();
  });

  it('should render null if src is not a storyblok asset', async () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());

    act(() => {
      render(<Image data-testid="img" src="http://localhost/test.png" />);
    });

    expect(screen.queryByTestId('img')).toBeNull();
  });
});
