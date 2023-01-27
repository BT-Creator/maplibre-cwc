# maplibre-raster-source



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                      | Type             | Default     |
| -------- | --------- | -------------------------------- | ---------------- | ----------- |
| `scheme` | `scheme`  | The format of the URL parameters | `"tms" \| "xyz"` | `'xyz'`     |
| `url`    | `url`     | The url to fetch the tiles       | `string`         | `undefined` |


## Events

| Event          | Description                                   | Type                                                            |
| -------------- | --------------------------------------------- | --------------------------------------------------------------- |
| `sourceCreate` | Fire an event that the layer has been created | `CustomEvent<{ id: string; spec: RasterSourceSpecification; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
