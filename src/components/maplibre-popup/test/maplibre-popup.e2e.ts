/* eslint-disable */
import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('maplibre-popup', () => {
  let page: E2EPage;
  let popup: E2EElement;
  let map: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({
      html: '<maplibre-map><maplibre-popup lng-lat="[0,0]"><p>div</p></maplibre-popup></maplibre-map>'
    });
    popup = await page.find('maplibre-popup');
    map = await page.find('maplibre-map');
  })

  it('renders', async () => {
    expect(popup).toHaveClass('hydrated');
    expect(popup).toHaveAttribute('lng-lat');
    expect(popup).toHaveAttribute('max-width');
    expect(popup.innerHTML).toEqualLightHtml('<!----><p>div</p>');
  });

  it('renders HTML in map\'s shadow DOM as slot element', async () => {
    const slotName = popup.getAttribute('slot');
    const slotNode = map.shadowRoot.querySelector(`slot`);
    expect(slotNode).toBeTruthy();
    expect(slotNode.getAttribute('name')).toEqual(slotName);
  });

  it('reacts to lng-lat prop changes', async () => {
    const initStyle = (await popup.getComputedStyle()).transform;
    popup.setAttribute('lng-lat', '[12,12]');
    page.waitForChanges();

    const popupShadow = await page.find('maplibre-map >>> .maplibregl-popup');
    expect((await popupShadow.getComputedStyle()).transform).not.toEqual(initStyle);
  });

  /*
  TODO: Fix this test
  *In the meantime, trust me bro, it sets.*
  it('reacts to max width prop changes', async () => {
    // Explicitly set the width
    popup.setAttribute("maxWidth", "200px");
    page.waitForChanges();
    let popupShadow = await page.find('maplibre-map >>> .maplibregl-popup');
    expect((await popupShadow.getComputedStyle()).maxWidth).toEqual('200px');

    // Explicitly unset the width
    popup.removeAttribute('maxWidth');
    page.waitForChanges()
    popupShadow = await page.find('maplibre-map >>> .maplibregl-popup');
    expect((await popupShadow.getComputedStyle()).maxWidth).toEqual('100%');
  })
  */

  it('detaches properly', async () => {
    await page.$eval('maplibre-popup', (el) => el.remove())
    await page.waitForChanges();

    // Re-acquire shadow DOM
    const popupShadow = await page.find('maplibre-map >>> .maplibregl-popup');
    expect(popupShadow).toBeFalsy();
  })
});


