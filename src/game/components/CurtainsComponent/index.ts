import Curtains from "./Curtains";
import Score from "./Score";
import MainStateManager, { GameStatus, MainState } from "../../states/main";

class CurtainsComponent {
  private scene: Phaser.Scene;
  private curtains?: Curtains;
  private mainManager: MainStateManager;
  private score?: Score;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.mainManager = MainStateManager.getInstance();
    this.mainManager.onGameStatusChange(this.gameStatusChange);

    if (scene.scene.key === "Game") {
      this.createIntro();
    } else if (scene.scene.key === "ScoreScene") {
      this.createScore();
    }
  }

  private createIntro() {
    this.curtains = new Curtains(this.scene, "curtains", "logo", false);

    // this.curtains.spine.state.addListener({
    //   start: () => { },
    //   complete: () => { this.onAnimationComplete(this.curtains!.spine) },
    //   event: () => { },
    //   interrupt: () => { },
    //   end: () => { },
    //   dispose: () => { },
    // });
  }

  private createScore() {
    this.curtains = new Curtains(this.scene, "curtains", "open", false);

    this.score = new Score(this.scene, "score", "open", false);

    this.curtains.spine.state.addListener({
      start: () => {},
      complete: () => {
        this.onAnimationComplete(this.curtains!.spine);
      },
      event: () => {},
      interrupt: () => {},
      end: () => {},
      dispose: () => {},
    });
  }

  public initCodeAnimations() {
    this.curtains!.playAnimation("code-open", false);
    this.score!.playAnimation("code-open", false);
  }

  private onAnimationComplete(spine: SpineGameObject) {
    let animation = spine.getCurrentAnimation(0);

    switch (animation.name) {
      case "open":
        this.curtains!.playAnimation("loop-score", true);
        this.score!.playAnimation("loop-score", true);
        break;
      case "code-open":
        this.curtains!.playAnimation("loop-code", true);
        this.score!.playAnimation("loop-code", true);
        setTimeout(() => {
          this.curtains!.playAnimation("code-closed", false);
          this.score!.playAnimation("code-closed", false);
        }, 2000);
        break;
      case "code-closed":
        this.mainManager.restart();
        break;

      default:
        break;
    }
  }

  private gameStatusChange = (status: GameStatus) => {
    switch (status) {
      case GameStatus.willLaunch:
        this.curtains!.playAnimation("transition", false);
        break;
      case GameStatus.isGameOver:
        setTimeout(() => {
          this.curtains!.playAnimation("close", false);
        }, 2500);

        break;

      default:
        break;
    }
  };
}

export default CurtainsComponent;
