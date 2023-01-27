import { MapInitialState } from '../components/maplibre-map/maplibre-map';

function generateEmptyState(): MapInitialState{
  return {
    layers: [],
    controls: [],
    options: {
      container: undefined,
      style: {
        version: 8,
        sources: {},
        layers: []
      }
    }
  };
}

export { generateEmptyState };
