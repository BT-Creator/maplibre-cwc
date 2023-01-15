import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-map', () => {
  it('renders', render);
});

async function render(){
  const page = await newE2EPage({html:'<maplibre-map></maplibre-map>'});

  const element = await page.find('maplibre-map');
  expect(element).toHaveClass('hydrated');
}
