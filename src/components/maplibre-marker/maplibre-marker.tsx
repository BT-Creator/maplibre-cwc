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

  instance: Marker = new Marker();

  /* LOAD */
  componentWillLoad() {
    this.watchLngLat(this.lngLat);
  }

  componentDidLoad() {
    state.markers = [this.instance, ...state.markers];
  }

  /* STATE */
  @Watch("lngLat")
  watchLngLat(newValue: LngLatLike | string){
    const value = (typeof newValue === 'string')
      ? JSON.parse(newValue)
      : newValue;
    this._lngLat = value;
  }

  /* RENDER */
  componentWillRender(){
    this.instance.setLngLat(this._lngLat);
  }

  render() {
    return (
      <Host></Host>
    );
  }

  /* DISCONNECT */
  // TODO: Properly disconnect marker & remove from state
}
