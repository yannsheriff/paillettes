import config from "./config";
import '../../../class/SpineContainer/SpineContainer'
import DragQueen from "../../../classes/physic/DragQueen";
import CharacterBis from "../../../classes/physic/CharacterBis";
import { button, mask, char } from "../../../assets";

export class TestSceneSpine extends Phaser.Scene {
  private characterList: Array<CharacterBis> = []

  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.image('btn', button)
    this.load.image("mask", mask);
    // man 1
    this.load.setPath('assets/spine/world1/man1/')
    this.load.spine('world_1_man_1', 'world_1_man_1.json', 'world_1_man_1.atlas')
    // man 2
    this.load.setPath('assets/spine/world1/man2/')
    this.load.spine('world_1_man_2', 'world_1_man_2.json', 'world_1_man_2.atlas')
    // woman 1
    this.load.setPath('assets/spine/world1/woman1/')
    this.load.spine('world_1_woman_1', 'world_1_woman_1.json', 'world_1_woman_1.atlas')
    // woman 1
    this.load.setPath('assets/spine/world1/woman2/')
    this.load.spine('world_1_woman_2', 'world_1_woman_2.json', 'world_1_woman_2.atlas')
  }

  public create() {
    let charactersWorld1 = ['world_1_man_1', 'world_1_man_2', 'world_1_woman_1', 'world_1_woman_2']
    this.add
      .text(50, 50, '< Retour', { fill: 'red' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('TestScene');
      })

    let y = 50;

    charactersWorld1.forEach(character => {
      this.add
      .text(150, y, 'Ajouter ' + character, { fill: 'red' })
      .setInteractive()
      .on('pointerdown', () => {
        this.addCharacter(character)
      })
      y+=25;
    });
    
    this.add
      .text(150, y, 'Clear', { fill: 'red' })
      .setInteractive()
      .on('pointerdown', () => {
        this.destroyAllCharacters()
    })

    let debug = true;

    this.add
    .text(50, 100, "Debug", { fill: 'black' })
    .setInteractive()
    .on('pointerdown', () => {
      debug = !debug
      this.characterList.forEach(character => {
        character.SpineContainer.drawDebug(debug)
      })
    })

  }

  public addCharacter(assetName: string) {
    this.destroyAllCharacters()
    let rand = Math.floor(Math.random() * 2)
    let character = new CharacterBis(this, 700, 500, assetName, 'Run', true)
    this.characterList.push(character)

    if (this.characterList.length === 1) {
      this.addDebug(character)
    }
  }

  public addDebug(character: CharacterBis) {
    let y = 150;

    character.skinsList.forEach(skin => {
      this.add
      .text(50, y, skin, { fill: 'black' })
      .setInteractive()
      .on('pointerdown', () => {
        character.SpineContainer.changeSkin(skin)
      })
      y += 25;
    });

    y = 300

    character.animationsList.forEach(animation => {
      this.add
      .text(50, y, animation, { fill: 'black' })
      .setInteractive()
      .on('pointerdown', () => {
        character.SpineContainer.playAnimation(animation, true)
      })
      y += 25;
    });

    y = 300;
    let speeds = [0.2, 0.5, 0.8, 1, 1.2, 1.5, 2]

    speeds.forEach(speed => {
      this.add
      .text(180, y, 'speed : ' + speed, { fill: 'black' })
      .setInteractive()
      .on('pointerdown', () => {
        character.SpineContainer.changeAnimationSpeed(speed)
      })
      y += 25;
    });

    // this.dragQueen.slotList.forEach(slot => {
    //   this.add
    //   .text(300, y, slot, { fill: 'black' })
    //   .setInteractive()
    //   .on('pointerdown', () => {
    //     if (this.dragQueen) {
    //       this.dragQueen.SpineContainer.changeSlotColor(slot, 255, 0, 0)
    //     }
    //   })
    //   y += 25;
    // });
  }

  public destroyAllCharacters() {
    this.characterList.forEach(character => {
      character.deleteCharacter()
    });
  }

  public update() {
  }
}

export default TestSceneSpine;
