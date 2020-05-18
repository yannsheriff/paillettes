class Bar extends Phaser.Physics.Arcade.Image {
  private speed: number;

  constructor(
    scene: Phaser.Scene,
    speed: number,
    //TODO : calculate start posdtion from velocity and grid size
    x: number = window.innerWidth,
    y: number = window.innerHeight - 275
  ) {
    super(scene, x, y, "verticalLine");
    this.speed = speed;
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.scale = 0.5;
    this.launch();
  }

  launch() {
    this.setVelocityX(-this.speed);
  }
}

export default Bar;
