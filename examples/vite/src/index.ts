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
    url: "https://ddeassets-file.oss-cn-hongkong.aliyuncs.com/PaleoClimate/ts-a_51.tif?Expires=1708238465&OSSAccessKeyId=LTAI5t5i1Nsz8stMbSzCjbv5&Signature=xzuy8fP3rp5TgRPWMhTbElvYEXQ%3D",
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
