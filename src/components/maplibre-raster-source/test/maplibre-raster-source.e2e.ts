import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-raster-layer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<maplibre-raster-layer></maplibre-raster-layer>');

    const element = await page.find('maplibre-raster-layer');
    expect(element).toHaveClass('hydrated');
  });
});
