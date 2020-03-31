import config from "./config";

export class SpineScene extends Phaser.Scene {
  private square:
    | (Phaser.GameObjects.Rectangle & {
        body: Phaser.Physics.Arcade.Body;
      })
    | undefined;
  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.setPath('assets/spine/')
		this.load.spine('spineboy', 'spineboy.json', 'spineboy.atlas')
  }

  public create() {
    this.square = this.add.rectangle(400, 400, 100, 100, 0xffffff) as any;
    this.physics.add.existing(this.square!);
    this.add.spine(400, 600, 'spineboy', 'idle', true)
  }

  public update() {
    // TODO
  }
}

export default SpineScene;
