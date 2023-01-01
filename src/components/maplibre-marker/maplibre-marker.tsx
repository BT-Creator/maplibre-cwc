import { Component, Prop, State, Watch } from '@stencil/core';
import { LngLatLike, Marker } from 'maplibre-gl';
import state from '../../stores/maplibre';

@Component({tag: 'maplibre-marker'})
export class MaplibreMarker {
  /**
   * The latitude & longitude of the marker. Should be an 2-length number array or a JSON Array string (E.g. [0.2354, 10.554])
   */
  @Prop({reflect: true}) lngLat!: LngLatLike | string;

  /**
   * The Marker object
   */
  _instance: Marker = new Marker();

  /* LOAD */
  componentWillLoad() {
    this.watchLngLat(this.lngLat);
  }

  componentDidLoad() {
    (state.instance === undefined)
      ? state.initLayers.push(this._instance)
      : this._instance.addTo(state.instance);
  }

  /* STATE */
  @Watch("lngLat")
  watchLngLat(newValue: LngLatLike | string | null){
    if(newValue !== null){
      const value = (typeof newValue === 'string')
        ? JSON.parse(newValue)
        : newValue;
      this._instance.setLngLat(value);
    }
  }

  // No render hook, as we don't have anything to display

  /* DISCONNECT */
  disconnectedCallback(){
    this._instance.remove();
  }
}
