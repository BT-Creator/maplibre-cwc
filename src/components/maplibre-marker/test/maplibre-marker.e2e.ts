import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-marker', () => {
  it('renders', render);
});

async function render() {
  // Generate page
  const page = await newE2EPage({html: '<maplibre-map><maplibre-marker lng-lat="[0,0]"></maplibre-marker></maplibre-map>'});

  // Get initial elements
  const marker = await page.find('maplibre-marker');
  const map = await page.find('maplibre-map');
  const shadowMarker = map.shadowRoot.querySelector('.maplibregl-marker');

  // Check if the marker is loaded correctly
  expect(marker).toHaveClass('hydrated');
  expect(marker).toHaveAttribute('lng-lat');

  // Check if the marker is loaded & added into maplibre-map's shadow root
  expect(shadowMarker).toBeDefined();
}
