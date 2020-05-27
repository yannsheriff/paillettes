class PhysicCharacter extends Phaser.Physics.Arcade.Sprite {
  public id: string;
  constructor(scene: Phaser.Scene, id: string) {
    super(scene, 1000, 150, "char");
    this.id = id;
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setDepth(10)
    this.launch();
  }

  launch() {
    this.setVelocityX(-150);
  }
}

export default PhysicCharacter;