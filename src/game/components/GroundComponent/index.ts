import MainStateManager, { MainState, GameStatus } from "../../states/main";

const assetHeight = 454;
const assetWidth = 384;
class Ground {
  public ground?: Phaser.GameObjects.Image;
  public rotationSpeed: number;
  private circleRadius: number;
  private scale: number;
  private scene: Phaser.Scene;
  private circleCenter: {
    x: number;
    y: number;
  };
  private grounds: Phaser.GameObjects.Image[];
  private groundsAngles: number[];
  private canRotate: boolean = false;
  // base ground height = 454
  // base ground height = 454
  private positionGroundY: number;

  constructor(scene: Phaser.Scene) {
    this.groundsAngles = [];
    this.scene = scene;
    this.circleRadius = 8044;
    this.rotationSpeed = 0.04;
    this.grounds = [];
    this.scale = this.calculateGroundScale(window.innerHeight);
    this.positionGroundY = window.innerHeight - assetHeight / 2.1;
    this.circleCenter = {
      x: window.innerWidth / 2,
      y: this.circleRadius + this.positionGroundY,
    };

    MainStateManager.getInstance().onGameStatusChange(this.gameStatusChange);

    this.create();
  }

  private create() {
    const baseAngle = 264;
    const separationAngle = 2.6 * this.scale;

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
        .setScale(this.scale)
        .setAngle(groundAngle + 90);

      this.groundsAngles.push(groundAngle);
      this.grounds.push(ground);
    }
  }

  public update() {
    if (this.canRotate) {
      this.grounds.forEach((ground, index) => {
        const angle = (this.groundsAngles[index] -= this.rotationSpeed);

        const radians = angle * (Math.PI / 180);
        const x = this.circleCenter.x + this.circleRadius * Math.cos(radians);

        if (x < -((384 * this.scale) / 2)) {
          this.moveGroundBack(index);
          return;
        }
        ground
          .setPosition(
            x,
            this.circleCenter.y + this.circleRadius * Math.sin(radians)
          )
          .setAngle(angle + 90);
      });
    }
  }

  private calculateGroundScale = (windowHeight: number): number => {
    const groundWidth = window.innerWidth / 4.5;
    const groundScale = (1 / assetWidth) * groundWidth;
    // const groundHeight = (windowHeight / 5) * 2;
    // const groundScale = (1 / 454) * groundHeight;
    return groundScale;
  };

  private moveGroundBack(index: number) {
    this.grounds.push(this.grounds[index]);
    this.grounds.shift();
    const newAngle =
      this.groundsAngles[this.groundsAngles.length - 1] + 2.6 * this.scale;
    this.groundsAngles.push(newAngle);
    this.groundsAngles.shift();
  }
  private gameStatusChange = (status: GameStatus) => {
    switch (status) {
      case GameStatus.isRunning:
        this.canRotate = true;
        break;

      default:
        break;
    }
  };
}

export default Ground;
