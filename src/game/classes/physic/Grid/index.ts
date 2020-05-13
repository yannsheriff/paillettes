class Grid extends Phaser.GameObjects.Image {
  public grid?: Phaser.GameObjects.Image;

  public assetWidth: number;
  constructor(
    scene: Phaser.Scene,
    x: number = 1020,
    y: number = 700,
    img: string = ""
  ) {
    super(scene, x, y, img);
    // asset width is 2576
    this.assetWidth = 0.4 * 2576;
    this.grid = scene.add.image(x + this.assetWidth / 2, y, "grid");
    // this.grid = scene.add.image(x, y, "grid");
    this.grid.scale = 0.4;
  }
}

export default Grid;
