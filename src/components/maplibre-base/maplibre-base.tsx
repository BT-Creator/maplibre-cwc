import { Component, Host, h, Element } from '@stencil/core';
import { Map } from 'maplibre-gl';
import state from '../../stores/maplibre';

@Component({
  tag: 'maplibre-base',
  styleUrl: 'maplibre-base.css',
  shadow: true,
  })
export class MaplibreBase {

  @Element() el: HTMLElement;


  /* LOAD */
  componentDidLoad() {
    state.instance = new Map({
      container: this.el.shadowRoot.getElementById('map-instance-element'),
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-74.5, 40],
      zoom: 9,
      attributionControl: false
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
