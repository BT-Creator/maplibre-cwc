import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-popup', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<maplibre-popup lng-lat="[0,3]"><p>Test</p></maplibre-popup>');

    const element = await page.find('maplibre-popup');
    expect(element).toHaveClass('hydrated');
    expect(element).toHaveAttribute('lng-lat');
  });
});
