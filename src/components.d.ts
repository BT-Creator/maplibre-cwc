/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { LngLatLike, Marker, Popup } from "maplibre-gl";
import { ControlInstance, SourceInstance } from "./types/events";
export namespace Components {
    interface MaplibreMap {
        /**
          * Allows the user to open the map in fullscreen mode
         */
        "allowFullscreen": boolean;
    }
    interface MaplibreMarker {
        /**
          * The latitude & longitude of the marker. Should be an 2-length number array or a JSON Array string (E.g. [0.2354, 10.554])
         */
        "lngLat": LngLatLike | string;
    }
    interface MaplibreNavControl {
        /**
          * Enables the compass control
         */
        "compass": boolean;
        /**
          * Enables the pitch control (and compass control, if not enabled)
         */
        "pitch": boolean;
        /**
          * The position of the control
         */
        "position": 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right';
        /**
          * Enables the zoom control
         */
        "zoom": boolean;
    }
    interface MaplibrePopup {
        /**
          * The latitude & longitude of the popup. Should be an 2-length number array or a JSON Array string (E.g. [0.2354, 10.554])
         */
        "lngLat": LngLatLike | string;
        /**
          * The max  width of the Maplibre popup itself. Accepts a CSSUnit as value.
         */
        "maxWidth": string;
    }
    interface MaplibreRasterSource {
        /**
          * The format of the URL parameters
         */
        "scheme": 'xyz' | 'tms';
        /**
          * The size of the tile in pixels
         */
        "tileSize": number;
        /**
          * The url to fetch the tiles
         */
        "url": string;
    }
}
export interface MaplibreMarkerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMaplibreMarkerElement;
}
export interface MaplibreNavControlCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMaplibreNavControlElement;
}
export interface MaplibrePopupCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMaplibrePopupElement;
}
export interface MaplibreRasterSourceCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMaplibreRasterSourceElement;
}
declare global {
    interface HTMLMaplibreMapElement extends Components.MaplibreMap, HTMLStencilElement {
    }
    var HTMLMaplibreMapElement: {
        prototype: HTMLMaplibreMapElement;
        new (): HTMLMaplibreMapElement;
    };
    interface HTMLMaplibreMarkerElement extends Components.MaplibreMarker, HTMLStencilElement {
    }
    var HTMLMaplibreMarkerElement: {
        prototype: HTMLMaplibreMarkerElement;
        new (): HTMLMaplibreMarkerElement;
    };
    interface HTMLMaplibreNavControlElement extends Components.MaplibreNavControl, HTMLStencilElement {
    }
    var HTMLMaplibreNavControlElement: {
        prototype: HTMLMaplibreNavControlElement;
        new (): HTMLMaplibreNavControlElement;
    };
    interface HTMLMaplibrePopupElement extends Components.MaplibrePopup, HTMLStencilElement {
    }
    var HTMLMaplibrePopupElement: {
        prototype: HTMLMaplibrePopupElement;
        new (): HTMLMaplibrePopupElement;
    };
    interface HTMLMaplibreRasterSourceElement extends Components.MaplibreRasterSource, HTMLStencilElement {
    }
    var HTMLMaplibreRasterSourceElement: {
        prototype: HTMLMaplibreRasterSourceElement;
        new (): HTMLMaplibreRasterSourceElement;
    };
    interface HTMLElementTagNameMap {
        "maplibre-map": HTMLMaplibreMapElement;
        "maplibre-marker": HTMLMaplibreMarkerElement;
        "maplibre-nav-control": HTMLMaplibreNavControlElement;
        "maplibre-popup": HTMLMaplibrePopupElement;
        "maplibre-raster-source": HTMLMaplibreRasterSourceElement;
    }
}
declare namespace LocalJSX {
    interface MaplibreMap {
        /**
          * Allows the user to open the map in fullscreen mode
         */
        "allowFullscreen"?: boolean;
    }
    interface MaplibreMarker {
        /**
          * The latitude & longitude of the marker. Should be an 2-length number array or a JSON Array string (E.g. [0.2354, 10.554])
         */
        "lngLat": LngLatLike | string;
        /**
          * Fires an event that the layer has been created
         */
        "onLayerCreate"?: (event: MaplibreMarkerCustomEvent<Marker>) => void;
    }
    interface MaplibreNavControl {
        /**
          * Enables the compass control
         */
        "compass"?: boolean;
        /**
          * Fires an event that the control has been created
         */
        "onControlCreate"?: (event: MaplibreNavControlCustomEvent<ControlInstance>) => void;
        /**
          * Enables the pitch control (and compass control, if not enabled)
         */
        "pitch"?: boolean;
        /**
          * The position of the control
         */
        "position"?: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right';
        /**
          * Enables the zoom control
         */
        "zoom"?: boolean;
    }
    interface MaplibrePopup {
        /**
          * The latitude & longitude of the popup. Should be an 2-length number array or a JSON Array string (E.g. [0.2354, 10.554])
         */
        "lngLat": LngLatLike | string;
        /**
          * The max  width of the Maplibre popup itself. Accepts a CSSUnit as value.
         */
        "maxWidth"?: string;
        /**
          * Fires an event that the layer has been created
         */
        "onLayerCreate"?: (event: MaplibrePopupCustomEvent<Popup>) => void;
    }
    interface MaplibreRasterSource {
        /**
          * Fire an event that the layer has been created
         */
        "onSourceCreate"?: (event: MaplibreRasterSourceCustomEvent<SourceInstance>) => void;
        /**
          * The format of the URL parameters
         */
        "scheme"?: 'xyz' | 'tms';
        /**
          * The size of the tile in pixels
         */
        "tileSize"?: number;
        /**
          * The url to fetch the tiles
         */
        "url"?: string;
    }
    interface IntrinsicElements {
        "maplibre-map": MaplibreMap;
        "maplibre-marker": MaplibreMarker;
        "maplibre-nav-control": MaplibreNavControl;
        "maplibre-popup": MaplibrePopup;
        "maplibre-raster-source": MaplibreRasterSource;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "maplibre-map": LocalJSX.MaplibreMap & JSXBase.HTMLAttributes<HTMLMaplibreMapElement>;
            "maplibre-marker": LocalJSX.MaplibreMarker & JSXBase.HTMLAttributes<HTMLMaplibreMarkerElement>;
            "maplibre-nav-control": LocalJSX.MaplibreNavControl & JSXBase.HTMLAttributes<HTMLMaplibreNavControlElement>;
            "maplibre-popup": LocalJSX.MaplibrePopup & JSXBase.HTMLAttributes<HTMLMaplibrePopupElement>;
            "maplibre-raster-source": LocalJSX.MaplibreRasterSource & JSXBase.HTMLAttributes<HTMLMaplibreRasterSourceElement>;
        }
    }
}
