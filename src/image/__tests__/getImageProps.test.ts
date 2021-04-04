import { getImageProps } from '../getImageProps';

const storyblokImage =
  'https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg';

describe('[image] getImageProps', () => {
  it('should return normal src if fixed and fluid not set', async () => {
    const props = getImageProps(storyblokImage);

    expect(props.src).toBeDefined();
    expect(props.width).toBe(3310);
    expect(props.height).toBe(2192);
  });

  it('should optimize props for fixed', async () => {
    const props = getImageProps(storyblokImage, { fixed: [200, 200] });

    expect(props.src).toBeDefined();
    expect(props.srcSet).toContain(' 1x');
    expect(props.srcSet).toContain(' 2x');
    expect(props.srcSet).toContain(' 3x');
    expect(props.width).toBe(3310);
    expect(props.height).toBe(2192);
  });

  it('should optimize props for fluid', async () => {
    const props = getImageProps(storyblokImage, { fluid: 1080 });

    expect(props.src).toBeDefined();
    expect(props.sizes).toBeDefined();
    expect(props.srcSet).toMatch(/(.*\dw.*){5}/gim);
    expect(props.width).toBe(3310);
    expect(props.height).toBe(2192);
  });

  it('should not put fluid sizes that are larger than original', async () => {
    const props = getImageProps(storyblokImage, { fluid: 5000 });

    expect(props.srcSet).toMatch(/(.*\dw.*){3}/gim);
  });

  it('should support width and height fluid', async () => {
    const props = getImageProps(storyblokImage, { fluid: [1920, 1080] });

    expect(props.srcSet).toContain('x1080');
  });

  it('should not set smart filter if configured', async () => {
    const props = getImageProps(storyblokImage, { smart: false });

    expect(props.src).not.toContain('/smart');
  });

  it('should return empty props if no src', async () => {
    const props = getImageProps('');

    expect(props).toMatchObject({});
  });
});
