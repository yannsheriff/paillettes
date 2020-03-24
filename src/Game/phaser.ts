import * as Phaser from "phaser";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game"
};

const alphabet: string = "zertr";

type Param = { a: number };

const fun = (param: { a: number }): number => {
  return param;
};

export class GameScene extends Phaser.Scene {
  private square:
    | (Phaser.GameObjects.Rectangle & {
        body: Phaser.Physics.Arcade.Body;
      })
    | undefined;
  constructor() {
    super(sceneConfig);
  }

  public create() {
    this.square = this.add.rectangle(400, 400, 100, 100, 0xffffff) as any;
    this.physics.add.existing(this.square!);
  }

  public update() {
    // TODO
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
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
  scene: GameScene,

  parent: "phaser-game",
  backgroundColor: "#000000"
};

export default new Phaser.Game(gameConfig);
