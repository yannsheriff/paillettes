export type Direction = "left" | "right" | "up" | "down";

class Arrow extends Phaser.Physics.Arcade.Sprite {
  public direction: Direction;
  public id: string;
  public didCollide: boolean;

  constructor(
    scene: Phaser.Scene,
    id: string,
    x: number = 1000,
    y: number = 300,
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
    this.setVelocityX(-150);
  }
}

export default Arrow;
