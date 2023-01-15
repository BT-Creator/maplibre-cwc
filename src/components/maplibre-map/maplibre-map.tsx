import { Component, Host, h, Element, Prop, Listen } from '@stencil/core';
import { ObservableMap } from '@stencil/store';
import { FullscreenControl, Map, Marker } from 'maplibre-gl';
import { initStore, MapLibreState } from '../../stores/maplibre';
import { ControlObject } from '../../types/events';

@Component({
  tag: 'maplibre-map',
  styleUrl: 'maplibre-map.css',
  shadow: true,
  })
export class MaplibreMap {
  /** Allows the user to open the map in fullscreen mode */
  @Prop()
  allowFullscreen = false;

  _store: ObservableMap<MapLibreState> = initStore();

  @Element() el: HTMLElement;

  /* LOAD */
  componentDidLoad() {
    this._store.state.instance = new Map({
      container: this.el.shadowRoot.getElementById('map-instance-element'),
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-74.5, 40],
      zoom: 9,
      attributionControl: false,
    });
    if(this.allowFullscreen) this._store.state.instance.addControl(new FullscreenControl({container: this.el.shadowRoot.getElementById('map-instance-element')}));
  }

  /* EVENTS */
  @Listen('layerCreated', {passive: true})
  listenForLayerCreation(e: CustomEvent<Marker>){
    this._store.state.initLayers = [e.detail, ...this._store.state.initLayers];
  }

  @Listen('controlCreated', {passive: true})
  listenForControlCreation(e: CustomEvent<ControlObject>){
    this._store.state.initControls = [e.detail, ...this._store.state.initControls];
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
    this._store.state.instance.remove();
    this._store.reset();
  }
}
