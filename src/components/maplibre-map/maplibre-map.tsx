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


  /* LOAD */
  componentDidLoad() {
    state.instance = new Map({
      container: this.el.shadowRoot.getElementById('map-instance-element'),
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-74.5, 40],
      zoom: 9,
      attributionControl: false,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom
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
