# maplibre-nav-control

Some special behavior to note:
- If the `pitch` attribute is set to true, the compass will automatically be set to true *(As this is needed in order to visualize the pitch)*

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                  | Type                                                           | Default       |
| ---------- | ---------- | ------------------------------------------------------------ | -------------------------------------------------------------- | ------------- |
| `compass`  | `compass`  | Enables the compass control                                  | `boolean`                                                      | `false`       |
| `pitch`    | `pitch`    | Enables the pitch control (and zoom control, if not enabled) | `boolean`                                                      | `false`       |
| `position` | `position` | The position of the control                                  | `"bottom-left" \| "bottom-right" \| "top-left" \| "top-right"` | `'top-right'` |
| `zoom`     | `zoom`     | Enables the zoom control                                     | `boolean`                                                      | `false`       |


## Events

| Event            | Description                                      | Type                                                                                                           |
| ---------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `controlCreated` | Fires an event that the control has been created | `CustomEvent<{ instance: IControl; position: "top-left" \| "top-right" \| "bottom-left" \| "bottom-right"; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
