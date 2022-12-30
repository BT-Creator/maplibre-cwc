import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-marker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<maplibre-marker></maplibre-marker>');

    const element = await page.find('maplibre-marker');
    expect(element).toHaveClass('hydrated');
  });
});
