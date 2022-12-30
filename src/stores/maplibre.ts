import { createStore } from '@stencil/store';
import { Map, Marker } from 'maplibre-gl';

declare type MapLibreState = {
  instance: Map | undefined,
  initMarkers: Array<Marker>
}

const { state, onChange } = createStore<MapLibreState>({
  instance: undefined,
  initMarkers: []
});

onChange('instance', (newValue) => {
  state.initMarkers.forEach(marker => marker.addTo(newValue));
  state.initMarkers = [];
});


export default state;
