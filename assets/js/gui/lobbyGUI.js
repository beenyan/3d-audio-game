import vue from '../mainVue.js';
import GUIModel from '../model/GUIModel.js';

const gap = 15;
let sketch;
let text = '音階藝術家';
let textSize = 100;
let textWidth;
let title;
let modeBtn;
let settingBtn;

class LobbyGUI extends GUIModel {
  constructor(_sketch) {
    super({
      degree: 0,
    });
    sketch = _sketch;
  }
  setup() {
    sketch.angleMode(sketch.DEGREES);
    sketch.frameRate(30);
    sketch.noStroke();
    title = sketch.createGraphics(530, textSize * 2);
    title.background('skyblue');
    title.fill(255);
    title.textSize(textSize);
    title.textAlign(sketch.CENTER, sketch.CENTER);
    textWidth = title.textWidth(text);
    title.text(text, textWidth / 2, textSize);

    // 選擇遊戲模式
    modeBtn = sketch.createButton('選擇模式');
    modeBtn.position(textWidth / 2 - 40, (sketch.height + textSize) / 2);
    modeBtn.style('font-size', '50px');
    modeBtn.mousePressed(startPlay);

    // 設定按鈕
    settingBtn = sketch.createButton('設定');
    settingBtn.style('font-size', '50px');
    settingBtn.position(textWidth / 2 - 40, (sketch.height + textSize * 2 + gap) / 2);
    settingBtn.mousePressed(setting);
  }
  draw() {
    this.degree -= 1;
    sketch.background('skyblue');

    // Title 文字
    sketch.push();
    sketch.texture(title);
    sketch.rotateY(this.degree);
    for (let i = 0; i < 4; ++i) {
      sketch.push();
      sketch.rotateY(90 * i);
      sketch.translate(0, 0, textWidth / 4);
      sketch.plane(textWidth / 2, textSize);
      sketch.pop();
    }
    sketch.pop();
  }
}

function startPlay() {
  modeBtn.remove();
  settingBtn.remove();
  vue.GUI = 'mode';
}

function setting() {
  modeBtn.remove();
  settingBtn.remove();
  vue.GUI = 'setting';
}

export default LobbyGUI;
