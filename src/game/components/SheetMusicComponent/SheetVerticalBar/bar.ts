class Bar extends Phaser.Physics.Arcade.Image {
  private speed: number;

  constructor(
    scene: Phaser.Scene,
    speed: number,
    x: number = window.innerWidth,
    y: number = window.innerHeight - 275,
    scale: number
  ) {
    super(scene, x, y, "verticalLine");
    this.speed = speed;
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.scale = scale;
    this.setDepth(11);
    this.launch();
  }

  launch() {
    this.setVelocityX(-this.speed);
  }
}

export default Bar;
