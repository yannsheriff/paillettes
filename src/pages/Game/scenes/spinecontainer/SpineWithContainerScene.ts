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
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spineboy = this.add.spineContainer(400, 550, 'spineboy', 'idle', true)
    console.log(this.spineboy)
    this.spineboy.setScale(0.5)
    const body = this.spineboy.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true)
    this.spineboy.setPhysicsSize(body.width * 0.5, body.height * 0.9)
  }

  public update() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right!)) {
      this.spineboy.playAnimation('walk', true)
      this.spineboy.faceDirection(1)
    }
    if (Phaser.Input.Keyboard.JustUp(this.cursors.right!)) {
      this.spineboy.playAnimation('idle', true)
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left!)) {
      this.spineboy.playAnimation('walk', true)
      this.spineboy.faceDirection(-1)
    }
    if (Phaser.Input.Keyboard.JustUp(this.cursors.left!)) {
      this.spineboy.playAnimation('idle', true)
    }
    if (this.cursors.right!.isDown) {
      // @ts-ignore
      this.spineboy.x += 5;
    } else if (this.cursors.left!.isDown) {
      // @ts-ignore
      this.spineboy.x -= 5;
    }
  }
}

export default SpineWithContainerScene;
