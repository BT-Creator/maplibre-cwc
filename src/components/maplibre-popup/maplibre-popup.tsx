import { Component, h, Host, Prop, Watch, Element, EventEmitter, Event } from '@stencil/core';
import { LngLatLike, Popup } from 'maplibre-gl';

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
   * Fires an event that the layer has been created
   */
  @Event({bubbles: true, composed: true}) layerCreated: EventEmitter<Popup>

  /**
   * Internal ID of popup
   */
  _id: string = crypto.randomUUID();

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
    else {
      // We'll pass a slot reference to the map, so that it will position it there, BUT render it in the light DOM!
      const wrapper = document.createElement('slot');
      wrapper.setAttribute('name', `maplibre-cwc-popup-${this._id}-content`);
      this._instance.setDOMContent(wrapper);
    }
  }

  componentDidLoad() {
    this.layerCreated.emit(this._instance);
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

  // TODO: Trigger reset whenever the text attribute is updated

  /* RENDER */
  render() {
    return (!this.text)
      ? (<Host slot={`maplibre-cwc-popup-${this._id}-content`}><slot></slot></Host>)
      : undefined;
  }

  /* DISCONNECT */
  disconnectedCallback(){
    this._instance.remove();
  }
}
