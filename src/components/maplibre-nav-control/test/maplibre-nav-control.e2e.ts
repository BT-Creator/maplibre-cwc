import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-nav-control', () => {
  it('renders', async () => {
    const page = await newE2EPage({html: '<maplibre-map><maplibre-nav-control></maplibre-nav-control></maplibre-map>'});

    const element = await page.find('maplibre-nav-control');
    expect(element).toHaveClass('hydrated');
  });
});
