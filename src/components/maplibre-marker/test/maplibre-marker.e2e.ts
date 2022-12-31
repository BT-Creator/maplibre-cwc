import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-marker', () => {
  it('renders', render);
});

async function render() {
  const page = await newE2EPage();
  await page.setContent('<maplibre-map><maplibre-marker lng-lat="[0,0]"></maplibre-marker></maplibre-map>');

  const element = await page.find('maplibre-marker');
  expect(element).toHaveClass('hydrated');
  expect(element).toHaveAttribute('lng-lat');
}
