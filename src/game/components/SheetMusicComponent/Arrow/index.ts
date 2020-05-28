export type Direction = "left" | "right" | "up" | "down";

class Arrow extends Phaser.Physics.Arcade.Sprite {
  public direction: Direction;
  public id: string;
  public didCollide: boolean;
  private speed: number;

  constructor(
    scene: Phaser.Scene,
    id: string,
    speed: number,
    height: number,
    y: number,
    x: number = window.innerWidth,
    direction: Direction,
    scale: number
  ) {
    if (!direction) {
      const directions: Array<Direction> = ["left", "right", "up", "down"];
      const row: number[] = [
        y + (height / 4) * 0,
        y + (height / 4) * 2,
        y + (height / 4) * 3,
        y + (height / 4) * 4,
      ];
      y = row[Math.floor(Math.random() * 2)];
      direction = directions[Math.floor(Math.random() * directions.length)];
    } else {
      const row = {
        up: y,
        down: y + (height / 3) * 1,
        left: y + (height / 3) * 2,
        right: y + (height / 3) * 3,
      };
      y = row[direction];
    }

    super(scene, x, y, direction);
    this.speed = speed;
    this.direction = direction;
    this.didCollide = false;
    this.id = id;
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.scale = scale;
    this.setDepth(11);

    this.setBounce(0.2);
    this.launch();
  }

  launch() {
    this.setVelocityX(-this.speed);
  }
}

export default Arrow;
