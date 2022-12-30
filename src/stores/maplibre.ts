import { createStore } from '@stencil/store';
import { Map, Marker } from 'maplibre-gl';

declare type MapLibreState = {
  instance: Map | undefined,
  markers: Array<Marker>
}

const { state, onChange } = createStore<MapLibreState>({
  instance: undefined,
  markers: []
});

onChange('instance', (newValue) => {
  state.markers.forEach(marker => marker.addTo(newValue));
});


export default state;
