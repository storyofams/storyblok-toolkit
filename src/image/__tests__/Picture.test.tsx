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

  it('should merge filter parameters for single srcSet entry', async () => {
    const storyblokImageWithFilters =
      'http://img2.storyblok.com/filters:focal(920x625:921x626)/f/39898/3310x2192/e4ec08624e/demo-image.jpeg';

    act(() => {
      render(<Picture alt="flowers" src={storyblokImageWithFilters} />);
    });

    const filters = (screen.getByAltText('flowers').parentElement
      .childNodes[0] as any)
      .getAttribute('srcSet')
      .match(/\/filters:([^/]*)/)[1] // Get filters param
      .match(/([a-z]+\([^()]+\))/g); // Get all filters

    expect(filters).toEqual(
      expect.arrayContaining(['focal(920x625:921x626)', 'format(webp)']),
    );
  });

  it('should merge filter parameters for multiple srcSet entries', async () => {
    const storyblokImageWithFilters =
      'http://img2.storyblok.com/filters:focal(920x625:921x626)/f/39898/3310x2192/e4ec08624e/demo-image.jpeg';

    const storyblokSrcSetWithFilters = [
      'http://img2.storyblok.com/300x0/filters:focal(920x625:921x626)/f/39898/3310x2192/e4ec08624e/demo-image.jpeg 1x',
      'http://img2.storyblok.com/600x0/filters:focal(920x625:921x626)/f/39898/3310x2192/e4ec08624e/demo-image.jpeg 2x',
    ].join(', ');

    act(() => {
      render(
        <Picture
          alt="flowers"
          src={storyblokImageWithFilters}
          srcSet={storyblokSrcSetWithFilters}
        />,
      );
    });

    const sources = (screen.getByAltText('flowers').parentElement
      .childNodes[0] as any)
      .getAttribute('srcSet')
      .split(',');

    const filtersRegEx = /\/filters:([^/]*)/g;
    const filterRegex = /([a-z]+\([^()]+\))/g;
    const expectedFilters = ['focal(920x625:921x626)', 'format(webp)'];

    expect(sources[0].match(filtersRegEx)[0].match(filterRegex)).toEqual(
      expect.arrayContaining(expectedFilters),
    );
    expect(sources[1].match(filtersRegEx)[0].match(filterRegex)).toEqual(
      expect.arrayContaining(expectedFilters),
    );
  });

  it('should load eager if not lazy', async () => {
    act(() => {
      render(<Picture alt="flowers" src={storyblokImage} lazy={false} />);
    });

    expect(screen.getByAltText('flowers')).toHaveAttribute('loading', 'eager');
  });
});
