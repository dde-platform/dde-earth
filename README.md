# dde-earth

Plugin based DDE(deep-time-digital-earth) earth sdk

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/dde-earth">
    <img alt="" src="https://badgen.net/npm/v/dde-earth">
  </a>
  <a aria-label="Package size" href="https://bundlephobia.com/result?p=dde-earth">
    <img alt="" src="https://img.shields.io/bundlephobia/minzip/dde-earth
">
  </a>
  <a aria-label="License" href="https://github.com/vercel/dde-earth/blob/main/LICENSE">
    <img alt="" src="https://badgen.net/npm/license/dde-earth">
  </a>
</p>

## ✨ Introduction

With just one line of code, you can save a lot of packaging work for cesium in your project and immediately have the following incredible features:

- Lightweight (core package gzip compressed to only 3.9kb)
- Supports rapid expansion of earth capabilities through plugins
- Supports TypeScript
- Supports multiple languages
- Layer management
- Terrain management
- Built-in event subscription (layer addition, layer removal, layer rendering, language switch, terrain switch…)
- Layer operations (zoom, render)
- …

In addition, the official provides a wealth of plugins to choose from:

- Mouse event subscription
- Layer order swap
- Basic layer loading (tms, wmts, wms, arcgis)
- geojson loading and rendering
- mvt loading and rendering
- nc loading and rendering
- tiff loading and rendering
- Navigation tools
- …

And [more](https://doc.dde-earth.com/docs/getting-started).

## 📖 Quick Start

```ts
import { TIFFLayerLoader } from "@dde-earth/plugin-tiff-loader";
import { Earth } from "dde-earth";

const earth = new Earth("container");

// Use plugin, load tiff
earth.usePlugin(new TIFFLayerLoader());

earth.addLayer({
  url: "./tiff.tiff",
  method: "tiff",
  renderOptions: {
    single: {
      colorScale: "rainbow",
    },
  },
});
```

In this example, after initializing the earth in one line of code, by adding the `TIFFLayerLoader` plugin, the `earth` has the ability to load `tiff`.

The complete TypeScript mechanism makes **dde-earth** have intelligent code hints. Developers will find that they have a `tiff` type layer when they call the `addLayer` method.

---

**View full documentation and examples on [doc.dde-earth.com](https://doc.dde-earth.com/).**

## License

[MIT License](./LICENSE)
