import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('maplibre-marker', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    // Set content
    await page.setContent('<maplibre-map><maplibre-marker lng-lat="[0,0]"></maplibre-marker></maplibre-map>');
    await page.waitForChanges();

    // Check if the marker is loaded correctly
    const marker = await page.find('maplibre-marker');
    expect(marker).toHaveClass('hydrated');
    expect(marker).toHaveAttribute('lng-lat');
  });

  it('renders on map during map initialization', async () => {
    // Set content
    await page.setContent('<maplibre-map><maplibre-marker lng-lat="[0,0]"></maplibre-marker></maplibre-map>');
    await page.waitForChanges();

    // Fetch & verify marker shadow content
    const markerShadow = await page.find('maplibre-map >>> .maplibregl-marker');
    expect(markerShadow).toBeDefined();
  });

  it('renders after map initialization', async () => {
    // Set Map component
    await page.setContent('<maplibre-map></maplibre-map>');
    await page.waitForChanges();

    // Check if no shadow marker is set
    const initShadow = await page.find('maplibre-map >>> .maplibregl-marker');
    expect(initShadow).toBeFalsy();

    // Add new marker
    await page.$eval('maplibre-map', (el) => {
      el.innerHTML = '<maplibre-marker lng-lat="[0,0]"></maplibre-marker>';
    });
    await page.waitForChanges();

    // Fetch marker shadow
    const markerShadow = await page.find('maplibre-map >>> .maplibregl-marker');
    expect(markerShadow).toBeDefined();
  });

  it('injects slot element', async () => {
    // Set content
    await page.setContent('<maplibre-map><maplibre-marker lng-lat="[0,0]"></maplibre-marker></maplibre-map>');
    await page.waitForChanges();

    const slot = await page.find('maplibre-map >>> .maplibregl-marker slot');
    const marker = await page.find('maplibre-marker');

    expect(marker).toEqualAttribute('slot', slot.getAttribute('name'));
  });

  it('renders default icon', async () => {
    // Set content
    await page.setContent('<maplibre-map><maplibre-marker lng-lat="[0,0]"></maplibre-marker></maplibre-map>');
    await page.waitForChanges();

    // Fetch & verify default icon
    const marker = await page.find('maplibre-marker slot-fb');
    expect(marker.innerHTML).toEqualLightHtml('<svg display="block" height="41px" width="27px" viewBox="0 0 27 41" ><g fill-rule="nonzero"><g transform="translate(3.0, 29.0)" fill="#000000"><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="10.5" ry="5.25002273"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="10.5" ry="5.25002273"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="9.5" ry="4.77275007"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="8.5" ry="4.29549936"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="7.5" ry="3.81822308"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="6.5" ry="3.34094679"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="5.5" ry="2.86367051"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="4.5" ry="2.38636864"></ellipse></g><g fill="#3FB1CE"><path d="M27,13.5 C27,19.074644 20.250001,27.000002 14.75,34.500002 C14.016665,35.500004 12.983335,35.500004 12.25,34.500002 C6.7499993,27.000002 0,19.222562 0,13.5 C0,6.0441559 6.0441559,0 13.5,0 C20.955844,0 27,6.0441559 27,13.5 Z"></path></g><g opacity="0.25" fill="#000000"><path d="M13.5,0 C6.0441559,0 0,6.0441559 0,13.5 C0,19.222562 6.7499993,27 12.25,34.5 C13,35.522727 14.016664,35.500004 14.75,34.5 C20.250001,27 27,19.074644 27,13.5 C27,6.0441559 20.955844,0 13.5,0 Z M13.5,1 C20.415404,1 26,6.584596 26,13.5 C26,15.898657 24.495584,19.181431 22.220703,22.738281 C19.945823,26.295132 16.705119,30.142167 13.943359,33.908203 C13.743445,34.180814 13.612715,34.322738 13.5,34.441406 C13.387285,34.322738 13.256555,34.180814 13.056641,33.908203 C10.284481,30.127985 7.4148684,26.314159 5.015625,22.773438 C2.6163816,19.232715 1,15.953538 1,13.5 C1,6.584596 6.584596,1 13.5,1 Z"></path></g><g transform="translate(6.0, 7.0)" fill="#FFFFFF"></g><g transform="translate(8.0, 8.0)"><circle fill="#000000" opacity="0.25" cx="5.5" cy="5.5" r="5.4999962"></circle><circle fill="#FFFFFF" cx="5.5" cy="5.5" r="5.4999962"></circle></g></g></svg>');
  });

  it('renders custom icon', async () => {
    const icon = '<svg display="block" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>webpack</title> <rect width="24" height="24" fill="none"></rect> <path d="M21,16.5a1,1,0,0,1-.53.88l-7.9,4.44a1,1,0,0,1-1.14,0l-7.9-4.44A1,1,0,0,1,3,16.5v-9a1,1,0,0,1,.53-.88l7.9-4.44a1,1,0,0,1,1.14,0l7.9,4.44A1,1,0,0,1,21,7.5v9M12,4.15,5,8.09v7.82l7,3.94,7-3.94V8.09L12,4.15m0,2.08,4.9,2.83L12,11.89,7.1,9.06,12,6.23m5,8.66L13,17.2V13.62l4-2.31v3.58M11,17.2,7,14.89V11.31l4,2.31Z"></path></g></svg>';

    // Set content
    await page.setContent(`<maplibre-map><maplibre-marker lng-lat="[2,2]">${icon}</maplibre-marker></maplibre-map>`);
    await page.waitForChanges();

    // Verify icon
    const marker = await page.find('maplibre-marker > svg');
    expect(marker.outerHTML).toEqualHtml(icon);
  });

  /*
  TODO: Fix this test when implementing other events
  it('sends out \'layerCreated\' event', async () => {
    const emptyPage = await newE2EPage();
    const spy = await emptyPage.spyOnEvent('layerCreated', 'document');
    await emptyPage.setContent('<maplibre-marker lng-lat="[0,0]"></maplibre-marker>');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEvent();
  });*/

  // TODO: Create test to detect if the instance is created

  it('reacts to lng-lat changes', async () => {
    // Set content
    await page.setContent('<maplibre-map><maplibre-marker lng-lat="[0,0]"></maplibre-marker></maplibre-map>');
    await page.waitForChanges();

    // Get initial marker shadow
    const initShadow = await page.find('maplibre-map >>> .maplibregl-marker');
    const initStyle = (await initShadow.getComputedStyle()).transform;

    // Re-assign Attribute
    const marker = await page.find('maplibre-marker');
    marker.setAttribute('lng-lat', '[12,12]');
    page.waitForChanges();

    // Reassign marker shadow
    const markerShadow = await page.find('maplibre-map >>> .maplibregl-marker');

    // Check if transform property is not the same
    expect((await markerShadow.getComputedStyle()).transform).not.toEqual(initStyle);
  });

  it('detaches properly', async () => {
    // Set content
    await page.setContent('<maplibre-map><maplibre-marker lng-lat="[0,0]"></maplibre-marker></maplibre-map>');
    await page.waitForChanges();

    // Remove marker
    await page.$eval('maplibre-marker', (el) => el.remove());
    await page.waitForChanges();

    // Re-acquire shadow DOM
    const markerShadow = await page.find('maplibre-map >>> .maplibregl-marker');
    expect(markerShadow).toBeFalsy();
  });
});
