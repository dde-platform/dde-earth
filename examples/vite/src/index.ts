import { MVTLayerLoader } from "@dde-earth/plugin-mvt-loader";
import { TIFFLayerLoader } from "@dde-earth/plugin-tiff-loader";
import {
  LayerLoaders,
  LayerSwitcher,
  Subscriber,
} from "@dde-earth/recommend-plugins";
import { ArcGisMapServerImageryProvider, ImageryLayer } from "cesium";
import { Earth } from "dde-earth";

import type { I18N } from "dde-earth";

import "./index.css";

import { NCLayerLoader } from "@dde-earth/plugin-nc-loader";

// Earth initialization
const earth = new Earth("container", {
  baseLayer: ImageryLayer.fromProviderAsync(
    ArcGisMapServerImageryProvider.fromUrl(
      "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
      {
        enablePickFeatures: false,
      },
    ),
    {},
  ),
  toolOptions: {
    i18n: {},
  },
});

console.log(earth);

// use earth subscriber plugin
earth.usePlugin(new Subscriber(), {
  pickResult: {
    enable: true,
  },
});

earth.on("LEFT_CLICK", (movement, result) => {
  console.log(movement, result);
});

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

setTimeout(async () => {
  // use basic layer loader
  earth.usePlugin(
    new LayerLoaders({
      defaultRenderOptions: {
        wms: {
          alpha: 0.5,
        },
      },
    }),
  );

  const wmsLayer = await earth.addLayer<"wms">({
    layerName: "wms",
    method: "wms",
    url: "https://ahocevar.com/geoserver/wms",
    layers: "ne:ne",
    renderOptions: {
      hue: 3,
    },
  });
  console.log(wmsLayer);

  const plugin = earth.getPlugin("layer");
  console.log(plugin);

  // use tiff layer loader plugin
  earth.usePlugin(new TIFFLayerLoader());
  const tiffLayer = await earth.addLayer<"tiff">({
    method: "tiff",
    url: "/cogtif.tif",
    layerName: "cogtiff",
    renderOptions: {
      alpha: 0.5,
    },
  });
  tiffLayer.render({
    alpha: 0.7,
    single: {
      colorScale: "rainbow",
    },
  });
  console.log(tiffLayer);

  //use mvt layer loader plugin
  earth.usePlugin(new MVTLayerLoader());
  const mvtLayer = await earth.addLayer<"mvt">({
    method: "mvt",
    url: "/style.json",
    layerName: "mvt_test",
    renderOptions: {
      alpha: 0.5,
    },
  });
  await mvtLayer.render({
    alpha: 0.5,
  });
  console.log(mvtLayer);

  // use LayerSwither plugin
  earth.usePlugin(new LayerSwitcher());
  earth.on("layer:move", (info) => console.log("layer:move", info));
  console.log(earth.viewer.imageryLayers);
  earth.moveLayer(tiffLayer, mvtLayer);
}, 0);

//NC图层加载测试

// 默认的颜色配置
const defaultColorTable = [
  [0.015686, 0.054902, 0.847059],
  [0.12549, 0.313725, 1.0],
  [0.254902, 0.588235, 1.0],
  [0.427451, 0.756863, 1.0],
  [0.52549, 0.85098, 1.0],
  [0.611765, 0.933333, 1.0],
  [0.686275, 0.960784, 1.0],
  [0.807843, 1.0, 1.0],
  [1.0, 0.996078, 0.278431],
  [1.0, 0.921569, 0.0],
  [1.0, 0.768627, 0.0],
  [1.0, 0.564706, 0.0],
  [1.0, 0.282353, 0.0],
  [1.0, 0.0, 0.0],
  [0.835294, 0.0, 0.0],
  [0.619608, 0.0, 0.0],
];

//加载NC文件
const file: Blob[] | undefined = [];
const fileInput: any = document.getElementById("fileInput");
fileInput.onchange = function () {
  file[0] = fileInput.files[0];
  console.log(file[0]);
  console.log(file[0]);
};
//加载插件
earth.usePlugin(new NCLayerLoader());
//类型为NCLayerItem
let loadedNCLayer: any = undefined;
//测试按文件加载功能
const loadButton = document.getElementById("load");
loadButton.addEventListener("click", () => {
  if (file[0] && loadedNCLayer === undefined) {
    earth
      .addLayer({
        layerName: "nc-demo",
        method: "nc",
        url: file[0],
        renderOptions: {},
      })
      .then((layer) => {
        loadedNCLayer = layer;
        console.log(loadedNCLayer);
      });
  } else if (!file[0]) {
    alert("Please select a file first!");
  } else console.log("an NC-file reload is happend");
});
//测试url加载图层
const load2Button = document.getElementById("load2");
load2Button.addEventListener("click", () => {
  if (loadedNCLayer === undefined) {
    earth
      .addLayer({
        layerName: "nc-demo",
        method: "nc",
        url: "./demo.nc",
        renderOptions: {},
      })
      .then((layer) => {
        loadedNCLayer = layer;
        console.log(loadedNCLayer);
      });
  } else console.log("an NC-file reload is happend");
});
//测试移除图层
const removeButton = document.getElementById("remove");
removeButton.addEventListener("click", () => {
  if (loadedNCLayer) {
    loadedNCLayer.remove();
    loadedNCLayer = undefined;
  } else alert("please load an nc file first!");
});
//测试渲染1（默认渲染）
const render0Button = document.getElementById("render0");
render0Button.addEventListener("click", () => {
  if (loadedNCLayer) {
    loadedNCLayer.render({
      layer: loadedNCLayer.instance,
      colorTable: defaultColorTable,
      maxParticles: 500 * 500,
    });
  } else alert("please load an nc file first!");
});
//测试粒子数更改1（动态渲染）
const render1Button = document.getElementById("render1");
render1Button.addEventListener("click", () => {
  if (loadedNCLayer) {
    loadedNCLayer.render({
      layer: loadedNCLayer.instance,
      maxParticles: 100 * 100,
    });
  } else alert("please load an nc file first!");
});
//测试粒子数更改2（动态渲染）
const render2Button = document.getElementById("render2");
render2Button.addEventListener("click", () => {
  if (loadedNCLayer) {
    loadedNCLayer.render({
      layer: loadedNCLayer.instance,
      maxParticles: 300 * 300,
    });
  } else alert("please load an nc file first!");
});
//测试色带更改（重加载渲染）
const render3Button = document.getElementById("render3");
render3Button.addEventListener("click", () => {
  if (loadedNCLayer) {
    loadedNCLayer.render({
      layer: loadedNCLayer.instance,
      colorTable: [
        [1.0, 0.282353, 0.0],
        [0.619608, 0.0, 0.0],
        [0.619608, 0.0, 0.0],
        [1.0, 0.282353, 0.0],
        [0.619608, 0.0, 0.0],
        [1.0, 0.282353, 0.0],
        [0.619608, 0.0, 0.0],
      ],
    });
  } else alert("please load an nc file first!");
});

//测试显示图层
const showButton = document.getElementById("show");
showButton.addEventListener("click", () => {
  if (loadedNCLayer) {
    loadedNCLayer.show = true;
  } else alert("please load an nc file first!");
});
//测试隐藏图层
const hideButton = document.getElementById("hide");
hideButton.addEventListener("click", () => {
  if (loadedNCLayer) {
    loadedNCLayer.show = false;
  } else alert("please load an nc file first!");
});
