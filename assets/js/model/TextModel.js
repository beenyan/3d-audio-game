let sketch;

class TextModel {
  constructor(_skect, _text, _size, _pos) {
    sketch = _skect;
    this.text = _text;
    this.size = _size;
    this.pos = _pos;
    this.img = sketch.createGraphics(this.size.x, this.size.y);
  }
  set(_text, _size = this.size, _pos = this.pos) {
    this.text = _text;
    this.size = _size;
    this.pos = _pos;
  }
  draw() {
    sketch.push();
    sketch.translate(this.pos.x, this.pos.y);
    this.img.text(this.text, 0, this.img.textSize());
    sketch.image(this.img, 0, 0);
    sketch.pop();
  }
}

export default TextModel;
