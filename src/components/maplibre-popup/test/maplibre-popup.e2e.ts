/* eslint-disable */
import { newE2EPage } from '@stencil/core/testing';

async function generateHTMLPopup(){
  const page = await newE2EPage({
    html: '<maplibre-map><maplibre-popup lng-lat="[0,0]"><p>div</p></maplibre-popup></maplibre-map>'
  });
  const popup = await page.find('maplibre-popup');
  const map = await page.find('maplibre-map');
  return {page, popup, map};
}

async function generateTextPopup(){
  const page = await newE2EPage({
    html: '<maplibre-map><maplibre-popup lng-lat="[0,0]" text="Cool Popup"></maplibre-popup></maplibre-map>'
  });
  const popup = await page.find('maplibre-popup');
  const map = await page.find('maplibre-map');
  return {page, popup, map};
}

describe('maplibre-popup', () => {
  describe('general', () => {
    it('reacts to lng-lat prop changes', async () => {
      let {page, popup, map} = await generateTextPopup();

      const initStyle = (await popup.getComputedStyle()).transform;
      popup.setAttribute('lng-lat', '[12,12]');
      page.waitForChanges();

      popup = await page.find('maplibre-map');
      const popupShadow = await page.find('maplibre-map >>> .maplibregl-popup');
      expect(await (await popupShadow.getComputedStyle()).transform).not.toEqual(initStyle);
    });

    it('detaches properly', async () => {
      let {page, popup, map} = await generateTextPopup();

      await page.$eval('maplibre-popup', (el) => el.remove())
      await page.waitForChanges();

      // Re-acquire shadow DOM
      const popupShadow = await page.find('maplibre-map >>> .maplibregl-popup');
      expect(popupShadow).toBeFalsy();
    })
  });

  describe('html', () => {
    it('renders HTML-ful webcomponent', async () => {
      const {page, popup, map} = await generateHTMLPopup();

      expect(popup).toHaveClass('hydrated');
      expect(popup).toHaveAttribute('lng-lat');
      expect(popup.innerHTML).toEqualLightHtml('<!----><p>div</p>');
    });

    it('renders HTML in map\'s shadow DOM as slot element', async () => {
      const {page, popup, map} = await generateHTMLPopup();

      const slotName = popup.getAttribute('slot');
      const slotNode = map.shadowRoot.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement;
      expect(slotNode).toBeDefined();
      expect(slotNode.getAttribute('name')).toEqual(slotName);
    });
  });

  describe('text', () => {
    it('renders a textful webcomponent', async () => {
      const {page, popup, map} = await generateTextPopup();

      expect(popup).toHaveClass('hydrated');
      expect(popup).toHaveAttribute('lng-lat');
    });


    it ('renders Text in map\'s shadow DOM', async () => {
      const {page, popup, map} = await generateTextPopup();
      const popupShadow = await page.find('maplibre-map >>> .maplibregl-popup-content');

      expect(popupShadow).toBeDefined();
      expect(popupShadow.innerText).toEqual(popup.getAttribute('text')+'×');
    });
  });
});


