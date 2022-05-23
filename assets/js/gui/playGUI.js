import vue from '../mainVue.js';
import GUIModel from '../model/GUIModel.js';
import ClockModel from '../model/ClockModel.js';
import TextModel from '../model/TextModel.js';
import GameOverModel from '../model/GameOverModel.js';
import Box from '../model/BoxModel.js';

let sketch;

let over;
let maxDistance;
let ma;
let mic; // 麥克風
let fft; // 頻率
let scoreText;
let score = 0;
let near;
let target = null;
let clock;
let hz;
const BoxList = [];
const Area = new p5.Vector(10, 0, 10);
const areaSize = 4 * Area.x * Area.z - 1;
const HzLimit = {
  min: vue.setting.minHz,
  max: vue.setting.maxHz,
};

class PlayGUI extends GUIModel {
  constructor(_sketch) {
    super();
    sketch = _sketch;
  }
  init() {
    HzLimit.min = vue.setting.minHz;
    HzLimit.max = vue.setting.maxHz;
    target = null;
    score = 0;
    BoxList.splice(0);
  }
  setup() {
    this.init();
    sketch.angleMode(sketch.RADIANS);
    sketch.frameRate(30);
    sketch.stroke(0);
    over = new GameOverModel();
    clock = new ClockModel(vue.timeLimit(), 50, new p5.Vector(sketch.width, sketch.height).sub(60, 60).div(2));
    near = vue.near();
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);

    ma = sketch.atan(sketch.cos(sketch.QUARTER_PI));
    maxDistance = sketch.dist(0, 0, Area.x, Area.z);
    for (let z = -Area.z; z < Area.z; ++z) {
      BoxList.push([]);
      for (let x = -Area.x; x < Area.x; ++x) {
        BoxList[z + Area.z].push(new Box(sketch, new p5.Vector(x, 0, z)));
      }
    }
    const imageSize = new p5.Vector(250, 38);
    const gap = new p5.Vector(5, imageSize.y + 6);
    scoreText = new TextModel(
      sketch,
      `分數：${score}`,
      imageSize,
      new p5.Vector(-sketch.width / 2 + gap.x, sketch.height / 2 - gap.y)
    );
    hz = new TextModel(sketch, '0 hz', imageSize, new p5.Vector(-sketch.width / 2 + gap.x, -sketch.height / 2));
    setTarget();
  }
  draw() {
    // 計時器
    if (clock.isTimeUp) {
      over.save();
      over.draw();
      return;
    }
    sketch.background('skyblue');
    clock.draw();

    sketch.push();
    const spectrum = fft.analyze();
    const centroidIndex = sketch.map(fft.getCentroid(), HzLimit.min, HzLimit.max, 0, areaSize);
    const Index = sketch.round(centroidIndex);

    sketch.ortho(-sketch.width * 1, sketch.width * 1, -sketch.height * 1, sketch.height * 1, -10000, 10000);
    sketch.rotateX(-ma);
    sketch.rotateY(sketch.QUARTER_PI);
    sketch.normalMaterial();
    sketch.lights();

    // 解析聲音
    const Center = new p5.Vector(Index % (Area.x * 2), sketch.floor(Index / (Area.x * 2)));
    for (let y = -near; y <= near; ++y) {
      const newY = Center.y + y;
      if (newY < 0 || newY >= Area.z * 2) continue;
      for (let x = -near; x <= near; ++x) {
        const newX = Center.x + x;
        if (newX < 0 || newX >= Area.x * 2) continue;
        if (target !== null && target.y === newY && target.x === newX) {
          getScore();
        }
        BoxList[newY][newX].vy = -0.2 + sketch.random(-5, 5) / 100;
      }
    }

    for (let y = 0; y < BoxList.length; y++) {
      for (let x = 0; x < BoxList[y].length; x++) {
        sketch.push();
        if (target !== null && target.y === y && target.x === x) sketch.fill('red');
        const box = BoxList[y][x];
        box.update();
        box.draw();
        sketch.pop();
      }
    }
    sketch.pop();

    // 分數
    scoreText.img.textSize(32);
    scoreText.img.fill(255);
    scoreText.img.background('skyblue');
    scoreText.draw();

    // hz
    hz.set(`${sketch.round(fft.getCentroid())} hz`);
    hz.img.textSize(32);
    hz.img.fill(255);
    hz.img.background('skyblue');
    hz.draw();
  }
}

function randomInt(min, max) {
  return sketch.floor(sketch.random(min, max));
}

function setTarget() {
  target = new p5.Vector(randomInt(0, Area.x * 2), randomInt(0, Area.z * 2));
}

function getScore() {
  scoreText.set(`分數：${++score}`);
  clock.reset();
  target = null;
  setTimeout(setTarget, 300);
}

export default PlayGUI;
