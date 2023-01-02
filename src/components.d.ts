/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { LngLatLike, Marker, Popup } from "maplibre-gl";
export namespace Components {
    interface MaplibreMap {
        /**
          * Allows the user to open the map in fullscreen mode
         */
        "allowFullscreen": boolean;
        /**
          * If true, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL. An additional string may optionally be provided to indicate a parameter-styled hash, *e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar* , where foo is a custom parameter and bar is an arbitrary hash distinct from the map hash.
         */
        "hash": boolean | string;
        /**
          * The maximum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues.
         */
        "maxPitch": number;
        /**
          * The maximum zoom level of the map (0-24)
         */
        "maxZoom": number;
        /**
          * The minimum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues.
         */
        "minPitch": number;
        /**
          * The minimum zoom level of the map (0-24)
         */
        "minZoom": number;
    }
    interface MaplibreMarker {
        /**
          * The latitude & longitude of the marker. Should be an 2-length number array or a JSON Array string (E.g. [0.2354, 10.554])
         */
        "lngLat": LngLatLike | string;
    }
    interface MaplibrePopup {
        /**
          * The latitude & longitude of the popup. Should be an 2-length number array or a JSON Array string (E.g. [0.2354, 10.554])
         */
        "lngLat": LngLatLike | string;
        /**
          * String value that will be display in the pop-up
         */
        "text"?: string;
        /**
          * The width of the Maplibre popup itself. Accepts a CSSUnit as value.
         */
        "width": string;
    }
}
export interface MaplibreMarkerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMaplibreMarkerElement;
}
export interface MaplibrePopupCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMaplibrePopupElement;
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
    interface HTMLMaplibrePopupElement extends Components.MaplibrePopup, HTMLStencilElement {
    }
    var HTMLMaplibrePopupElement: {
        prototype: HTMLMaplibrePopupElement;
        new (): HTMLMaplibrePopupElement;
    };
    interface HTMLElementTagNameMap {
        "maplibre-map": HTMLMaplibreMapElement;
        "maplibre-marker": HTMLMaplibreMarkerElement;
        "maplibre-popup": HTMLMaplibrePopupElement;
    }
}
declare namespace LocalJSX {
    interface MaplibreMap {
        /**
          * Allows the user to open the map in fullscreen mode
         */
        "allowFullscreen"?: boolean;
        /**
          * If true, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL. An additional string may optionally be provided to indicate a parameter-styled hash, *e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar* , where foo is a custom parameter and bar is an arbitrary hash distinct from the map hash.
         */
        "hash"?: boolean | string;
        /**
          * The maximum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues.
         */
        "maxPitch"?: number;
        /**
          * The maximum zoom level of the map (0-24)
         */
        "maxZoom"?: number;
        /**
          * The minimum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues.
         */
        "minPitch"?: number;
        /**
          * The minimum zoom level of the map (0-24)
         */
        "minZoom"?: number;
    }
    interface MaplibreMarker {
        /**
          * The latitude & longitude of the marker. Should be an 2-length number array or a JSON Array string (E.g. [0.2354, 10.554])
         */
        "lngLat": LngLatLike | string;
        /**
          * Fires an event that the layer has been created
         */
        "onLayerCreated"?: (event: MaplibreMarkerCustomEvent<Marker>) => void;
    }
    interface MaplibrePopup {
        /**
          * The latitude & longitude of the popup. Should be an 2-length number array or a JSON Array string (E.g. [0.2354, 10.554])
         */
        "lngLat": LngLatLike | string;
        /**
          * Fires an event that the layer has been created
         */
        "onLayerCreated"?: (event: MaplibrePopupCustomEvent<Popup>) => void;
        /**
          * String value that will be display in the pop-up
         */
        "text"?: string;
        /**
          * The width of the Maplibre popup itself. Accepts a CSSUnit as value.
         */
        "width"?: string;
    }
    interface IntrinsicElements {
        "maplibre-map": MaplibreMap;
        "maplibre-marker": MaplibreMarker;
        "maplibre-popup": MaplibrePopup;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "maplibre-map": LocalJSX.MaplibreMap & JSXBase.HTMLAttributes<HTMLMaplibreMapElement>;
            "maplibre-marker": LocalJSX.MaplibreMarker & JSXBase.HTMLAttributes<HTMLMaplibreMarkerElement>;
            "maplibre-popup": LocalJSX.MaplibrePopup & JSXBase.HTMLAttributes<HTMLMaplibrePopupElement>;
        }
    }
}
