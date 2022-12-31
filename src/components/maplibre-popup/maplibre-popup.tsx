import { Component, Host, h, Prop, Watch, Element } from '@stencil/core';
import { LngLatLike, Popup } from 'maplibre-gl';
import state from '../../stores/maplibre';

@Component({tag: 'maplibre-popup', shadow: true})
export class MaplibrePopup {
  // TODO: Maybe change this to a CSS variable?
  /**
   * The width of the Maplibre popup itself. Accepts a CSSUnit as value.
   */
  @Prop() width = '100%'
  /**
 * The latitude & longitude of the popup. Should be an 2-length number array or a JSON Array string (E.g. [0.2354, 10.554])
 */
  @Prop({reflect: true}) lngLat!: LngLatLike | string;
  
  /**
   * String value that will be display in the pop-up
   */
  @Prop({reflect: true}) text: string;

  /**
   * The internal state of the coordinates
   */
  _lngLat: LngLatLike;

  /**
   * The popup instance
   */
  _instance: Popup = new Popup();

  @Element() el: HTMLElement;

  /* LOAD */
  componentWillLoad() {
    this.watchLngLat(this.lngLat);
    this._instance.setMaxWidth(this.width);
    this._instance.setText(this.text);
  }

  componentDidLoad() {
    (state.instance === undefined)
      ? state.initLayers.push(this._instance)
      : this._instance.addTo(state.instance);
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
    this._instance.setLngLat(this._lngLat);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  /* DISCONNECT */
  disconnectedCallback(){
    this._instance.remove();
  }
}
