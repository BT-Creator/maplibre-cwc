# maplibre-base



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                                                                                                                                                                                                                                                                                                                                                                                                 | Type                | Default |
| ---------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| `hash`     | `hash`      | If true, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL. An additional string may optionally be provided to indicate a parameter-styled hash, *e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar* , where foo is a custom parameter and bar is an arbitrary hash distinct from the map hash. | `boolean \| string` | `false` |
| `maxPitch` | `max-pitch` | The maximum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues.                                                                                                                                                                                                                                                                                    | `number`            | `60`    |
| `maxZoom`  | `max-zoom`  | The maximum zoom level of the map (0-24)                                                                                                                                                                                                                                                                                                                                                                    | `number`            | `22`    |
| `minPitch` | `min-pitch` | The minimum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues.                                                                                                                                                                                                                                                                                    | `number`            | `0`     |
| `minZoom`  | `min-zoom`  | The minimum zoom level of the map (0-24)                                                                                                                                                                                                                                                                                                                                                                    | `number`            | `0`     |


## CSS Custom Properties

| Name           | Description            |
| -------------- | ---------------------- |
| `--map-height` | The height of the map. |
| `--map-width`  | The width of the map.  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
