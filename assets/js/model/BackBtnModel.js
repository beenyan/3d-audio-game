let sketch;
let backBtn;

class BackBtn {
  constructor(_sketch, _textSize = 20) {
    sketch = _sketch;
    this.textSize = _textSize;
  }
  setup() {
    backBtn = sketch.createButton('返回');
    backBtn.id('back-btn');
    backBtn.style('font-size', `${this.textSize}px`);
    backBtn.position(0, sketch.height - backBtn.size().height - 5);
    return backBtn;
  }
}

export default BackBtn;
