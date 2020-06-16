import Curtains from "./Curtains";
import MainStateManager, { GameStatus, MainState } from "../../states/main";

class CurtainsComponent {
  private scene: Phaser.Scene;
  private curtains: Curtains;
  private mainManager: MainStateManager;
  private mainState: MainState;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onMainStateChange);
    this.mainState = this.mainManager.state;

    this.curtains = new Curtains(
      this.scene,
      "curtains",
      "07_Logo",
      false
    ).setDepth(50);
  }

  private create() {
    // this.mother.play("god-mother-in");
    // this.mother.once("animationcomplete", () => {
    //   this.mother?.play("god-mother-loop");
    // });
  }
  private delete() {}

  private onMainStateChange = (state: MainState) => {
    if (
      state.gameStatus !== this.mainState.gameStatus &&
      state.gameStatus === GameStatus.willLaunch
    ) {
      this.curtains.playAnimation("08_Transition", false);
    }

    // if (state.world !== this.mainState.world) {
    //   this.startWorldTransition(state.world);
    // }

    // if (
    //   state.isInTransition !== this.mainState.isInTransition &&
    //   !state.isInTransition
    // ) {
    //   this.endWorldTransition();
    // }

    this.mainState = state;
  };
}

export default CurtainsComponent;
