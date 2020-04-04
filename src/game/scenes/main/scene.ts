import config from "./config";
import { test, char, arrowD, arrowL, arrowR, arrowU } from "../../assets";
import Arrow from "../../classes/physic/Arrow";
import CharactereManager from "../../classes/logic/CharacterManager";
import PhysiqueCharactere from "../../classes/physic/Character";
import { sleep, stepEventPromise } from "./utils";

export class GameScene extends Phaser.Scene {
  private score: number = 0;
  private charactereManager: CharactereManager;

  constructor() {
    super(config);
    this.charactereManager = new CharactereManager();
  }

  public preload(): void {
    this.load.image("background", test);
    this.load.image("char", char);
    this.load.image("left", arrowL);
    this.load.image("right", arrowR);
    this.load.image("up", arrowU);
    this.load.image("down", arrowD);
  }

  /*
   *
   * handleArrowOverlap
   * register arrow if succesfull
   *
   */
  handleArrowOverlap = (arrow: Arrow) => {
    if (!arrow.didCollide) {
      arrow.didCollide = true;
      Promise.race([sleep(500), stepEventPromise()]).then(winningPromise => {
        if (winningPromise === arrow.direction) {
          this.charactereManager.registerSuccesfullArrow(arrow.id);
          arrow.destroy();
        }
      });
    }
  };

  /*
   *
   * handleCharacterOverlap
   * Do something with character if is valid
   *
   */
  handleCharacterOverlap = (character: Arrow) => {
    if (this.charactereManager.isCharacterSuccesfull(character.id)) {
      character.setVelocity(0);
      character.setAcceleration(0);
      character.setPosition(this.score * 50 + 50, 50);
      this.score += 1;
    }
  };

  public create() {
    this.add.image(400, 300, "background");
    const arrows: Array<Arrow> = [];
    const characters: Array<PhysiqueCharactere> = [];

    /*
     *
     * Event loop (trigger arrows)
     * temporairement un timout hardcoder
     *
     */
    for (let index = 0; index < 1; index++) {
      const interval = 800;
      setTimeout(() => {
        const {
          shouldLaunchCharacter,
          ID
        } = this.charactereManager.getArrowID();
        const element = new Arrow(this, ID);
        arrows.push(element);

        if (shouldLaunchCharacter) {
          const char = new PhysiqueCharactere(this, ID);
          characters.push(char);
        }
      }, interval * index);
    }

    /*
     *
     * Création des colliders
     * temporairement visible
     *
     */
    const goodArrowCollider = this.add.rectangle(
      400,
      400,
      100,
      800,
      0xffffff
    ) as any;
    this.physics.add.existing(goodArrowCollider);

    /*
     *
     * Initialisation des handler
     * utilisation des fonctions overlap
     */
    this.physics.add.overlap(
      arrows,
      goodArrowCollider,
      this.handleArrowOverlap,
      () => true,
      this
    );
    this.physics.add.overlap(
      characters,
      goodArrowCollider,
      this.handleCharacterOverlap,
      () => true,
      this
    );
  }

  public update() {
    // TODO
  }
}

export default GameScene;
