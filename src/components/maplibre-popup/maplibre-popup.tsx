import { Component, Host, h, Prop, Watch, Element } from '@stencil/core';
import { LngLatLike, Popup } from 'maplibre-gl';
import state from '../../stores/maplibre';

@Component({tag: 'maplibre-popup'})
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
  @Prop({reflect: true}) text?: string;

  /**
   * The popup instance
   */
  _instance: Popup = new Popup();

  @Element() el: HTMLElement;

  /* LOAD */
  componentWillLoad() {
    this.watchLngLat(this.lngLat);
    this._instance.setMaxWidth(this.width);
    if (this.text) this._instance.setText(this.text);
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

  /* RENDER */

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
