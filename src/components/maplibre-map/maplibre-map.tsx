import { Component, Host, h, Element, Prop } from '@stencil/core';
import { Map } from 'maplibre-gl';
import state from '../../stores/maplibre';

@Component({
  tag: 'maplibre-map',
  styleUrl: 'maplibre-map.css',
  shadow: true,
  })
export class MaplibreMap {

  @Element() el: HTMLElement;

  /**
   * The minimum zoom level of the map (0-24)
   */
  @Prop()
  minZoom = 0;

  /**
   * The maximum zoom level of the map (0-24)
   */
  @Prop()
  maxZoom = 22;

  /**
   * The minimum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues.
   */
  @Prop()
  minPitch = 0;

  /**
   * The maximum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues.
   */
  @Prop()
  maxPitch = 60;

  /**
   * If true, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.
   * An additional string may optionally be provided to indicate a parameter-styled hash, *e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar* , where foo is a custom parameter and bar is an arbitrary hash distinct from the map hash.
   */
  @Prop()
  hash: boolean | string = false;


  /* LOAD */
  componentDidLoad() {
    state.instance = new Map({
      container: this.el.shadowRoot.getElementById('map-instance-element'),
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-74.5, 40],
      zoom: 9,
      attributionControl: false,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      minPitch: this.minPitch,
      maxPitch: this.maxPitch,
      hash: this.hash
    });
  }

  /* RENDER */
  render() {
    return (
      <Host>
        <div id="map-instance-element"></div>
        <slot></slot>
      </Host>
    );
  }

  /* DISCONNECT */
  disconnectedCallback(){
    state.instance.remove();
  }
}
