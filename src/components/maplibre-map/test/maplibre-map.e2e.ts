import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-base', () => {
  it('renders', renderComponent);
});

async function renderComponent(){
  const page = await newE2EPage({
    failOnConsoleError: true
  });
  await page.setContent('<maplibre-map></maplibre-map>');

  const element = await page.find('maplibre-map');
  expect(element).toHaveClass('hydrated');
  expect(element.shadowRoot.childElementCount).toBeGreaterThan(0);
  expect(element.shadowRoot.querySelector('#map-instance-element')).toBeDefined();
}
