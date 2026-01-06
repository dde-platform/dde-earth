export interface GeoTimeData {
  start: number;
  end: number;
  name?: string;
}

export interface LayerItem {
  id: string;
  layer: {
    layerName: string;
    geologicAge?: number;
  };
}

export interface IntervalItem {
  id: number;
  name: string;
  abbr?: string;
  level: number;
  parentId?: number;
  textColor?: string;
  color: string;
  end: number;
  start: number;
  leaf?: boolean;
}

export interface GeoTimeScaleOptions {
  onChange?: (val: { data: IntervalItem }) => void;
  height?: number;
  tickLength?: number;
  neighborWidth?: number;
}
