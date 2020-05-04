import config from "./config";
import '../../class/SpineContainer/SpineContainer'

export class SpineWithContainerScene extends Phaser.Scene {
  spineboy: any // to do
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.setPath('assets/spine/')
    this.load.spine('spineboy', 'spineboy.json', 'spineboy.atlas')
  }

  public create() {
    this.spineboy = this.add.spineContainer(400, 550, 'spineboy', 'idle', true)
    this.spineboy.setScale(0.6)
    const body = this.spineboy.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true)
    this.spineboy.setPhysicsSize(body.width * 0.5, body.height * 0.9)
    this.spineboy.playAnimation('run', true)
  }

  public update() {
  }
}

export default SpineWithContainerScene;
