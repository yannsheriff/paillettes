import MainStateManager, { MainState } from "../../states/main";

class GlitterComponent {
  private scene: Phaser.Scene;

  private grounds: Phaser.GameObjects.Image[];
  private groundsAngles: number[];
  private mainState: MainState;
  private mainManager: MainStateManager;

  constructor(scene: Phaser.Scene) {
    this.groundsAngles = [];
    this.scene = scene;
    this.grounds = [];

    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onMainStateChange);
    this.mainState = this.mainManager.state;

    this.create();
  }

  private create() {
    const baseAngle = 264;
    const separationAngle = 2.6;

    // const ground = this.scene.add
    //   .image(
    //     this.circleCenter.x + this.circleRadius * Math.cos(radiants),
    //     this.circleCenter.y + this.circleRadius * Math.sin(radiants),
    //     "ground"
    //   )
    //   .setDepth(10)
    //   .setAngle(groundAngle + 90);
  }

  private onMainStateChange = (state: MainState) => {
    if (state.isGameLaunch !== this.mainState.isGameLaunch) {
      // this.canRotate = true;
    }
    this.mainState = state;
  };
}

export default GlitterComponent;
