import ScoreStateManager from "../../../states/score";
import FreestyleStateManager, {
  FreestyleState,
} from "../../../states/freestyle";

class Subtitle {
  private scene: Phaser.Scene;

  private animation?: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
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
    this.animation!.anims.play("perfect");
  };
  public good = () => {
    this.animation!.anims.play("good");
  };
  public fail = () => {
    this.animation!.anims.play("oops");
  };

  private checkFreestyle = (state: FreestyleState) => {
    if (state.isFreestyleActivated) {
      setTimeout(() => {
        this.animation!.anims.play("freestyle-enter").once(
          "animationcomplete",
          () => {
            this.animation!.anims.play("freestyle-loop");
          }
        );
      }, 2500);
    }
  };
}

export default Subtitle;
