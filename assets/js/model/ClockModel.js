import vue from '../mainVue.js';

let sketch;

class ClockModel {
  constructor(_timeLimit, _r, _pos) {
    sketch = vue.sketch;
    this.startTime = +new Date();
    this.timeLimit = _timeLimit;
    this.r = _r;
    this.pos = _pos;
  }
  get isTimeUp() {
    return +new Date() - this.startTime > this.timeLimit;
  }
  reset() {
    this.startTime = +new Date();
  }
  draw() {
    const passTime = +new Date() - this.startTime;
    sketch.push();
    sketch.fill(255);
    sketch.translate(this.pos.x, this.pos.y);
    sketch.arc(
      0,
      0,
      this.r,
      this.r,
      -sketch.HALF_PI,
      sketch.PI - (passTime / this.timeLimit) * sketch.TWO_PI + sketch.HALF_PI
    );
    sketch.pop();
  }
}

export default ClockModel;
