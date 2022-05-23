import vue from '../mainVue.js';
import GUIModel from '../model/GUIModel.js';
import BackBtn from '../model/BackBtnModel.js';

let sketch;
let title;
let minHz;
let maxHz;
let minHzSilder;
let maxHzSilder;
let baseY;
let baseX;
const gap = 80;

class SettingGUI extends GUIModel {
  constructor() {
    super({
      degree: 0,
    });
    sketch = vue.sketch;
  }
  setup() {
    sketch.frameRate(30);
    baseY = sketch.height / 3;
    baseX = -sketch.width / 3;

    // 返回
    const backBtn = new BackBtn(sketch).setup();
    vue.btnList.push(backBtn);
    backBtn.mousePressed(() => {
      maxHzSilder.remove();
      minHzSilder.remove();
      backBtn.remove();
      vue.GUI = 'lobby';
    });

    title = sketch.createGraphics(sketch.width, sketch.height);
    title.translate(sketch.width / 2, sketch.height / 2);
    title.fill('rgb(0, 64, 255)');
    title.textSize(72);
    title.textAlign(sketch.CENTER, sketch.TOP);
    title.text('設定', 0, -sketch.height / 2 + 50);

    minHz = sketch.createGraphics(sketch.width, sketch.height);
    minHz.translate(sketch.width / 2, 0);
    minHz.fill('rgb(0, 64, 255)');
    minHz.textSize(32);
    minHz.textAlign(sketch.LEFT, sketch.TOP);
    minHz.text(`最小接收頻率：${vue.setting.minHz}`, baseX, baseY);
    minHzSilder = sketch.createSlider(20, 1000, vue.setting.minHz);
    minHzSilder.position(sketch.width / 2 + baseX, baseY + 32);
    minHzSilder.style('width', '200px');

    maxHz = sketch.createGraphics(sketch.width, sketch.height);
    maxHz.translate(sketch.width / 2, 0);
    maxHz.fill('rgb(0, 64, 255)');
    maxHz.textSize(32);
    maxHz.textAlign(sketch.LEFT, sketch.TOP);
    maxHz.text(`最大接收頻率：${vue.setting.maxHz}`, baseX, baseY + gap);
    maxHzSilder = sketch.createSlider(2000, 8000, vue.setting.maxHz);
    maxHzSilder.position(sketch.width / 2 + baseX, baseY + 32 + gap);
    maxHzSilder.style('width', '200px');
  }
  draw() {
    sketch.background('skyblue');
    minHz.clear();
    maxHz.clear();
    vue.setting.minHz = minHzSilder.value();
    vue.setting.maxHz = maxHzSilder.value();
    minHz.text(`最小接收頻率：${vue.setting.minHz}`, baseX, baseY);
    maxHz.text(`最大接收頻率：${vue.setting.maxHz}`, baseX, baseY + gap);

    // text
    sketch.push();
    sketch.translate(-sketch.width / 2, -sketch.height / 2);
    sketch.image(title, 0, 0);
    sketch.image(minHz, 0, 0);
    sketch.image(maxHz, 0, 0);
    sketch.pop();
  }
}

export default SettingGUI;
