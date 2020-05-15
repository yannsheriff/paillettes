import config from "./config";
import '../../../class/SpineContainer/SpineContainer'
import DragQueen from "../../../classes/physic/DragQueen";
import { button, mask, persotestnb } from "../../../assets";

export class TestSceneDragQueen extends Phaser.Scene {
  private dragQueen?: DragQueen

  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.image('btn', button)
    this.load.image("mask", mask);
    this.load.image("persotestnb", persotestnb);
    // basic spineboy test
    this.load.setPath('assets/spine/spineboy/')
    this.load.spine('spineboy', 'spineboy.json', 'spineboy.atlas')
    // basic first spine character
    this.load.setPath('assets/spine/character/')
    this.load.spine('character', 'character.json', 'character.atlas')
    // color change slots test
    this.load.setPath('assets/spine/moyenage/')
    this.load.spine('world_1_girl', 'world_1_girl.json', 'world_1_girl.atlas')
    // skin change test
    this.load.setPath('assets/spine/moyenage/')
    this.load.spine('world_1_girl_color', 'world_1_girl_color.json', 'world_1_girl_color.atlas')
    // skin change test
    this.load.setPath('assets/spine/moyenage/')
    this.load.spine('world_1_girl_pant', 'world_1_girl_pant.json', 'world_1_girl_pant.atlas')
  }

  public create() {
    this.dragQueen = new DragQueen(this, 700, 500, 'world_1_girl_pant', 'run', false)

    let y = 100;
    let debug = true;

    this.add
      .text(100, 20, "Debug", { fill: 'black' })
      .setInteractive()
      .on('pointerdown', () => {
        if (this.dragQueen) {
          debug = !debug
          this.dragQueen.SpineContainer.drawDebug(debug)
        }
      })

    this.dragQueen.skinsList.forEach(skin => {
      this.add
      .text(100, y + 200, skin, { fill: 'black' })
      .setInteractive()
      .on('pointerdown', () => {
        if (this.dragQueen) {
          this.dragQueen.SpineContainer.changeSkin(skin)
        }
      })
      y += 25;
    });

    this.dragQueen.animationsList.forEach(animation => {
      this.add
      .text(100, y, animation, { fill: 'black' })
      .setInteractive()
      .on('pointerdown', () => {
        if (this.dragQueen) {
          this.dragQueen.SpineContainer.playAnimation(animation, true)
        }
      })
      y += 25;
    });

    this.dragQueen.slotList.forEach(slot => {
      this.add
      .text(300, y, slot, { fill: 'black' })
      .setInteractive()
      .on('pointerdown', () => {
        if (this.dragQueen) {
          this.dragQueen.SpineContainer.changeSlotColor(slot, 255, 0, 0)
        }
      })
      y += 25;
    });
  }

  public update() {
  }
}

export default TestSceneDragQueen;
