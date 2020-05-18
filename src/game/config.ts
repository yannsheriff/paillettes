import * as Phaser from "phaser";
import 'phaser/plugins/spine/dist/SpinePlugin'

import MainScene from "./scenes/main";

export const DEFAULT_WIDTH = 1280;
export const DEFAULT_HEIGHT = 720;

export const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Brille Chérie",
  parent: 'phaser-game',
  type: Phaser.WEBGL,

  scale: {
      // we do scale the game manually in resize()
      mode: Phaser.Scale.NONE,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT
  },

  height: DEFAULT_HEIGHT,

  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  scene: MainScene,
  plugins: {
    scene: [
      { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
    ]
  },
  backgroundColor: "#000000"
};

export default gameConfig;
