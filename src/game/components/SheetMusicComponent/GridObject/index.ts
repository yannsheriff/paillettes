export type Direction = "left" | "right" | "up" | "down";

class GridObject extends Phaser.Physics.Arcade.Sprite {
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
    scale: number,
    imageName: string
  ) {
    const row = {
      up: y,
      down: y + (height / 3) * 1,
      left: y + (height / 3) * 2,
      right: y + (height / 3) * 3,
    };
    y = row[direction];

    super(scene, x, y, imageName);
    this.speed = speed;
    this.direction = direction;
    this.didCollide = false;
    this.id = id;
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.scale = scale;
    this.setDepth(11);
    this.launch();
  }

  launch() {
    this.setVelocityX(-this.speed);
  }

  delete() {
    this.destroy();
  }
}

export default GridObject;
