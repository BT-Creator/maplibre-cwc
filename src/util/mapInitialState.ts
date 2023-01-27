import { MapInitialState } from '../components/maplibre-map/maplibre-map';

/**
 * Generates an empty style specification. Note that this **isn't** an usable one.
 * In order to make it usable, you'll need to add:
 * - A ID of a HTMLElement or an HTMLElement itself
 *
 * This will then generate a blank map, so you'll also want to add some style if you use this.
 * @returns Unprepared MapOptions object
 */
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
