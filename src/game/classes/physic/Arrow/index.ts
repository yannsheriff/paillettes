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
    direction?: Direction,
    //TODO : calculate start posdtion from velocity and grid size
    x: number = window.innerWidth - 600,
    y: number = window.innerHeight + 275
  ) {
    if (!direction) {
      const directions: Array<Direction> = ["left", "right", "up", "down"];
      const row: number[] = [
        window.innerHeight - 235,
        window.innerHeight - 195,
        window.innerHeight - 270,
        window.innerHeight - 160,
      ];
      y = row[Math.floor(Math.random() * 2)];
      direction = directions[Math.floor(Math.random() * directions.length)];
    } else {
      const row = {
        up: window.innerHeight - 270,
        down: window.innerHeight - 235,
        left: window.innerHeight - 195,
        right: window.innerHeight - 160,
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
    this.scale = 0.5;

    this.setBounce(0.2);
    this.launch();
  }

  launch() {
    this.setVelocityX(-this.speed);
  }
}

export default Arrow;
