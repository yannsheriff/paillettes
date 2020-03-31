import config from "./config";
import test from "./test.png";

export class GameScene extends Phaser.Scene {
  private square:
    | (Phaser.GameObjects.Rectangle & {
        body: Phaser.Physics.Arcade.Body;
      })
    | undefined;
  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.image("fb", test);
  }

  public create() {
    this.square = this.add.rectangle(400, 400, 100, 100, 0xffffff) as any;
    this.add.image(400, 300, "fb");
    this.physics.add.existing(this.square!);
  }

  public update() {
    // TODO
  }
}

export default GameScene;
