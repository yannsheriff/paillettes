import FreestyleStateManager, {
  FreestyleState,
} from "../../../states/freestyle";

const assetsWidth = 1920;

class GodMother {
  private scene: Phaser.Scene;
  private posX: number;
  private posY: number;
  private scale: number;
  private mother?: Phaser.GameObjects.Sprite;
  private freestyleState: FreestyleState;

  constructor(scene: Phaser.Scene, x: number, y: number, scale: number) {
    this.scene = scene;
    this.posX = x;
    this.posY = y;
    this.scale = scale;
    const freeManager = FreestyleStateManager.getInstance();
    this.freestyleState = freeManager.state;
    freeManager.subscribe(this.stateChange);
    this.create();
  }

  private create() {
    const scale = window.innerWidth / assetsWidth;
    this.mother = this.scene.physics.add
      .sprite(window.innerWidth / 2, window.innerHeight / 2, "god-mother-in")
      .setDepth(12)
      .setScale(scale);

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
