import config from "./config";
import SpineContainer from "../../class/SpineContainer/SpineContainer";

export class SpineScene extends Phaser.Scene {
  private square:
    | (Phaser.GameObjects.Rectangle & {
      body: Phaser.Physics.Arcade.Body;
    })
    | undefined;
  private spineboy!: SpineGameObject;
  private bestSpineBoy!: SpineContainer;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private bestSpineBoyBody!: Phaser.Physics.Arcade.Body
  
  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.setPath('assets/spine/')
    this.load.spine('spineboy', 'spineboy.json', 'spineboy.atlas')
  }

  public create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    // this.square = this.add.rectangle(400, 400, 100, 100, 0xffffff) as any;
    // this.physics.add.existing(this.square!);

    this.spineboy = this.add.spine(400, 600, 'spineboy', 'idle', true);
    this.spineboy.setMix('walk', 'idle', 0.2)
    this.spineboy.setMix('idle', 'walk', 0.2)
    this.spineboy.drawDebug = false;
    this.spineboy.scaleX = 0.5;
    this.spineboy.scaleY = 0.5;
    this.spineboy.timeScale = 1;
    console.log(this.spineboy)
  }

  public update() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right!)) {
      this.spineboy.play('walk', true)
      this.spineboy.scaleX = 0.5;
    }
    if (Phaser.Input.Keyboard.JustUp(this.cursors.right!)) {
      this.spineboy.play('idle', true)
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left!)) {
      this.spineboy.play('walk', true)
      this.spineboy.scaleX = -0.5;
    }
    if (Phaser.Input.Keyboard.JustUp(this.cursors.left!)) {
      this.spineboy.play('idle', true)
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

export default SpineScene;
