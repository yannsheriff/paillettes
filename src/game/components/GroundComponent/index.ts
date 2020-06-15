import MainStateManager, { MainState } from "../../states/main";

class Ground {
  public ground?: Phaser.GameObjects.Image;
  public rotationSpeed: number;
  private circleRadius: number;
  private scene: Phaser.Scene;
  private circleCenter: {
    x: number;
    y: number;
  };
  private grounds: Phaser.GameObjects.Image[];
  private groundsAngles: number[];
  private canRotate: boolean = false;
  private mainState: MainState;
  private mainManager: MainStateManager;
  // base ground height = 220px
  private positionGroundY = window.innerHeight - window.innerHeight / 5;

  constructor(scene: Phaser.Scene) {
    this.groundsAngles = [];
    this.scene = scene;
    this.circleRadius = 8044;
    this.circleCenter = {
      x: window.innerWidth / 2,
      y: this.circleRadius + this.positionGroundY,
    };
    this.rotationSpeed = 0.04;
    this.grounds = [];

    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onMainStateChange);
    this.mainState = this.mainManager.state;

    this.create();
  }

  private create() {
    const baseAngle = 264;
    const separationAngle = 2.6;

    for (let index = 0; index < 6; index++) {
      const groundAngle = baseAngle + separationAngle * index;
      const radiants = groundAngle * (Math.PI / 180);
      const ground = this.scene.add
        .image(
          this.circleCenter.x + this.circleRadius * Math.cos(radiants),
          this.circleCenter.y + this.circleRadius * Math.sin(radiants),
          "ground"
        )
        .setDepth(10)
        .setAngle(groundAngle + 90);

      this.groundsAngles.push(groundAngle);
      this.grounds.push(ground);
    }
  }

  public update() {
    if (this.canRotate) {
      this.grounds.forEach((ground, index) => {
        const angle = (this.groundsAngles[index] -= this.rotationSpeed);
        if (angle < 262) {
          this.moveGroundBack(index);
          return;
        }
        const radians = angle * (Math.PI / 180);
        ground
          .setPosition(
            this.circleCenter.x + this.circleRadius * Math.cos(radians),
            this.circleCenter.y + this.circleRadius * Math.sin(radians)
          )
          .setAngle(angle + 90);
      });
    }
  }

  private moveGroundBack(index: number) {
    this.grounds.push(this.grounds[index]);
    this.grounds.shift();
    const newAngle = this.groundsAngles[this.groundsAngles.length - 1] + 2.6;
    this.groundsAngles.push(newAngle);
    this.groundsAngles.shift();
  }

  private onMainStateChange = (state: MainState) => {
    if (state.isGameLaunch !== this.mainState.isGameLaunch) {
      this.canRotate = true;
    }
    this.mainState = state;
  };
}

export default Ground;
