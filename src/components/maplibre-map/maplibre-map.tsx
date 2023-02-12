import { Component, Host, h, Element, Prop, Listen } from '@stencil/core';
import { FullscreenControl, Map, MapOptions, Marker, Popup, StyleSpecification } from 'maplibre-gl';
import { ControlInstance, SourceInstance } from '../../types/events';
import { generateEmptyState } from '../../util/mapInitialState';

export declare type MapInitialState = {
  eventeds: Array<Marker|Popup>,
  controls: Array<ControlInstance>,
  options: MapOptions
}

@Component({
  tag: 'maplibre-map',
  styleUrl: 'maplibre-map.css',
  shadow: true,
  })
export class MaplibreMap {
  /** Allows the user to open the map in fullscreen mode */
  @Prop() allowFullscreen = false;

  /** The initial state of the map */
  _initState: MapInitialState = generateEmptyState();
  /** The map instance */
  _instance: Map;

  @Element() el: HTMLElement;

  /* LOAD */
  componentWillLoad() {
    this._initState.options.center = [0, 0];
    this._initState.options.zoom = 9;
    this._initState.options.attributionControl = false;
  }

  componentDidLoad() {
    this._initState.options.container = this.el.shadowRoot.getElementById('map-instance-element');
    this._instance = new Map(this._initState.options);
    this._initState.eventeds.forEach(layer => layer.addTo(this._instance));
    this._initState.controls.forEach(control => this._instance.addControl(control.instance, control.position));
    if(this.allowFullscreen) this._instance.addControl(new FullscreenControl({container: this.el.shadowRoot.getElementById('map-instance-element')}));
  }

  /* EVENTS */
  @Listen('eventedCreate', {passive: true})
  listenForLayerCreation(e: CustomEvent<Marker|Popup>){
    (this._instance)
      ? e.detail.addTo(this._instance)
      : this._initState.eventeds.push(e.detail);
  }

  @Listen('controlCreate', {passive: true})
  listenForControlCreation(e: CustomEvent<ControlInstance>){
    (this._instance)
      ? this._instance.addControl(e.detail.instance, e.detail.position)
      : this._initState.controls.push(e.detail);
  }

  @Listen('sourceCreate', {passive: true})
  listenForSourceCreation(e: CustomEvent<SourceInstance>){
    if(this._instance){
      this._instance.addSource(e.detail.id, e.detail.spec);
      this._instance.addLayer({id: e.detail.id, type: e.detail.spec.type, source: e.detail.id});
    } else {
      (this._initState.options.style as StyleSpecification).sources[e.detail.id] = e.detail.spec;
      (this._initState.options.style as StyleSpecification).layers.push({id: e.detail.id, type: e.detail.spec.type, source: e.detail.id});
    }
  }

  @Listen('sourceUpdate', {passive: true})
  listenForSourceUpdate(e: CustomEvent<SourceInstance>){
    this._instance.removeLayer(e.detail.id);
    this._instance.removeSource(e.detail.id);
    this._instance.addSource(e.detail.id, e.detail.spec);
    this._instance.addLayer({id: e.detail.id, type: e.detail.spec.type, source: e.detail.id});
  }

  /* RENDER */
  render() {
    return (
      <Host>
        <div id="map-instance-element"></div>
        <slot></slot>
      </Host>
    );
  }

  /* DISCONNECT */
  disconnectedCallback(){
    this._instance.remove();
  }
}
