import { Component, EventEmitter, Prop, Event } from '@stencil/core';
import { RasterSourceSpecification } from 'maplibre-gl';
import { SourceInstance } from '../../types/events';

@Component({tag: 'maplibre-raster-source'})
export class MaplibreRasterSource {

  /** The url to fetch the tiles */
  @Prop() url: string;
  /** The format of the URL parameters */
  @Prop() scheme: 'xyz' | 'tms' = 'xyz';
  /** The size of the tile in pixels */
  @Prop() tileSize = 512;
  /** Fire an event that the layer has been created */
  @Event({composed: true, bubbles: true}) sourceCreate: EventEmitter<SourceInstance>;

  /** The internal ID */
  _id: string = crypto.randomUUID();
  /** The layer specification */
  _spec: RasterSourceSpecification;


  /* LAYER */
  componentWillLoad() {
    this._spec = {
      type: 'raster',
      tiles: [
        this.url
      ],
      tileSize: this.tileSize,
      scheme: this.scheme
    };
  }

  componentDidLoad() {
    this.sourceCreate.emit({id: this._id, spec: this._spec});
  }

  // Nothing to display, so no render :(

}
