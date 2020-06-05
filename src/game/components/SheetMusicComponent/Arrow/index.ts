import GridObject, { Direction } from "../GridObject";

class Arrow extends GridObject {
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
    super(scene, id, speed, height, y, x, direction, scale, direction);
  }

  public deleteArrow() {
    this.destroy()
  }
}

export default Arrow;
