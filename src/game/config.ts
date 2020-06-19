import * as Phaser from "phaser";
import "phaser/plugins/spine/dist/SpinePlugin";

import GameScene from "./scenes/Game";
import TestScene from "./scenes/test";
import TestSceneSpine from "./scenes/test/spine";
import TestSceneDrag from "./scenes/test/dragqueen";
import TestSceneBackground from "./scenes/test/background";
import TestSceneCrowd from "./scenes/test/crowd";
import TestSceneBlob from "./scenes/test/blob";
import TestSceneCurtainBefore from "./scenes/test/curtain/before";
import TestSceneCurtainAfter from "./scenes/test/curtain/after";
import confetti from "./scenes/test/confetti";
import Score from "./scenes/Score";
import ScoreScene from "./scenes/Score";
import MainScene from "./scenes/Main";

export const DEFAULT_WIDTH = 1280;
export const DEFAULT_HEIGHT = 720;

export const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Brille Chérie",
  parent: "phaser-game",
  type: Phaser.WEBGL,
  scale: {
    // we do scale the game manually in resize()
    mode: Phaser.Scale.NO_ZOOM,
    width: window.innerWidth,
    height: window.innerHeight,
  },

  height: DEFAULT_HEIGHT,
  width: DEFAULT_WIDTH,

  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [MainScene, GameScene, ScoreScene],
  // scene: [TestScene, TestSceneSpine, TestSceneDrag, TestSceneBackground, TestSceneCrowd, TestSceneBlob],
  plugins: {
    scene: [
      {
        key: "SpinePlugin",
        plugin: window.SpinePlugin,
        mapping: "spine",
      },
    ],
  },
  backgroundColor: "#e3e3e3",
};

export default gameConfig;
