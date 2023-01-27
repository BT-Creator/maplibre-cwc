import { Component, Host, h, Element, Prop, Listen } from '@stencil/core';
import { ObservableMap } from '@stencil/store';
import { FullscreenControl, Map, Marker } from 'maplibre-gl';
import { initStore, MapLibreState } from '../../stores/maplibre';
import { ControlInstance, SourceInstance } from '../../types/events';

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
      // TODO: We'll need to pre-generate this before creating the map instance... Maybe find a way to create a "empty" spec? Or pre-generate it in the state?
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
  listenForControlCreation(e: CustomEvent<ControlInstance>){
    this._store.state.initControls = [e.detail, ...this._store.state.initControls];
  }

  @Listen('sourceCreate', {passive: true})
  listenForSourceCreation(e: CustomEvent<SourceInstance>){
    this._store.state.initSources = [e.detail, ...this._store.state.initSources];
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
