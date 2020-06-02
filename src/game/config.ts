import * as Phaser from "phaser";
import "phaser/plugins/spine/dist/SpinePlugin";

import MainScene from "./scenes/main";
import TestScene from "./scenes/test";
import TestSceneSpine from "./scenes/test/spine";
import TestSceneBackground from "./scenes/test/background";
import TestSceneCharacters from "./scenes/test/characters";
import TestSceneBlob from "./scenes/test/blob";

export const DEFAULT_WIDTH = 1280;
export const DEFAULT_HEIGHT = 720;

export const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Brille Chérie",
  parent: "phaser-game",
  type: Phaser.WEBGL,

  scale: {
    // we do scale the game manually in resize()
    mode: Phaser.Scale.NONE,
    width: window.innerWidth,
    height: window.innerHeight,
  },

  height: DEFAULT_HEIGHT,
  width: DEFAULT_WIDTH,

  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: [MainScene],
  // scene: [TestScene, TestSceneSpine, TestSceneBackground, TestSceneCharacters, TestSceneBlob],
  plugins: {
    scene: [
      { key: "SpinePlugin", plugin: window.SpinePlugin, mapping: "spine" },
    ],
  },
  backgroundColor: "#e3e3e3",
};

export default gameConfig;
