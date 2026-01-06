export const styles = `
.geo-timescale-main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #2B2D31;
}

.geo-timescale-topbar {
  height: 1.25rem;
  background: #1C2C35;
  position: relative;
  padding-top: 15px;
}

.geo-timescale-container {
  width: 100%;
  height: calc(100% - 1.25rem);
  overflow: hidden;
  background: #2B2D31;
}

.gts-timeLine {
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
}

.gts-linebox {
  flex-grow: 1;
  height: 6px;
  width: 200px;
  border-left: 2px solid #d2d5d7;
  border-bottom: 1px solid #d2d5d7;
  position: relative;
}

.gts-linebox:last-child {
  border-right: 2px solid #d2d5d7;
}

.gts-scale {
  position: absolute;
  left: -2px;
  bottom: 0;
  height: 3px;
  width: 100%;
  background: linear-gradient(to right, #d2d5d7 1px, transparent 1px),
    linear-gradient(to bottom, #d2d5d7 0px, transparent 0px);
  background-size: 10px 100%, 100% 10px;
  background-position: 0 0;
}

.gts-arrow {
  width: 5.5px;
  height: 10px;
  position: absolute;
  background: #fc4c02;
  bottom: 5px;
  z-index: 10;
  transform: translateX(-1px);
  cursor: pointer;
}

.gts-arrow::after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  bottom: -4px;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 4px solid #fc4c02;
}

.gts-arrowTip,
.gts-arrowTip0,
.gts-arrowTipM {
  position: absolute;
  height: 13px;
  line-height: 13px;
  padding: 0 4px;
  border-radius: 4px;
  background: #fc4c02;
  bottom: -21px;
  left: 50%;
  font-size: 10px;
  text-align: center;
  color: #fff;
  transform: translateX(-50%);
}

.gts-arrowTip::after,
.gts-arrowTip0::after,
.gts-arrowTipM::after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  left: 50%;
  top: -3px;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-bottom: 4px solid #fc4c02;
  transform: translateX(-50%);
}

.gts-arrowTip0 {
  left: 0 !important;
}

.gts-arrowTip0::after {
  left: auto !important;
}

.gts-arrowTipM {
  left: 0 !important;
  transform: translateX(0) !important;
}

.gts-arrowTipM::after {
  left: 0 !important;
  transform: translateX(0) !important;
}

.gts-arrow:hover .gts-arrowTip {
  opacity: 1 !important;
  bottom: -29px;
}

.gts-number {
  color: #d2d5d7;
  position: absolute;
  top: -15px;
  right: -8px;
  font-size: 11px;
}

.gts-lightBlock {
  position: absolute;
  width: 0;
  background-color: rgba(240, 90, 40, 0.5);
  top: -15px;
  left: 20px;
  height: 20px;
  box-sizing: content-box;
  transition: all 200ms ease-in-out;
}

.gts-lightBlock::after,
.gts-lightBlock::before {
  content: "";
  position: absolute;
  height: 20px;
  width: 1px;
  background: #f05a28;
  top: 0;
}

.gts-lightBlock::after {
  right: 0;
}

.gts-lightBlock::before {
  left: 0;
}

.gts-firstTip,
.gts-nextTip {
  position: absolute;
  padding: 2px 2px;
  background-color: #f05a28;
  top: 4px;
  height: 12px;
  line-height: 8px;
  font-size: 10px;
  border-radius: 2px;
  transform: translate(-50%, 0px);
  color: #fff;
  z-index: 21;
}

.gts-firstTip {
  left: 0;
}

.gts-firstTip span {
  white-space: nowrap;
}

.gts-nextTip {
  right: 0;
  transform: translate(50%, 0px);
}
`;
