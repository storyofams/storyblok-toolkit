import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { Placeholder } from '../Placeholder';

const storyblokImage =
  'https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg';

describe('[image] Placeholder', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should use src prop', async () => {
    const { getByTestId } = render(
      <Placeholder data-testid="img" src={storyblokImage} />,
    );
    const image = getByTestId('img');

    expect(image).toHaveAttribute('src');
  });

  it('should be visible when `shouldShow` is true', async () => {
    const { getByTestId } = render(
      <Placeholder data-testid="img" src={storyblokImage} shouldShow />,
    );
    const image = getByTestId('img');
    const styles = getComputedStyle(image);

    expect(styles).toHaveProperty('opacity', '1');
  });

  it('should not be visible when `shouldShow` is false', async () => {
    const { getByTestId } = render(
      <Placeholder data-testid="img" src={storyblokImage} shouldShow />,
    );
    const image = getByTestId('img');
    const styles = getComputedStyle(image);

    expect(styles).toHaveProperty('opacity', '1');
  });

  it('should call `onFadeEnd` when transition ended', async () => {
    const mock = jest.fn();
    const { getByTestId, rerender } = render(
      <Placeholder
        data-testid="img"
        src={storyblokImage}
        shouldShow
        onFadeEnd={mock}
      />,
    );

    const image = getByTestId('img');

    rerender(
      <Placeholder
        data-testid="img"
        src={storyblokImage}
        shouldShow={false}
        onFadeEnd={mock}
      />,
    );

    fireEvent['transitionEnd'](image);

    expect(mock).toHaveBeenCalledWith(false);
  });
});
