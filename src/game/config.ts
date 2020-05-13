import * as Phaser from "phaser";
import 'phaser/plugins/spine/dist/SpinePlugin'

import MainScene from "./scenes/main";
import TestScene from "./scenes/test";
import TestSceneDragQueen from "./scenes/test/dragqueen";
import TestSceneBackground from "./scenes/test/backgroundcolor";
import TestSceneBackgroundAnimation from "./scenes/test/backgroundanimations";

export const DEFAULT_WIDTH = 1280;
export const DEFAULT_HEIGHT = 720;

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,

  scale: {
    width: window.innerWidth,
    height: window.innerHeight
  },

  width: window.innerWidth, // add resizing function
  height: window.innerHeight, // add resizing function

  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  scene: [TestScene, TestSceneDragQueen, TestSceneBackground, TestSceneBackgroundAnimation],
  plugins: {
    scene: [
      { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
    ]
  },
  parent: "phaser-game",
  backgroundColor: "#feeff1",
};

export default gameConfig;
