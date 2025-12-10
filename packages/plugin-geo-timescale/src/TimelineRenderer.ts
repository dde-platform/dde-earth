import { GTS_2020_SIMPLE } from "./data";
import { styles } from "./styles";

import type {
  GeoTimeData,
  GeoTimeScaleOptions,
  IntervalItem,
  LayerItem,
} from "./types";

// 动态加载 @zjugis/geo-timeline
let GeoTimeScale: typeof import("@zjugis/geo-timeline").GeoTimeScale | null =
  null;

async function loadGeoTimeline() {
  if (!GeoTimeScale) {
    const module = await import("@zjugis/geo-timeline");
    GeoTimeScale = module.GeoTimeScale;
  }
  return GeoTimeScale;
}

export class TimelineRenderer {
  private container: HTMLElement;
  private options: GeoTimeScaleOptions;
  private geoTimeline: InstanceType<
    typeof import("@zjugis/geo-timeline").GeoTimeScale
  > | null = null;
  private mainContainer: HTMLElement;
  private topBarContainer: HTMLElement;
  private timelineContainer: HTMLElement;
  private timelineId: string;
  private resizeTimeoutRef: NodeJS.Timeout | null = null;

  // 状态
  private geoTime: GeoTimeData | undefined;
  private layerItems: LayerItem[] = [];
  private val1 = 0;
  private val2 = 0;
  private isSame = false;

  constructor(container: HTMLElement, options: GeoTimeScaleOptions) {
    this.container = container;
    this.options = options;
    this.timelineId = `geo-timeline-${Date.now()}`;

    // 注入样式
    this.injectStyles();

    // 创建 DOM 结构
    this.mainContainer = this.createMainContainer();
    this.topBarContainer = this.createTopBarContainer();
    this.timelineContainer = this.createTimelineContainer();

    this.mainContainer.appendChild(this.topBarContainer);
    this.mainContainer.appendChild(this.timelineContainer);
    this.container.appendChild(this.mainContainer);

    // 初始化时间轴
    this.initTimeline();

    // 监听窗口大小变化
    this.setupResizeListener();
  }

  private injectStyles() {
    if (!document.getElementById("geo-timescale-styles")) {
      const styleElement = document.createElement("style");
      styleElement.id = "geo-timescale-styles";
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);
    }
  }

  private createMainContainer(): HTMLElement {
    const div = document.createElement("div");
    div.className = "geo-timescale-main";
    div.style.cssText = "width: 100%; height: 100%; overflow: hidden;";
    return div;
  }

  private createTopBarContainer(): HTMLElement {
    const div = document.createElement("div");
    div.className = "geo-timescale-topbar";
    return div;
  }

  private createTimelineContainer(): HTMLElement {
    const div = document.createElement("div");
    div.id = this.timelineId;
    div.className = "geo-timescale-container";
    return div;
  }

  private async initTimeline() {
    const element = document.getElementById(this.timelineId);
    if (!element?.clientWidth) return;

    element.innerHTML = "";

    const TimelineClass = await loadGeoTimeline();

    this.geoTimeline = new TimelineClass(element, GTS_2020_SIMPLE, {
      onChange: (val: { data: IntervalItem }) => {
        const geoTime: GeoTimeData = {
          start: val.data.start,
          end: val.data.end,
          name: val.data.name,
        };
        this.geoTime = geoTime;
        if (this.options.onChange) {
          this.options.onChange(val);
        }
      },
      height: this.options.height || 140,
      tickLength: this.options.tickLength || 10,
      neighborWidth: this.options.neighborWidth || 80,
    });

    // 恢复状态
    if (this.geoTime?.name && this.geoTimeline) {
      this.geoTimeline.transition = 0;
      this.geoTimeline.stage = this.geoTime.name;
      this.geoTimeline.transition = 450;
    }
  }

  private setupResizeListener() {
    const handleResize = () => {
      if (this.resizeTimeoutRef) {
        clearTimeout(this.resizeTimeoutRef);
      }

      this.resizeTimeoutRef = setTimeout(() => {
        this.initTimeline();
      }, 300);
    };

    window.addEventListener("resize", handleResize);
  }

  updateGeoTime(geoTime: GeoTimeData | undefined) {
    this.geoTime = geoTime;

    if (
      this.geoTimeline &&
      geoTime?.name &&
      this.geoTimeline.stage !== geoTime.name
    ) {
      this.geoTimeline.transition = 0;
      this.geoTimeline.stage = geoTime.name;
      this.geoTimeline.transition = 450;
    }

    this.renderTopBar();
  }

  updateLayerItems(layerItems: LayerItem[]) {
    this.layerItems = layerItems;

    const times: number[] = [];
    layerItems.forEach((item) => {
      if (item.layer) {
        times.push(item.layer.geologicAge || 0);
      }
    });

    this.updateTimeRange(times);
    this.isSame = times.every((element) => element === times[0]);
    this.renderTopBar();
  }

  private updateTimeRange(times: number[]) {
    const unique = Array.from(new Set(times));
    if (unique.length > 1) {
      const max = Math.max(...unique);
      const min = Math.min(...unique);
      this.val1 = max;
      this.val2 = min;
    } else {
      this.val1 = 0;
      this.val2 = 0;
    }
  }

  private renderTopBar() {
    this.topBarContainer.innerHTML = this.generateTopBarHTML();
  }

  private generateTopBarHTML(): string {
    const lineList = [500, 450, 400, 350, 300, 250, 200, 150, 100, 50, 0];
    const lineStart = 541;
    const { val1, val2, layerItems, isSame } = this;

    let firstI = 0;
    let widthI = 0;
    let firstL = 0;
    let secendL = 0;
    let lightW = 0;

    // 计算高亮区域
    lineList.forEach((item, index) => {
      const showTip1 =
        (!index && val1 > lineList[0]) ||
        (index && val1 >= item && val1 <= lineList[index - 1]);
      const showTip2 =
        (!index && val2 > lineList[0]) ||
        (index && val2 >= item && val2 <= lineList[index - 1]);
      const left = !index ? lineStart : lineList[index - 1];
      const right = !index ? lineList[0] : item;

      if (showTip1) {
        firstI = index;
        firstL = ((left - val1) * 100) / (left - right);
        if (val2 == 0) {
          widthI = lineList.length - firstI - 1;
          lightW = widthI * 100 + (100 - firstL) + 2;
        }
      }
      if (showTip2) {
        widthI = index - firstI - 1;
        secendL = ((left - val2) * 100) / (left - right);
        if (widthI < 0) {
          lightW = secendL - firstL;
        } else {
          lightW = widthI * 100 + secendL + (100 - firstL);
        }
      }
      if (val1 < lineList[lineList.length - 1]) {
        lightW = 2;
        firstL = 101;
      }
    });

    let html = '<div class="gts-timeLine">';

    lineList.forEach((item, index) => {
      const showTip1 =
        (!index && val1 > lineList[0]) ||
        (index && val1 > item && val1 <= lineList[index - 1]) ||
        (index == lineList.length - 1 &&
          val1 < lineList[lineList.length - 1] &&
          !!(val1 + val2));
      const bigN = lineList[index - 1] || lineStart;

      html += `<div class="gts-linebox">`;
      html += `<div class="gts-scale"></div>`;

      // 渲染图层箭头
      layerItems.forEach((layer) => {
        const _time = layer.layer.geologicAge || 0;

        if (
          layerItems.length == 2 &&
          (layerItems[0].layer.geologicAge || 0) !==
            (layerItems[1].layer.geologicAge || 0)
        ) {
          return;
        }

        if (
          (_time > item && _time < bigN) ||
          _time === item ||
          (_time === lineStart && !index)
        ) {
          if (
            layerItems.length > 2 &&
            [val1, val2].includes(_time) &&
            !isSame
          ) {
            return;
          }

          const _left =
            _time === item
              ? 0
              : bigN === _time
                ? 100
                : ((_time - item) / (bigN - item)) * 100;

          const arrowClass = _time
            ? _time > 538
              ? "gts-arrowTipM"
              : "gts-arrowTip"
            : "gts-arrowTip0";

          const opacity = layerItems.length > 3 && !isSame ? 0 : 1;

          html += `
            <div class="gts-arrow" style="left: ${_time ? 100 - _left : 98}%;">
              <div class="${arrowClass}" style="opacity: ${opacity};">
                ${_time}
              </div>
            </div>
          `;
        }
      });

      html += `<span class="gts-number">${item}</span>`;

      // 高亮区域
      const leftStyle =
        val1 <= lineStart && val1 >= 539
          ? 8 - (lineStart - val1) + "px"
          : lightW < 43
            ? "50%"
            : "0";

      const rightStyle = val2 <= 2 && val2 >= 0 ? 5 - val2 + "px" : "0";

      html += `
        <div class="gts-lightBlock" style="
          opacity: ${showTip1 ? 1 : 0};
          left: ${firstL}%;
          width: ${lightW}%;
          padding-right: ${widthI + 1 ? (widthI + 1) * 2 : 0}px;
        ">
          <div class="gts-firstTip" style="left: ${leftStyle};">
            <span>${lightW < 43 ? `${val1}~${val2}` : val1}</span>
          </div>
          ${
            lightW >= 43
              ? `
            <div class="gts-nextTip" style="right: ${rightStyle};">
              ${val2}
            </div>
          `
              : ""
          }
        </div>
      `;

      html += `</div>`;
    });

    html += "</div>";
    return html;
  }

  destroy() {
    if (this.resizeTimeoutRef) {
      clearTimeout(this.resizeTimeoutRef);
    }

    if (this.geoTimeline) {
      // GeoTimeScale 可能没有 destroy 方法，需要手动清理
      this.geoTimeline = null;
    }

    if (this.container) {
      this.container.innerHTML = "";
    }
  }
}
