import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-marker', () => {
  it('renders', render);
  // it('has correct attributes', attributes);
});

async function render() {
  const page = await newE2EPage();
  await page.setContent('<maplibre-marker lng-lat="[0,0]"></maplibre-marker>');

  const element = await page.find('maplibre-marker');
  expect(element).toHaveClass('hydrated');
}

async function attributes() {
  const page = await newE2EPage();
  await page.setContent('<maplibre-marker lng-lat="[0,0]"></maplibre-marker>');

  const element = await page.find('maplibre-marker');
  expect(element).toHaveClass('hydrated');
  expect(element).toHaveAttribute('lng-lat');
}
