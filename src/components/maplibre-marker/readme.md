# maplibre-marker



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description                                                                                                               | Type                                                                                                     | Default     |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------- |
| `lngLat` _(required)_ | `lng-lat` | The latitude & longitude of the marker. Should be an 2-length number array or a JSON Array string (E.g. [0.2354, 10.554]) | `LngLat \| [number, number] \| string \| { lng: number; lat: number; } \| { lon: number; lat: number; }` | `undefined` |


## Events

| Event          | Description                                    | Type                  |
| -------------- | ---------------------------------------------- | --------------------- |
| `layerCreated` | Fires an event that the layer has been created | `CustomEvent<Marker>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
