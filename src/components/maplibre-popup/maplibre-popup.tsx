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

  componentDidRender(){
    /**
     * The're something very weird here:
     * This will work, but the `setDOMContent` is a destructive method, where it will rip the node from the DOM and insert it into MapLibre's popup div.
     * This will cause the component to lose all associated styling (Which we don't want)
     *
     * The solution that we actually want is to copy the content of this element and put it in there. The most ideal solution would be to:
     * 1. Create a slot node
     * 2. Create a reference to this component
     * 3. Insert this as the DOMContent
     * 4. Hide the original one
     *
     * But this also sound... stupid. So what now?
     */
    this._instance.setDOMContent(this.el);
  }

  /* DISCONNECT */
  disconnectedCallback(){
    this._instance.remove();
  }
}
