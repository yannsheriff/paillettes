import SpineContainer from "../../../helpers/SpineContainer/SpineContainer";

class PhysicCharacter extends SpineContainer {
  public scene: Phaser.Scene
  public planeY: number = 0;
  public id: string;
  public speed: number = 80;
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

    scene.add.existing(this);

    // apply default skin to character
    this.applyDefaultSkin(false);

    this.mixAnimation("Run", "Dance");
    this.mixAnimation("Dance", "Run");

    this.setScale(0.5); // container and hitbox size
    this.setScale(0.5); // asset size
    this.setDepth(10);

    this.drawDebug(false);

    // this.playAnimation("NBidle", false)

    // this.faceDirection(-1)

    this.runTowardCrowd()

    const body = this.body as Phaser.Physics.Arcade.Body;
    this.setPhysicsSize(body.width * 0.5, body.height * 0.9);

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
    this.playAnimation("Fail", false);

    setTimeout(() => {
      this.deleteCharacter();
    }, 1000);
  }

  public transformAndJoinCrowd() {
    this.playOnceThenLoopNextAnimation("Transition", "Run", 0);
  }

  // 
  public runTowardCrowd() {
    this.scene.tweens.add({
      targets: this,
      x: this.crowdPosition,
      duration: 100 * this.speed,
      ease: 'Sine.easeIn',
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        // this.playRunAnimation()
      },
  });
  }

  public stop() {
    this.runVelocity(0)
  }

  public playTransformationAnimation() {
    this.playAnimation("Transition", false);
  }

  public playRunAnimation() {
    this.playAnimation("Run", true);
  }

  public playDanceAnimation() {
    this.playAnimation("Dance", false);
  }

  public playDanceThenRunAnimation(delay: number) {
    this.playOnceThenLoopNextAnimation("Dance", "Run", delay);
  }

  /**
   * deleteCharacter
   */
  public deleteCharacter() {
    this.destroy();
    this.delete();
  }
}

export default PhysicCharacter;
