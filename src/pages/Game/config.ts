import * as Phaser from "phaser";
import 'phaser/plugins/spine/dist/SpinePlugin'

import MainScene from "./scenes/main";
import SpineScene from "./scenes/spine";
import SpineWithContainerScene from "./scenes/SpineWithContainer";

export const DEFAULT_WIDTH = 1280;
export const DEFAULT_HEIGHT = 720;

export const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Sample",
  type: Phaser.WEBGL,

  scale: {
    width: window.innerWidth,
    height: window.innerHeight
  },

  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  scene: SpineWithContainerScene,
  plugins: {
    scene: [
      { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
    ]
  },

  parent: "phaser-game",
  backgroundColor: "#000000"
};
