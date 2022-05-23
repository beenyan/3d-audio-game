import GUIModel from '../model/GUIModel.js';
import PlayGUI from './playGUI.js';
import LobbyGUI from './lobbyGUI.js';
import ModeGUI from './ModeGUI.js';
import SettingGUI from './SettingGUI.js';
import vue from '../mainVue.js';

class ControlGUI extends GUIModel {
  constructor() {
    super({
      sketch: null,
      GUIList: [],
    });
  }
  init() {
    this.GUIList = {
      lobby: new LobbyGUI(this.sketch),
      mode: new ModeGUI(this.sketch),
      play: new PlayGUI(this.sketch),
      setting: new SettingGUI(),
    };
  }
  setup() {
    this.GUIList[vue.GUI].setup();
  }
  draw() {
    this.GUIList[vue.GUI].draw();
  }
}

const controlGUI = new ControlGUI();

export default controlGUI;
