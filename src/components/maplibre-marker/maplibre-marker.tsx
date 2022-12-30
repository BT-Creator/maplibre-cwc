import { Component, Host, h, Prop, Watch } from '@stencil/core';
import { LngLatLike, Marker } from 'maplibre-gl';
import state from '../../stores/maplibre';

@Component({
  tag: 'maplibre-marker',
  shadow: true,
})
export class MaplibreMarker {
  @Prop({reflect: true}) lngLat: LngLatLike | string;
  _lngLat: LngLatLike;

  instance: Marker;

  /* LOAD */
  componentWillLoad() {
    this.watchLngLat(this.lngLat, undefined);
    this.instance = new Marker().setLngLat(this._lngLat);
  }

  componentDidLoad() {
    state.markers = [this.instance, ...state.markers];
  }

  /* STATE */
  @Watch("lngLat")
  watchLngLat(newValue: LngLatLike | string, oldValue: LngLatLike | string | undefined){
    (oldValue === undefined)
      ? this.initLngLat(newValue)
      : this.updateLngLat(newValue, oldValue);
  }

  /* RENDER */
  render() {
    return (
      <Host></Host>
    );
  }

  /* HELPERS */
  initLngLat(newValue: LngLatLike | string){
    const value = (typeof newValue === 'string')
      ? JSON.parse(newValue)
      : newValue;
    this._lngLat = value;
  }

  updateLngLat(newValue: LngLatLike | string, oldValue: LngLatLike | string){
    // TODO: Properly update object
    throw new Error();
  }

  /* DISCONNECT */
  // TODO: Properly disconnect marker & remove from state
}
