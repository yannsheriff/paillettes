import config from "./config";
import SpineContainer from '../../class/SpineContainer/SpineContainer'

export class SpineWithContainerScene extends Phaser.Scene {  
  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.setPath('assets/spine/')
    this.load.spine('spineboy', 'spineboy.json', 'spineboy.atlas')
  }

  public create() {
    let spineboy = this.add.spineContainer(400, 550, 'spineboy', 'idle', true)
    spineboy.setScale(0.5)
    const body = spineboy.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true)
    spineboy.setPhysicsSize(body.width * 0.5, body.height * 0.9)
  }

  public update() {
  }
}

export default SpineWithContainerScene;
