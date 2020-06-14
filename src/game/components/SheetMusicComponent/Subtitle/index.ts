import ScoreStateManager from "../../../states/score";
import FreestyleStateManager, {
  FreestyleState,
} from "../../../states/freestyle";

class Subtitle {
  private scene: Phaser.Scene;
  private freeState: FreestyleState;

  private animation?: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.freeState = FreestyleStateManager.getInstance().state;
    this.create();
    const scoreManager = ScoreStateManager.getInstance();
    scoreManager.onFail(this.fail);
    scoreManager.onGood(this.good);
    scoreManager.onPerfect(this.perfect);
    FreestyleStateManager.getInstance().subscribe(this.checkFreestyle);
  }

  private create() {
    this.animation = this.scene.physics.add.sprite(
      window.innerWidth / 2,
      window.innerHeight / 2 - 200,
      "perfect"
    );
    this.animation.setScale(0.5);
    this.animation.setDepth(11);
  }

  public perfect = () => {
    if (!this.freeState.isFreestyleActivated) {
      this.animation!.anims.play("perfect");
    }
  };
  public good = () => {
    if (!this.freeState.isFreestyleActivated) {
      this.animation!.anims.play("good");
    }
  };
  public fail = () => {
    if (!this.freeState.isFreestyleActivated) {
      this.animation!.anims.play("oops");
    }
  };

  private checkFreestyle = (state: FreestyleState) => {
    if (state.isFreestyleActivated) {
      this.animation!.anims.play("freestyle-enter").once(
        "animationcomplete",
        () => {
          this.animation!.anims.play("freestyle-loop");
        }
      );
    } else if (state.remainingLetters.length === 4) {
      this.animation!.anims.play("freestyle-exit");
    }

    this.freeState = state;
  };
}

export default Subtitle;
