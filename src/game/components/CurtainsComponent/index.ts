import Curtains from "./Curtains";
import MainStateManager, { GameStatus, MainState } from "../../states/main";

class CurtainsComponent {
  private scene: Phaser.Scene;
  private mainManager: MainStateManager;
  private mainState: MainState;
  private curtains?: Curtains;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onMainStateChange);
    this.mainState = this.mainManager.state;

    if (scene.scene.key === "Game") {
      this.createIntro()
    } else if (scene.scene.key === "ScoreScene") {
      this.createScore()
    }
  }
  
  private createIntro() {
    this.curtains = new Curtains(
      this.scene,
      "curtains",
      "logo",
      false
    ).setDepth(50);

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
    this.curtains = new Curtains(
      this.scene,
      "curtains",
      "open",
      false
    ).setDepth(50);

    this.curtains.spine.state.addListener({
      start: () => { },
      complete: () => { this.onAnimationComplete(this.curtains!.spine) },
      event: () => { },
      interrupt: () => { },
      end: () => { },
      dispose: () => { },
    });
  }

  private delete() {}

  public initCodeAnimations() {
    this.curtains!.playAnimation("code-open", false)
  }

  private onAnimationComplete(spine: SpineGameObject) {
    let animation = spine.getCurrentAnimation(0)

    switch (animation.name) {
      case "open":
        this.curtains!.playAnimation("loop-score", true)
        break;
      case "code-open":
        this.curtains!.playAnimation("loop-code", true)
        setTimeout(() => {
          this.curtains!.playAnimation("code-closed", false)
        }, 2000);
        break;
      case "code-closed":
        this.curtains!.playAnimation("transition", false)
        break;
      default:
        break;
    }
  }

  private onMainStateChange = (state: MainState) => {
    console.log('on main state')
    if (
      state.gameStatus !== this.mainState.gameStatus &&
      state.gameStatus === GameStatus.willLaunch
    ) {
      console.log('will launch')
      this.curtains!.playAnimation("transition", false);
    }

    this.mainState = state;
  };
}

export default CurtainsComponent;
