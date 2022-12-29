import { createStore } from '@stencil/store';
import { Map } from 'maplibre-gl';

declare type MapLibreState = {
  instance: Map | undefined
}

const { state } = createStore<MapLibreState>({
  instance: undefined
});


export default state;
