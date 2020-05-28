import SpineContainer from "../../../helpers/SpineContainer/SpineContainer";

class PhysicCharacter extends SpineContainer {
  public scene: Phaser.Scene
  public SpineContainer: ISpineContainer;
  public planeY: number = 0;
  public id: string;
  public speed: number = 50;
  public crowdPosition: number = 200; // x position

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    anim: string,
    id: string,
    loop?: boolean
  ) {
    super(scene, x, y, key, anim, loop);
    this.id = id;
    this.scene = scene;

    this.SpineContainer = scene.add.spineContainer(x, y, key, anim, loop);

    // apply default skin to character
    this.SpineContainer.applyDefaultSkin(false);

    this.SpineContainer.mixAnimation("Run", "Dance");
    this.SpineContainer.mixAnimation("Dance", "Run");

    this.setScale(0.5); // container and hitbox size
    this.SpineContainer.setScale(0.5); // asset size
    this.SpineContainer.setDepth(10);

    this.SpineContainer.drawDebug(false);

    // this.SpineContainer.playAnimation("NBidle", false)

    // this.SpineContainer.faceDirection(-1)

    this.runTowardCrowd()
    // scene.physics.moveTo(this.SpineContainer, 500, window.innerHeight / 1.5, 300);


    const body = this.SpineContainer.body as Phaser.Physics.Arcade.Body;
    this.SpineContainer.setPhysicsSize(body.width * 0.5, body.height * 0.9);

    // this.initDestroy()
  }

  public initDestroy() {
    let latency = 50;
    let d = this.width * this.scale + window.innerWidth + latency;
    let v = this.speed;
    let timeBeforeDestroy = (d / v) * 1000;
    const timeToExitCanvas = timeBeforeDestroy;

    setTimeout(() => {
      this.deleteCharacter();
      console.log("personnage deleted");
    }, timeToExitCanvas);
  }

  public failAndDestroy() {
    this.stop()
    this.SpineContainer.playAnimation("Fail", false);

    setTimeout(() => {
      this.deleteCharacter();
    }, 1000);
  }

  public transformAndJoinCrowd() {
    this.SpineContainer.playOnceThenLoopNextAnimation("Transition", "Run", 0);
  }

  // 
  public runTowardCrowd() {
    this.scene.tweens.add({
      targets: this.SpineContainer,
      x: this.crowdPosition,
      duration: 100 * this.speed,
      ease: 'Sine.easeIn',
      repeat: -1,
      yoyo: false,
      onComplete: () => {
        // this.playRunAnimation()
      },
  });
  }

  public stop() {
    this.SpineContainer.runVelocity(0)
  }

  public playTransformationAnimation() {
    this.SpineContainer.playAnimation("Transition", false);
  }

  public playRunAnimation() {
    this.SpineContainer.playAnimation("Run", true);
  }

  public playDanceAnimation() {
    this.SpineContainer.playAnimation("Dance", false);
  }

  public playDanceThenRunAnimation(delay: number) {
    this.SpineContainer.playOnceThenLoopNextAnimation("Dance", "Run", delay);
  }

  /**
   * deleteCharacter
   */
  public deleteCharacter() {
    this.destroy();
    this.SpineContainer.delete();
  }
}

export default PhysicCharacter;
