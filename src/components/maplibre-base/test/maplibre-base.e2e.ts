import { newE2EPage } from '@stencil/core/testing';

describe('maplibre-base', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<maplibre-base></maplibre-base>');

    const element = await page.find('maplibre-base');
    expect(element).toHaveClass('hydrated');
  });
});
