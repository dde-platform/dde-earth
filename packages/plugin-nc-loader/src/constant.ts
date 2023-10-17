import type { NCLayerItem } from './NCLayerItem';

const defaultValueRange = { min: -100, max: 100 };

const defaultOffset = { lon: 0, lat: 0, lev: 0 };

// 默认的粒子运行参数
const defaultParticleSystemOptions = {
  maxParticles: 500 * 500, // 最大粒子数(会自动取平方数)
  particleHeight: 1000.0, // 粒子高度
  fadeOpacity: 0.95, // 拖尾透明度
  dropRate: 0.003, // 粒子重置率
  dropRateBump: 0.01, // 随速度增加的粒子重置率百分比，速度越快越密集，
  // 最终的粒子重置率particleDropRate = dropRate + dropRateBump * speedNorm;
  speedFactor: 0.5, // 粒子速度
  lineWidth: 4.0, // 线宽
  dynamic: true, // 是否动态运行
};

// 默认的颜色配置
// colorTalbe默认为白色，传入的数组为``[[r, g , b], [r, g, b], ...]``格式
// 例：[[234 / 255, 0, 0], [0, 123 / 255, 0]]，对应粒子colour字段值从低到高
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

const defaultColour = 'speed';

export const basicRenderOptions: NCLayerItem.RenderOptions = {
  valueRange: defaultValueRange,
  offset: defaultOffset,
  userInput: defaultParticleSystemOptions,
  colorTable: defaultColorTable,
  colour: defaultColour,
};

export const defaultRenderOptions: NCLayerItem.RenderOptions = {
  ...basicRenderOptions,
};
