import { createStore, ObservableMap } from '@stencil/store';
import { Map, Marker, Popup } from 'maplibre-gl';
import { ControlObject } from '../types/events';

export declare type MapLibreState = {
  instance: Map | undefined,
  initLayers: Array<Marker|Popup>,
  initControls: Array<ControlObject>
  nextLayerId: number
}

export function initStore(): ObservableMap<MapLibreState>{
  const store = createStore<MapLibreState>({
    instance: undefined,
    initLayers: [],
    initControls: [],
    nextLayerId: 1
  });

  store.onChange('instance', (newValue) => {
    store.state.initLayers.forEach(marker => marker.addTo(newValue));
    store.state.initLayers = [];
    store.state.initControls.forEach(control => newValue.addControl(control.instance, control.position));
    store.state.initControls = [];
  });
  return store;
}

export default initStore;
