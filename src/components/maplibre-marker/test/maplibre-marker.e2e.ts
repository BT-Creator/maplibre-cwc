import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-marker', () => {
  it('renders', render);
});

async function render() {
  // Generate page
  const page = await newE2EPage({html: '<maplibre-map><maplibre-marker lng-lat="[0,0]"></maplibre-marker></maplibre-map>'});

  // Get initial elements
  let marker = await page.find('maplibre-marker');
  let map = await page.find('maplibre-map');
  let shadowMarker = map.shadowRoot.querySelector('.maplibregl-marker');
  const initStyle = marker.getAttribute('style');

  // Check if the marker is loaded correctly
  expect(marker).toHaveClass('hydrated');
  expect(marker).toHaveAttribute('lng-lat');

  // Check if the marker is loaded & added into maplibre-map's shadow root
  expect(shadowMarker).toBeDefined();

  // Update lng-lat prop
  marker.setAttribute('lng-lat', '[12,12]');
  await page.waitForChanges();

  // Refresh elements
  marker = await page.find('maplibre-marker');
  map = await page.find('maplibre-map');
  shadowMarker = map.shadowRoot.querySelector('.maplibregl-marker');

  // Check if the marker is updated when prop is changed
  expect(marker.getAttribute('lng-lat')).toBe('[12,12]');
  expect(shadowMarker.getAttribute('style')).not.toBe(initStyle);
}
