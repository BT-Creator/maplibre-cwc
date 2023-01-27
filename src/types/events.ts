import { IControl, RasterSourceSpecification } from 'maplibre-gl';

declare type ControlInstance = {
  instance: IControl,
  position: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'
}

declare type SourceInstance = {
  id: string,
  spec: RasterSourceSpecification
}

export { ControlInstance, SourceInstance };
