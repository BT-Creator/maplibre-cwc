import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('maplibre-nav-control', () => {
  let page: E2EPage;
  let mapEl: E2EElement;
  let navEl: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({html: '<maplibre-map><maplibre-nav-control></maplibre-nav-control></maplibre-map>'});
    mapEl = await page.find('maplibre-map');
    navEl = await page.find('maplibre-nav-control');
  });

  it('renders', async () => {
    expect(navEl).toHaveClass('hydrated');
    expect(navEl).not.toHaveAttribute('zoom');
    expect(navEl).not.toHaveAttribute('pitch');
    expect(navEl).not.toHaveAttribute('compass');
    expect(navEl).toHaveAttribute('position');
  });

  it('renders on map', async () => {
    // Checks if it renders on the default position, "top-right"
    const buttonGroup = mapEl.shadowRoot.querySelector('.maplibregl-ctrl-group');
    expect(buttonGroup).toBeDefined();
    expect(buttonGroup.childElementCount).toBe(0);
    expect(buttonGroup.parentElement.className).toContain('maplibregl-ctrl-top-right mapboxgl-ctrl-top-right');
  });

  it('add controls post-creation', async () => {
    // Set attributes
    navEl.toggleAttribute('zoom');
    navEl.toggleAttribute('pitch');
    navEl.setAttribute('position', 'bottom-left');
    await page.waitForChanges();

    // Check if attributes are set in Web component
    navEl = await page.find('maplibre-nav-control');
    expect(navEl).toHaveAttribute('zoom');
    expect(navEl).toHaveAttribute('compass');
    expect(navEl).toHaveAttribute('pitch');
    expect(navEl.getAttribute('position')).toEqual('bottom-left');

    // Checks if it renders in Shadow Root
    const buttonGroup = mapEl.shadowRoot.querySelector('.maplibregl-ctrl-group');
    expect(buttonGroup).toBeDefined();
    expect(buttonGroup.parentElement.className).toContain('maplibregl-ctrl-bottom-left mapboxgl-ctrl-bottom-left');
    expect(buttonGroup.childElementCount).toEqual(3);
  });

  it('detaches properly', async () => {
    await page.$eval('maplibre-nav-control', (el) => el.remove());
    await page.waitForChanges();

    // Re-acquire shadow DOM
    const buttonGroup = await page.find('maplibre-map >>> .maplibregl-ctrl-group');
    expect(buttonGroup).toBeFalsy();
  });
});
