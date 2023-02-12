import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('maplibre-raster-layer', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await page.setContent('<maplibre-map><maplibre-raster-source url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" tile-size="256" max-zoom="19"></maplibre-raster-source></maplibre-map>');

    const element = await page.find('maplibre-raster-source');
    expect(element).toHaveClass('hydrated');
  });

  it('calls for source tiles during map initialization', async () => {
    let tileRequested = false;
    page.on('request', request => {
      if(tileRequested === false){
        if(request.url().includes('https://tile.openstreetmap.org/')){
          tileRequested = true;
        }
      }
    });

    await page.setContent('<maplibre-map><maplibre-raster-source url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" tile-size="256" max-zoom="19"></maplibre-raster-source></maplibre-map>');
    await page.waitForChanges();

    expect(tileRequested).toEqual(true);
  });

  it('calls for source tiles after map initialization', async () => {
    let tileRequested = false;
    page.on('request', request => {
      if(tileRequested === false){
        if(request.url().includes('https://tile.openstreetmap.org/')){
          tileRequested = true;
        }
      }
    });

    await page.setContent('<maplibre-map></maplibre-map>');
    await page.waitForChanges();

    expect(tileRequested).toEqual(false);

    await page.$eval('maplibre-map', el => el.innerHTML = '<maplibre-raster-source url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" tile-size="256" max-zoom="19"></maplibre-raster-source>');
    await page.waitForChanges();

    expect(tileRequested).toEqual(true);
  });
});
