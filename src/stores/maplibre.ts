import { createStore, ObservableMap } from '@stencil/store';
import { Map, Marker, Popup } from 'maplibre-gl';
import { ControlInstance, SourceInstance } from '../types/events';

export declare type MapLibreState = {
  instance: Map | undefined,
  initLayers: Array<Marker|Popup>,
  initControls: Array<ControlInstance>,
  initSources: Array<SourceInstance>,
  nextLayerId: number
}

export function initStore(): ObservableMap<MapLibreState>{
  const store = createStore<MapLibreState>({
    instance: undefined,
    initLayers: [],
    initControls: [],
    initSources: [],
    nextLayerId: 1
  });

  /*
    TODO: Style needs to be set within the map, so we'll need to fix the way this is loaded:
    A) Generate the map instance here and make it available through here
    B) Move away from using the state and write code that will react to the incoming events (sourceCreate, layerCreated, etc...)
  */
  store.onChange('instance', (newValue) => {
    store.state.initSources.forEach(source => newValue.addSource(source.id, source.spec));
    store.state.initLayers.forEach(marker => marker.addTo(newValue));
    store.state.initLayers = [];
    store.state.initControls.forEach(control => newValue.addControl(control.instance, control.position));
    store.state.initControls = [];
  });
  return store;
}

export default initStore;
