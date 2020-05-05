class Grid extends Phaser.GameObjects.Image {
  public grid?: Phaser.GameObjects.Image;
  constructor(
    scene: Phaser.Scene,
    x: number = 1020,
    y: number = 700,
    img: string = ""
  ) {
    super(scene, x, y, img);
    this.grid = scene.add.image(x, y, "grid");
    this.grid.scale = 0.4;
  }
}

export default Grid;
