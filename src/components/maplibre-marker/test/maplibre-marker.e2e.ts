import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('maplibre-marker', () => {
  let page: E2EPage;
  let marker: E2EElement;
  let markerShadow: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({
      html: '<maplibre-map><maplibre-marker lng-lat="[0,0]"></maplibre-marker></maplibre-map>'
    });
    marker = await page.find('maplibre-marker');
    markerShadow = await page.find('maplibre-map >>> .maplibregl-marker');
  });

  it('renders', async () => {
    // Check if the marker is loaded correctly
    expect(marker).toHaveClass('hydrated');
    expect(marker).toHaveAttribute('lng-lat');

    // Check if the marker is loaded & added into maplibre-map's shadow root
    expect(markerShadow).toBeDefined();
  });

  it('reacts to lng-lat changes', async () => {
    const initStyle = (await markerShadow.getComputedStyle()).transform;
    // Re-assign Attribute
    marker.setAttribute('lng-lat', '[12,12]');
    page.waitForChanges();

    // Reassign markers
    marker = await page.find('maplibre-marker');
    markerShadow = await page.find('maplibre-map >>> .maplibregl-marker');

    // Check if transform property is not the same
    expect((await markerShadow.getComputedStyle()).transform).not.toEqual(initStyle);
  });
});
