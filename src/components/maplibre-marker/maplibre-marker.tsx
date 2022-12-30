import { Component, Host, h, Prop, Watch } from '@stencil/core';
import { LngLatLike, Marker } from 'maplibre-gl';
import state from '../../stores/maplibre';

@Component({
  tag: 'maplibre-marker',
  shadow: true,
  })
export class MaplibreMarker {
  /**
   * The latitude & longitude of the marker. Should be an 2-length number array or a JSON Array string (E.g. [0.2354, 10.554])
   */
  @Prop({reflect: true}) lngLat!: LngLatLike | string;

  /**
   * The internal state of the coordinates
   */
  _lngLat: LngLatLike;

  /**
   * The Marker object
   */
  instance: Marker = new Marker();

  /* LOAD */
  componentWillLoad() {
    this.watchLngLat(this.lngLat);
  }

  componentDidLoad() {
    (state.instance === undefined)
      ? state.initMarkers.push(this.instance)
      : this.instance.addTo(state.instance);
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
  disconnectedCallback(){
    this.instance.remove();
  }
}
