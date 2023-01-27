import { Component, EventEmitter, Prop, Event } from '@stencil/core';
import { RasterSourceSpecification } from 'maplibre-gl';
import { SourceInstance } from '../../types/events';

@Component({tag: 'maplibre-raster-source'})
export class MaplibreRasterSource {

  /** The url to fetch the tiles */
  @Prop() url: string;
  /** The format of the URL parameters */
  @Prop() scheme: 'xyz' | 'tms' = 'xyz';

  /** Fire an event that the layer has been created */
  @Event({composed: true, bubbles: true}) sourceCreate: EventEmitter<SourceInstance>;

  _id: string = crypto.randomUUID();
  _spec: RasterSourceSpecification;


  /* LAYER */
  componentWillLoad() {
    this._spec = {
      type: 'raster',
      url: this.url,
      scheme: this.scheme
    };
  }

  componentDidLoad() {
    this.sourceCreate.emit({id: this._id, spec: this._spec});
  }

  // Nothing to display, so no render :(

}
