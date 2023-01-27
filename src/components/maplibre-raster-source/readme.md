# maplibre-raster-source



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                          | Type             | Default     |
| ---------- | ----------- | ------------------------------------ | ---------------- | ----------- |
| `maxZoom`  | `max-zoom`  | The max zoom allowed for this source | `number`         | `22`        |
| `scheme`   | `scheme`    | The format of the URL parameters     | `"tms" \| "xyz"` | `'xyz'`     |
| `tileSize` | `tile-size` | The size of the tile in pixels       | `number`         | `512`       |
| `url`      | `url`       | The url to fetch the tiles           | `string`         | `undefined` |


## Events

| Event          | Description                                   | Type                                                            |
| -------------- | --------------------------------------------- | --------------------------------------------------------------- |
| `sourceCreate` | Fire an event that the layer has been created | `CustomEvent<{ id: string; spec: RasterSourceSpecification; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
