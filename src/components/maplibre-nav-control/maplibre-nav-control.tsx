import { Component, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { NavigationControl } from 'maplibre-gl';
import { ControlInstance } from '../../types/events';

@Component({tag: 'maplibre-nav-control'})
export class MaplibreNavControl {
  /** Enables the compass control */
  @Prop({reflect: true, mutable: true}) compass = false;
  /** Enables the zoom control */
  @Prop({reflect: true}) zoom = false;
  /** Enables the pitch control (and compass control, if not enabled) */
  @Prop({reflect: true}) pitch = false;
  /** The position of the control */
  @Prop({reflect: true}) position: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right' = 'top-right';
  /** Fires an event that the control has been created */
  // TODO: Rename to "controlCreate" and edit listener in maplibre-map
  @Event({bubbles: true, composed: true}) controlCreated: EventEmitter<ControlInstance>;
  /** The internal IControl object */
  _instance: NavigationControl;

  /* LOAD */
  componentWillLoad() {
    this.watchPitch(this.pitch);
    this._instance = new NavigationControl({showCompass: this.compass, showZoom: this.zoom, visualizePitch: this.pitch});
  }

  componentDidLoad() {
    this.controlCreated.emit({instance: this._instance, position: this.position});
  }

  /* STATE */
  @Watch('pitch')
  watchPitch(newValue: boolean){ if (newValue) this.compass = true; }

  /* UPDATE */
  componentWillUpdate() {
    const map = this._instance._map;
    map.removeControl(this._instance);
    // TODO: If only the location changes, then we actually don't need to rebuild the control...
    this._instance = new NavigationControl({showCompass: this.compass, showZoom: this.zoom, visualizePitch: this.pitch});
    map.addControl(this._instance, this.position);
  }

  /* DISCONNECT */
  disconnectedCallback(){
    this._instance._map.removeControl(this._instance);
  }
}
