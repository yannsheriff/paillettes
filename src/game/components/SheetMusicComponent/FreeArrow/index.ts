import GridObject, { Direction } from "../GridObject";

class FreeArrow extends GridObject {
  constructor(
    scene: Phaser.Scene,
    speed: number,
    height: number,
    y: number,
    x: number = window.innerWidth,
    direction: Direction,
    scale: number
  ) {
    super(scene, "free", speed, height, y, x, direction, scale, "freeStar");
  }
}

export default FreeArrow;
