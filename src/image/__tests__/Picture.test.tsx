import * as React from 'react';
import { cleanup, render, act, screen } from '@testing-library/react';

import { Picture } from '../Picture';

const storyblokImage =
  'https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg';

describe('[image] Picture', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should not load src initially', async () => {
    act(() => {
      render(<Picture alt="flowers" src={storyblokImage} />);
    });

    expect(screen.getByAltText('flowers')).not.toHaveAttribute('src');
    expect(screen.getByAltText('flowers')).toHaveAttribute('data-src');
  });

  it('should set alt to empty string if undefined', async () => {
    act(() => {
      render(<Picture src={storyblokImage} />);
    });

    expect(screen.getByAltText('')).toBeInTheDocument();
  });

  it('should add webp srcset', async () => {
    act(() => {
      render(<Picture alt="flowers" src={storyblokImage} />);
    });

    expect(
      screen.getByAltText('flowers').parentElement.childNodes[0],
    ).toHaveAttribute('type', 'image/webp');
    expect(
      (screen.getByAltText('flowers').parentElement
        .childNodes[0] as any).getAttribute('srcSet'),
    ).toMatch(/filters:format\(webp\)/);
  });

  it('should load eager if not lazy', async () => {
    act(() => {
      render(<Picture alt="flowers" src={storyblokImage} lazy={false} />);
    });

    expect(screen.getByAltText('flowers')).toHaveAttribute('loading', 'eager');
  });
});
