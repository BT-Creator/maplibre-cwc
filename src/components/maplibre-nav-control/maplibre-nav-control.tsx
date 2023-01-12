import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { IControl, NavigationControl } from 'maplibre-gl';
import { ControlObject } from '../../types/events';

@Component({tag: 'maplibre-nav-control'})
export class MaplibreNavControl {
  @Prop({reflect: true}) compass = false;
  @Prop({reflect: true}) zoom = false;
  @Prop({reflect: true}) pitch = false;
  @Prop({reflect: true}) position: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right' = 'top-right';
  @Event({bubbles: true, composed: true}) controlCreated: EventEmitter<ControlObject>;

  _instance: IControl;

  componentWillLoad() {
    this._instance = new NavigationControl({showCompass: this.compass, showZoom: this.zoom, visualizePitch: this.pitch,});
  }

  componentDidLoad() {
    this.controlCreated.emit({instance: this._instance, position: this.position});
  }
}
