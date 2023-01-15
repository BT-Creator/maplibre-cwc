import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('maplibre-map', () => {
  let page: E2EPage;
  let map: E2EElement;
  let mapShadow: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({html:'<maplibre-map></maplibre-map>'});
    map = await page.find('maplibre-map');
    mapShadow = await page.find('maplibre-map >>> #map-instance-element');
  });

  it('renders', async () => {
    expect(map).toHaveClass('hydrated');
    expect(mapShadow).toBeDefined();
    expect(mapShadow.innerHTML).toBeTruthy();
  });

  it('creates a maplibre instance', async () => {
    expect(map.getProperty('_instance')).toBeDefined();
  });

  // TODO: After moving fullscreen control to other component, test this component
});
