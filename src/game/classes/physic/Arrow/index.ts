export type Direction = "left" | "right" | "up" | "down";

class Arrow extends Phaser.Physics.Arcade.Sprite {
  public direction: Direction;
  public id: string;
  public didCollide: boolean;

  constructor(
    scene: Phaser.Scene,
    id: string,
    //TODO : calculate start posdtion from velocity and grid size
    x: number = 1500,
    y: number = window.innerHeight - 150,
    direction?: Direction
  ) {
    if (!direction) {
      const directions: Array<Direction> = ["left", "right", "up", "down"];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }
    super(scene, x, y, direction);
    this.direction = direction;
    this.didCollide = false;
    this.id = id;
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setBounce(0.2);
    this.launch();
  }

  launch() {
    this.setVelocityX(-180);
  }
}

export default Arrow;
