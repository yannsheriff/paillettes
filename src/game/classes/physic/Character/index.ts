import SpineContainer from '../../../class/SpineContainer/SpineContainer';

class PhysicCharacter {
  public SpineContainer: ISpineContainer;
  public id: string;

  constructor(
    id: string,
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    anim: string,
    loop?: boolean
  ) {

    this.id = id;

    this.SpineContainer = scene.add.spineContainer(x, y, key, anim, loop, id)
    this.SpineContainer.setScale(0.6)
    const body = this.SpineContainer.body as Phaser.Physics.Arcade.Body

    this.SpineContainer.allowCollideWorldBounds(true)
    this.SpineContainer.setPhysicsSize(body.width * 0.5, body.height * 0.9)
    // this.SpineContainer.playAnimation('run', false)
    this.launch();
  }

  launch() {
    this.SpineContainer.spineBody.setVelocityX(-150);
  }

  joinCrowd() {
    this.SpineContainer.spineBody.setVelocity(0);
    this.SpineContainer.spineBody.setAcceleration(0, 0);
  }
}

export default PhysicCharacter;

// class PhysicCharacter extends Phaser.Physics.Arcade.Sprite {
//   public id: string;
//   constructor(scene: Phaser.Scene, id: string) {
//     super(scene, 1000, 150, "character");
//     this.id = id;
//     scene.physics.world.enable(this);
//     scene.add.existing(this);
//     this.launch();
//   }

//   launch() {
//     this.setVelocityX(-150);
//   }
// }

// export default PhysicCharacter;
