class Subtitle {
  private scene: Phaser.Scene;
  private good?: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.create();
  }

  private create() {
    this.good = this.scene.physics.add.sprite(500, 500, "perfect");
    this.good!.anims.play("perfect");
  }
}

export default Subtitle;
