import controlGUI from './gui/GUI.js';
import vue from './mainVue.js';

let isListenMicroPhone = false;

new p5((sketch) => {
  sketch.setup = () => {
    sketch.createCanvas(800, 600, sketch.WEBGL);
    vue.sketch = sketch;
    controlGUI.sketch = sketch;
    controlGUI.init();
    vue.GUI = 'lobby';
  };

  sketch.draw = () => {
    controlGUI.draw();
  };

  sketch.mousePressed = () => {
    if (!isListenMicroPhone) {
      sketch.userStartAudio();
      isListenMicroPhone = true;
    }
  };
}, 'canvas');
