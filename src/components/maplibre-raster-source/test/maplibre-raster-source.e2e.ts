import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-raster-layer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<maplibre-raster-source></maplibre-raster-source>');

    const element = await page.find('maplibre-raster-source');
    expect(element).toHaveClass('hydrated');
  });
});
