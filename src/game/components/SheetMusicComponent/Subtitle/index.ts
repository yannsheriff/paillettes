import ScoreStateManager from "../../../states/score";

class Subtitle {
  private scene: Phaser.Scene;

  private animation?: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.create();
    const scorManager = ScoreStateManager.getInstance();
    scorManager.onFail(this.fail);
    scorManager.onGood(this.good);
    scorManager.onPerfect(this.perfect);
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
}

export default Subtitle;
