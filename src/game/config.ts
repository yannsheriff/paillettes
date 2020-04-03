import * as Phaser from "phaser";

import MainScene from "./scenes/main";

export const DEFAULT_WIDTH = 1280;
export const DEFAULT_HEIGHT = 720;

export const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Sample",

  type: Phaser.AUTO,

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
  scene: MainScene,

  parent: "phaser-game",
  backgroundColor: "#000000"
};
