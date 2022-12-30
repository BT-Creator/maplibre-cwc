import { createStore } from '@stencil/store';
import { Map, Marker, Popup } from 'maplibre-gl';

declare type MapLibreState = {
  instance: Map | undefined,
  initLayers: Array<Marker|Popup>
}

const { state, onChange } = createStore<MapLibreState>({
  instance: undefined,
  initLayers: []
});

onChange('instance', (newValue) => {
  state.initLayers.forEach(marker => marker.addTo(newValue));
  state.initLayers = [];
});


export default state;
