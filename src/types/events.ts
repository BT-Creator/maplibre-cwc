import { IControl } from 'maplibre-gl';

declare type ControlObject = {
  instance: IControl,
  position: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'
}

export { ControlObject };
