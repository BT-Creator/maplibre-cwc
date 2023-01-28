import { Component, h, Host, Prop, Watch, Element, EventEmitter, Event } from '@stencil/core';
import { LngLatLike, Popup } from 'maplibre-gl';
import { generateSlot } from '../../util/slots';

@Component({tag: 'maplibre-popup'})
export class MaplibrePopup {
  // TODO: Maybe change this to a CSS variable type?
  /** The max  width of the Maplibre popup itself. Accepts a CSSUnit as value. */
  @Prop({reflect: true, mutable: true}) maxWidth = '100%'

  /** The latitude & longitude of the popup. Should be an 2-length number array or a JSON Array string (E.g. [0.2354, 10.554]) */
  @Prop({reflect: true}) lngLat!: LngLatLike | string;

  /** Fires an event that the popup has been created */
  @Event({bubbles: true, composed: true}) eventedCreate: EventEmitter<Popup>

  /** Internal ID of popup */
  _id: string = crypto.randomUUID();

  /** The popup instance */
  _instance: Popup = new Popup();

  @Element() el: HTMLElement;

  /* LOAD */
  componentWillLoad() {
    this.watchLngLat(this.lngLat);
    this.watchWidth(this.maxWidth);
    this._instance.setDOMContent(generateSlot(`maplibre-cwc-popup-${this._id}-content`));
  }

  componentDidLoad() {
    this.eventedCreate.emit(this._instance);
  }

  /* STATE */
  @Watch('lngLat')
  watchLngLat(newValue: LngLatLike | string | null){
    if(newValue !== null){
      const value = (typeof newValue === 'string')
        ? JSON.parse(newValue)
        : newValue;
      this._instance.setLngLat(value);
    }
  }

  @Watch('maxWidth')
  watchWidth(newValue: string | null){
    (newValue)
      ? this._instance.setMaxWidth(newValue)
      : this.maxWidth = '100%'; this._instance.setMaxWidth(this.maxWidth);
  }

  /* RENDER */
  render() {
    return (
      <Host slot={`maplibre-cwc-popup-${this._id}-content`}>
        <slot></slot>
      </Host>
    );
  }

  /* DISCONNECT */
  disconnectedCallback(){
    this._instance.remove();
  }
}
