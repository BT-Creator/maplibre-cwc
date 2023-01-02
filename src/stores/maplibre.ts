import { createStore, ObservableMap } from '@stencil/store';
import { Map, Marker, Popup } from 'maplibre-gl';

export declare type MapLibreState = {
  instance: Map | undefined,
  initLayers: Array<Marker|Popup>,
  nextLayerId: number
}

export function initStore(): ObservableMap<MapLibreState>{
  const store = createStore<MapLibreState>({
    instance: undefined,
    initLayers: [],
    nextLayerId: 1
  });

  store.onChange('instance', (newValue) => {
    store.state.initLayers.forEach(marker => marker.addTo(newValue));
    store.state.initLayers = [];
  });
  return store;
}

export default initStore;
