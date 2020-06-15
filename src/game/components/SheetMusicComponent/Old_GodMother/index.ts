import FreestyleStateManager, {
  FreestyleState,
} from "../../../states/freestyle";

import Align from "../../../helpers/Align/align";

const assetsWidth = 1920;

class GodMother {
  private scene: Phaser.Scene;
  private scale: number;
  private mother?: Phaser.GameObjects.Sprite;
  private freestyleState: FreestyleState;

  constructor(scene: Phaser.Scene, scale: number) {
    this.scene = scene;
    this.scale = scale;
    const freeManager = FreestyleStateManager.getInstance();
    this.freestyleState = freeManager.state;
    freeManager.subscribe(this.stateChange);
  }

  private create() {
    const scale = window.innerWidth / assetsWidth;
    this.mother = this.scene.physics.add
      .sprite(window.innerWidth / 2, window.innerHeight / 2, "god-mother-in")
      .setDepth(12)
      .setScale(scale);

    Align.top(this.mother)
    Align.centerH(this.mother)

    this.mother.play("god-mother-in");
    this.mother.once("animationcomplete", () => {
      this.mother?.play("god-mother-loop");
    });
  }
  private delete() {
    this.mother?.once("animationrepeat", () => {
      this.mother?.play("god-mother-out");
      this.mother?.once("animationcomplete", () => {
        this.mother?.destroy();
      });
    });
  }

  private stateChange = (state: FreestyleState) => {
    if (
      this.freestyleState.isFreestyleActivated !== state.isFreestyleActivated
    ) {
      if (state.isFreestyleActivated) {
        this.create();
      } else {
        this.delete();
      }
    }

    this.freestyleState = state;
  };
}

export default GodMother;
