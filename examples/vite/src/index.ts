import { TIFFLayerLoader } from "@dde-earth/plugin-tiff-loader";
import { Earth } from "dde-earth";

import type { I18N } from "dde-earth";

import "./index.css";

import { LayerLoaders } from "@dde-earth/recommend-plugins";

// Earth initialization
const earth = new Earth("container", {
  toolOptions: {
    i18n: {},
  },
});

earth.usePlugin(new LayerLoaders());

earth.layerManager.changeBaseLayer({
  url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
  enablePickFeatures: false,
  method: "arcgis",
});

const tmsLayer = await earth.addLayer({
  url: "https://alpha.deep-time.org/tms/Scotese2018/5304326/{z}/{x}/{reverseY}.png",
  srs: "EPSG:4326",
  method: "tms",
});

earth.on("layer:render", (e) => {
  console.log("render", e);
});
tmsLayer.render({
  alpha: 0.5,
});
// earth.removeLayer(tmsLayer);

console.log(earth);

// Globalization test
const msg = {
  "dde-earth": {
    home: "test",
    test: "test",
  },
};
earth.i18n.extend({
  "de-DE": {
    "dde-earth": {
      home: "Geh nach Hause",
    },
  },
  "en-US": msg,
});

earth.i18n.locale = "de-DE" as any;
const str = (earth.i18n.getT as I18N.TranslateFunc<typeof msg>)("dde-earth")(
  "test",
);
console.log(str);

earth.usePlugin(new TIFFLayerLoader());

document.getElementById("addtiff").onclick = async () => {
  await earth.addLayer<"tiff">({
    method: "tiff",
    url: "/cogtif.tif",
    id: "cogtiff",
    renderOptions: {
      single: {
        colorScale: "rainbow",
      },
    },
  });
};

document.getElementById("removetiff").onclick = () => {
  earth.removeLayer("cogtiff").then((e) => {
    console.log(e);
  });
};
