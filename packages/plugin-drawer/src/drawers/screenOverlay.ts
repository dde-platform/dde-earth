import type { Cartesian2 } from "cesium";

export interface ScreenOverlayStyle {
  fillColor?: string;
  lineColor: string;
  lineWidth: number;
  pointFillColor: string;
  pointRadius: number;
  pointStrokeColor: string;
  pointStrokeWidth: number;
}

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * 仅用于 2D 绘制态的屏幕叠加层，避免无限滚动时预览回落到错误副本。
 */
export class DrawingScreenOverlay {
  private root: HTMLDivElement;

  private svg: SVGSVGElement;

  constructor(container: HTMLElement) {
    this.root = document.createElement("div");
    this.root.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
    `;

    this.svg = document.createElementNS(SVG_NS, "svg");
    this.svg.style.width = "100%";
    this.svg.style.height = "100%";
    this.svg.style.overflow = "visible";
    this.root.appendChild(this.svg);

    container.appendChild(this.root);
  }

  destroy(): void {
    this.root.remove();
  }

  setVisible(visible: boolean): void {
    this.root.style.display = visible ? "block" : "none";
  }

  clear(): void {
    this.svg.replaceChildren();
  }

  renderPolyline(points: Cartesian2[], style: ScreenOverlayStyle): void {
    this.syncSize();
    this.svg.replaceChildren();

    if (points.length >= 2) {
      const polyline = document.createElementNS(SVG_NS, "polyline");
      polyline.setAttribute("points", this.stringifyPoints(points));
      polyline.setAttribute("fill", "none");
      polyline.setAttribute("stroke", style.lineColor);
      polyline.setAttribute("stroke-width", `${style.lineWidth}`);
      polyline.setAttribute("stroke-linecap", "round");
      polyline.setAttribute("stroke-linejoin", "round");
      this.svg.appendChild(polyline);
    }

    this.renderVertices(points, style);
  }

  renderPolygon(points: Cartesian2[], style: ScreenOverlayStyle): void {
    this.syncSize();
    this.svg.replaceChildren();

    if (points.length >= 3) {
      const polygon = document.createElementNS(SVG_NS, "polygon");
      polygon.setAttribute("points", this.stringifyPoints(points));
      polygon.setAttribute("fill", style.fillColor ?? "transparent");
      polygon.setAttribute("stroke", style.lineColor);
      polygon.setAttribute("stroke-width", `${style.lineWidth}`);
      polygon.setAttribute("stroke-linejoin", "round");
      this.svg.appendChild(polygon);
    } else if (points.length >= 2) {
      const polyline = document.createElementNS(SVG_NS, "polyline");
      polyline.setAttribute("points", this.stringifyPoints(points));
      polyline.setAttribute("fill", "none");
      polyline.setAttribute("stroke", style.lineColor);
      polyline.setAttribute("stroke-width", `${style.lineWidth}`);
      polyline.setAttribute("stroke-linecap", "round");
      polyline.setAttribute("stroke-linejoin", "round");
      this.svg.appendChild(polyline);
    }

    this.renderVertices(points, style);
  }

  private renderVertices(
    points: Cartesian2[],
    style: ScreenOverlayStyle,
  ): void {
    points.forEach((point) => {
      const vertex = document.createElementNS(SVG_NS, "circle");
      vertex.setAttribute("cx", `${point.x}`);
      vertex.setAttribute("cy", `${point.y}`);
      vertex.setAttribute("r", `${style.pointRadius}`);
      vertex.setAttribute("fill", style.pointFillColor);
      vertex.setAttribute("stroke", style.pointStrokeColor);
      vertex.setAttribute("stroke-width", `${style.pointStrokeWidth}`);
      this.svg.appendChild(vertex);
    });
  }

  private syncSize(): void {
    const width = this.root.clientWidth;
    const height = this.root.clientHeight;
    this.svg.setAttribute("width", `${width}`);
    this.svg.setAttribute("height", `${height}`);
    this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  private stringifyPoints(points: Cartesian2[]): string {
    return points.map((point) => `${point.x},${point.y}`).join(" ");
  }
}
