import vue from '../mainVue.js';
import GUIModel from '../model/GUIModel.js';
import BackBtn from '../model/BackBtnModel.js';

let sketch;
let textSize = 80;
let title;
let describe;
let describeText = '';
const select = {
  mode: '一般模式',
  difficulty: '簡單',
};

const modeList = [
  {
    name: '一般模式',
    textSize: '40px',
    describe: `一個普通到不行的模式。`,
  },
  // {
  //   name: '特殊模式',
  //   textSize: '40px',
  //   describe: `經費不足，沒做出來的模式。`,
  // },
];

const difficultyList = [
  {
    name: '簡單',
    textSize: '30px',
    describe: `非常簡單的模式，給予想要放鬆\n的玩家遊玩。`,
  },
  {
    name: '普通',
    textSize: '30px',
    describe: `普通難度的模式，給予想要享受\n遊戲的玩家遊玩。`,
  },
  {
    name: '困難',
    textSize: '30px',
    describe: `困難難度的模式，給予想要挑戰\n遊戲的玩家遊玩。`,
  },
];
const buttonList = [];

class ModeGUI extends GUIModel {
  constructor(_sketch) {
    super({
      degree: 0,
    });
    sketch = _sketch;
  }
  setup() {
    sketch.angleMode(sketch.DEGREES);
    sketch.frameRate(30);

    // 模式
    let basePos = new p5.Vector(100, 200);
    let gap = 45;
    modeList.forEach((mode, index) => {
      const btn = sketch.createButton(mode.name);
      btn.class('mode');
      if (mode.name === select.mode) btn.addClass('active');
      btn.style('font-size', mode.textSize);
      btn.position(basePos.x, basePos.y + index * gap);
      btn.mouseOver(() => (describeText = mode.describe));
      btn.mouseOut(() => (describeText = ''));
      /**
      btn.mouseClicked((event) => {
        const self = event.target;
        const classNameList = new Set(self.className.trim().split(/\s+/));
        console.log(classNameList);
        for (const button of buttonList) {
        }
        select.mode = mode.name;
      });
       */
      buttonList.push(btn);
    });

    // 難度
    basePos = new p5.Vector(100, 450);
    difficultyList.forEach((difficulty, index) => {
      const btn = sketch.createButton(difficulty.name);
      btn.class('difficulty');
      if (difficulty.name === select.difficulty) btn.addClass('active');
      btn.style('font-size', difficulty.textSize);
      btn.position(basePos.x + btn.size().width * index, basePos.y);
      btn.mouseOver(() => (describeText = difficulty.describe));
      btn.mouseOut(() => (describeText = ''));
      btn.mouseClicked((event) => {
        for (const button of buttonList.filter((button) => button.hasClass('difficulty'))) {
          button.removeClass('active');
        }
        btn.addClass('active');
        select.difficulty = difficulty.name;
      });
      buttonList.push(btn);
    });

    // 開始遊戲
    basePos = new p5.Vector(550, 450 - 8);
    const btn = sketch.createButton('開始遊戲');
    btn.style('font-size', '36px');
    btn.position(basePos.x, basePos.y);
    btn.mouseClicked(startPlay);
    buttonList.push(btn);

    // 返回
    const backBtn = new BackBtn(sketch).setup();
    buttonList.push(backBtn);
    backBtn.mousePressed(() => {
      buttonList.forEach((btn) => btn.remove());
      vue.GUI = 'lobby';
    });

    // Text - Title
    title = sketch.createGraphics(530, textSize * 2);
    title.background('skyblue');
    title.fill('#1E90FF');
    title.textSize(textSize);
    title.textAlign(sketch.LEFT, sketch.TOP);
    title.text('遊戲模式選擇', 0, textSize / 2);
    // Text - describe
    describe = sketch.createGraphics(350, 200);
    describe.fill(128);
    describe.stroke(128);
    describe.strokeWeight(1);
    describe.textSize(24);
    describe.textAlign(sketch.LEFT, sketch.TOP);
  }
  draw() {
    this.degree -= 1;
    sketch.background('skyblue');

    // Text - Title
    sketch.push();
    sketch.translate(-sketch.width / 4, -sketch.height / 2);
    sketch.image(title, 0, 0);
    sketch.pop();
    // Text - describe
    sketch.push();
    sketch.translate(-sketch.width / 2, -sketch.height / 2);
    describe.background('skyblue');
    describe.text(describeText, 0, 12);
    sketch.image(describe, 350, 200);
    sketch.pop();
  }
}

function startPlay() {
  Object.assign(vue.playX, select);
  buttonList.forEach((btn) => btn.remove());
  vue.GUI = 'play';
}

export default ModeGUI;
