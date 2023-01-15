import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-map', () => {
  it('renders', renderComponent);
});

async function renderComponent(){
  const page = await newE2EPage({html:'<maplibre-map></maplibre-map>'});

  const element = await page.find('maplibre-map');
  expect(element).toHaveClass('hydrated');
}
