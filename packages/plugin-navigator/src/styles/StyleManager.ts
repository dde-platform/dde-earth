import type { NavigatorTheme } from "../theme";

export class StyleManager {
  private styleElement: HTMLStyleElement | null = null;
  private readonly styleId = "dde-navigator-styles";

  constructor() {
    this.init();
  }

  private init() {
    // Remove existing styles
    this.removeStyles();

    // Create new style element
    this.styleElement = document.createElement("style");
    this.styleElement.id = this.styleId;
    document.head.appendChild(this.styleElement);
  }

  updateStyles(theme: NavigatorTheme) {
    if (!this.styleElement) {
      this.init();
    }

    const css = this.generateCSS(theme);
    if (this.styleElement) {
      this.styleElement.textContent = css;
    }
  }

  private generateCSS(theme: NavigatorTheme): string {
    const { compass, zoomController, position, transition } = theme;

    return `
      /* Compass Styles */
      .cesium-compass {
        position: absolute;
        bottom: ${position.bottom};
        right: ${position.compassRight};
        top: auto;
        width: ${compass.size}px;
        height: ${compass.size}px;
        cursor: pointer;
        user-select: none;
        pointer-events: auto;
        transition: ${transition.all};
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }

      .cesium-compass:hover {
        /* No shadow on hover */
      }

      .cesium-compass .out-ring {
        position: absolute;
        top: 0;
        left: 0;
        width: ${compass.size}px;
        height: ${compass.size}px;
        background: ${compass.outerRing.background};
        background-repeat: no-repeat;
        background-size: contain;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.1);
        transition: ${transition.transform};
        fill: ${compass.outerRing.fill};
      }

      .cesium-compass .out-ring svg {
        width: ${compass.size}px;
        height: ${compass.size}px;
        border-radius: 50%;
        color: ${compass.outerRing.background};
      }

      .cesium-compass .out-ring svg path:first-child {
        fill: currentColor;
      }

      .cesium-compass .out-ring svg path {
        fill: ${compass.outerRing.fill};
        fill-opacity: ${compass.outerRing.fillOpacity};
      }

      .cesium-compass:hover .rotation_marker svg {
        width: ${compass.size * compass.rotationMarker.hoverScale}px;
        height: ${compass.size * compass.rotationMarker.hoverScale}px;
      }

      .cesium-compass .gyro {
        position: relative;
        top: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: ${compass.size / 2}px;
        height: ${compass.size / 2}px;
        margin: 0 auto;
        padding: 4px;
        text-align: center;
        background: ${compass.innerGyro.background};
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 50%;
        transform: translateY(-50%);
        transition: ${transition.transform};
      }

      .cesium-compass .gyro svg {
        width: ${compass.size / 3}px;
        height: ${compass.size / 3}px;
        fill: ${compass.outerRing.fill};
        transition: ${transition.all};
      }

      .cesium-compass .rotation_marker {
        position: relative;
        background-repeat: no-repeat;
        background-size: contain;
        border-radius: 50%;
      }

      .cesium-compass .rotation_marker svg {
        position: absolute;
        top: 50%;
        left: 50%;
        width: ${compass.size}px;
        height: ${compass.size}px;
        transform: translate(-50%, -50%);
        transition: ${transition.transform};
      }

      .cesium-compass .gyro-active,
      .cesium-compass .gyro:hover {
        background: ${compass.innerGyro.background};
        outline: 2px solid ${compass.innerGyro.activeColor};
        outline-offset: -1px;
      }

      .cesium-compass .gyro-active svg,
      .cesium-compass .gyro:hover svg {
        fill: ${compass.innerGyro.activeColor};
      }

      /* Zoom Controller Styles */
      .cesium-zoom-controller {
        display: flex !important;
        right: ${position.zoomControllerRight};
        bottom: ${position.bottom};
        top: auto;
        border-radius: ${zoomController.borderRadius};
        background: ${zoomController.background};
        flex-direction: row;
        padding: ${zoomController.padding};
        gap: ${zoomController.gap};
        transition: ${transition.all};
      }

      .cesium-zoom-controller .cesium-button {
        background: ${zoomController.button.background};
        color: ${zoomController.button.color} !important;
        font-size: ${zoomController.button.fontSize};
        border-radius: 4px;
        border: none;
        padding: 6px 8px;
        transition: ${transition.all};
        font-weight: 500;
        min-width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .cesium-zoom-controller .cesium-button:hover {
        background: ${zoomController.button.hoverBackground};
        transform: translateY(-1px);
      }

      .cesium-zoom-controller .cesium-button:active {
        background: ${zoomController.button.activeBackground};
        color: ${zoomController.button.activeColor};
        transform: translateY(0);
      }


      /* Right panel layout adjustments */
      #earth .onRightPanel .cesium-compass {
        right: ${position.onRightPanel.compassRight} !important;
      }

      #earth .onRightPanel .cesium-zoom-controller {
        right: ${position.onRightPanel.zoomControllerRight} !important;
      }
    `;
  }

  removeStyles() {
    const existingStyle = document.getElementById(this.styleId);
    if (existingStyle) {
      existingStyle.remove();
    }
    this.styleElement = null;
  }

  destroy() {
    this.removeStyles();
  }
}
