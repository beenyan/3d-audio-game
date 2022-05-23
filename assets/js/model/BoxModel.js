let minHeight = 100;
let sketch;
class Box {
  constructor(_sketch, pos) {
    sketch = _sketch;
    this.pos = pos;
    this.vy = 0;
    this.size = new p5.Vector(40, minHeight, 40);
    this.distance = sketch.dist(0, 0, this.pos.x, this.pos.z);
  }
  update() {
    if (this.pos.y < 0) {
      this.vy += 0.03;
    }
    this.pos.y = sketch.constrain(this.pos.y + this.vy, -Infinity, 0);
  }
  draw() {
    sketch.push();

    sketch.translate(this.pos.copy().mult(this.size));
    sketch.box(this.size.x, this.size.y, this.size.z);

    sketch.pop();
  }
}

export default Box;
