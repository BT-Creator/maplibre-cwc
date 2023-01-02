import { Component, Host, h, Element, Prop, Listen } from '@stencil/core';
import { ObservableMap } from '@stencil/store';
import { FullscreenControl, Map, Marker } from 'maplibre-gl';
import { initStore, MapLibreState } from '../../stores/maplibre';

@Component({
  tag: 'maplibre-map',
  styleUrl: 'maplibre-map.css',
  shadow: true,
  })
export class MaplibreMap {
  /** The minimum zoom level of the map (0-24) */
  @Prop()
  minZoom = 0;
  /** The maximum zoom level of the map (0-24) */
  @Prop()
  maxZoom = 22;

  /** The minimum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. */
  @Prop()
  minPitch = 0;
  /** The maximum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues.*/
  @Prop()
  maxPitch = 60;

  /** Allows the user to open the map in fullscreen mode */
  @Prop()
  allowFullscreen = false;

  /**
   * If true, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.
   * An additional string may optionally be provided to indicate a parameter-styled hash, *e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar* , where foo is a custom parameter and bar is an arbitrary hash distinct from the map hash.
   */
  @Prop()
  hash: boolean | string = false;

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
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      minPitch: this.minPitch,
      maxPitch: this.maxPitch,
      hash: this.hash
    });
    if(this.allowFullscreen) this._store.state.instance.addControl(new FullscreenControl({container: this.el.shadowRoot.getElementById('map-instance-element')}));
  }

  /* EVENTS */
  @Listen('layerCreated')
  listenForLayerCreation(e: CustomEvent<Marker>){
    this._store.state.initLayers = [e.detail, ...this._store.state.initLayers];
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
