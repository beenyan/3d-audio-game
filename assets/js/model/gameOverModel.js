import vue from '../mainVue.js';

let sketch;
let title;

class GameOverModel {
  constructor() {
    sketch = vue.sketch;
    this.image = null;
    this.isInit = false;
  }
  setup() {
    // 重新開始遊戲
    const reStartBtn = sketch.createButton('重新開始遊戲');
    reStartBtn.position(sketch.width / 2, sketch.height / 2);
    reStartBtn.addClass('center');
    reStartBtn.style('font-size', '50px');
    reStartBtn.mouseClicked(reStart);
    vue.btnList.push(reStartBtn);

    // 返回大廳遊戲
    const lobbyBtn = sketch.createButton('返回大廳');
    lobbyBtn.position(sketch.width / 2, sketch.height / 2 + 80);
    lobbyBtn.addClass('center');
    lobbyBtn.style('font-size', '30px');
    lobbyBtn.mouseClicked(lobby);
    vue.btnList.push(lobbyBtn);

    title = sketch.createGraphics(sketch.width, sketch.height);
    title.translate(sketch.width / 2, sketch.height / 2);
    title.fill('rgb(255,255,0)');
    title.textSize(96);
    title.textAlign(sketch.CENTER, sketch.TOP);
    title.text('Game Over', 0, -sketch.height / 2 + 50);
  }
  init() {}
  save() {
    if (this.image !== null) return false;
    this.setup();
    this.image = sketch.get();
    return true;
  }
  draw() {
    sketch.push();
    sketch.translate(-sketch.width / 2, -sketch.height / 2);
    sketch.image(this.image, 0, 0);
    sketch.pop();

    sketch.fill('rgba(0,0,0,0.3)');
    sketch.noStroke();
    sketch.plane(sketch.width, sketch.height);

    // Text - Title
    sketch.push();
    sketch.translate(-sketch.width / 2, -sketch.height / 2);
    sketch.image(title, 0, 0);
    sketch.pop();
  }
}

function reStart() {
  vue.clear();
  vue.GUI = 'mode';
}

function lobby() {
  vue.clear();
  vue.GUI = 'lobby';
}

export default GameOverModel;
