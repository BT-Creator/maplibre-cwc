import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('maplibre-nav-control', () => {
  let page: E2EPage;
  let mapEl: E2EElement;
  let navEl: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({html: '<maplibre-map><maplibre-nav-control compass="true" zoom="true"></maplibre-nav-control></maplibre-map>'});
    mapEl = await page.find('maplibre-map');
    navEl = await page.find('maplibre-nav-control');
  });

  it('renders', async () => {
    expect(navEl).toHaveClass('hydrated');
  });
});
