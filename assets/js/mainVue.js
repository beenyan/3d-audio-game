import controlGUI from './gui/GUI.js';
const { createApp } = Vue;

const difficultyToNear = {
  簡單: 2,
  普通: 1,
  困難: 0,
};

const difficultyToTimeLimit = {
  簡單: 10_000, // sec
  普通: 8_000,
  困難: 5_000,
};

const vue = createApp({
  data() {
    return {
      sketch: null,
      GUI: '',
      playX: {
        mode: '一般模式',
        difficulty: '簡單',
      },
      setting: {
        minHz: 600,
        maxHz: 3000,
      },
      btnList: [],
    };
  },
  methods: {
    clear() {
      this.btnList.forEach((btn) => btn.remove());
    },
    near() {
      return difficultyToNear[this.playX.difficulty];
    },
    timeLimit() {
      return difficultyToTimeLimit[this.playX.difficulty];
    },
  },
  watch: {
    GUI() {
      controlGUI.setup();
    },
  },
}).mount('#app');

export default vue;
