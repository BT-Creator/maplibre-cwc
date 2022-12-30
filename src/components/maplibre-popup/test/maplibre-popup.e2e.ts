import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-popup', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<maplibre-popup></maplibre-popup>');

    const element = await page.find('maplibre-popup');
    expect(element).toHaveClass('hydrated');
  });
});