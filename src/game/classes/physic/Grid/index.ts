class Grid extends Phaser.GameObjects.Image {
  public grid?: Phaser.GameObjects.Image;

  public assetWidth: number;
  constructor(
    scene: Phaser.Scene,
    x: number = 1020,
    y: number = 700,
    scale: number,
    img: string = ""
  ) {
    super(scene, x, y, img);
    // asset width is 1123
    this.assetWidth = scale * 1123;
    this.grid = scene.add.image(x + this.assetWidth / 2, y, "grid");
    this.grid.scale = scale;
  }
}

export default Grid;
