import config from "./config";
import '../../../class/SpineContainer/SpineContainer'
import DragQueen from "../../../classes/physic/DragQueen";
import { button } from "../../../assets";

export class TestSceneDragQueen extends Phaser.Scene {
  private dragQueen?: DragQueen

  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.image('btn', button)
    this.load.setPath('assets/spine/spineboy/')
    this.load.spine('spineboy', 'spineboy.json', 'spineboy.atlas')
    this.load.setPath('assets/spine/character/')
    this.load.spine('character', 'character.json', 'character.atlas')
  }

  public create() {
    this.dragQueen = new DragQueen(this, 400, 650, 'spineboy', 'run', false)

    let y = 100;
    this.dragQueen.animationsList.forEach(animation => {
      this.add
      .text(100, y, animation, { fill: 'white' })
      .setInteractive()
      .on('pointerdown', () => {
        if (this.dragQueen) {
          this.dragQueen.SpineContainer.playAnimation(animation, true)
        }
      })
      y += 25;
    });
  }

  public update() {
  }
}

export default TestSceneDragQueen;
