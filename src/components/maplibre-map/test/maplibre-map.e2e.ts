import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-base', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<maplibre-map></maplibre-map>');

    const element = await page.find('maplibre-map');
    expect(element).toHaveClass('hydrated');
  });
});
