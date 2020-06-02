import Align from "../../../helpers/Align/align";
import SpineContainer from "../../../helpers/SpineContainer/SpineContainer";

class PhysicCharacter extends SpineContainer {
  public scene: Phaser.Scene
  public planeY: number = 0;
  public id: string;
  public speed: number = 80;
  public crowdPosition: number = 200; // x position
  public tweenX?: Phaser.Tweens.Tween;
  public scale: number = 0.5;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    anim: string,
    id: string,
    loop?: boolean,
    runAnimation: boolean = false
  ) {
    super(scene, x, y, key, anim, loop);
    this.id = id;
    this.scene = scene;

    scene.add.existing(this);

    // apply default skin to character
    this.applyDefaultSkin(false);

    this.mixAnimation("Transition", "Run");
    this.mixAnimation("Run", "Dance");
    this.mixAnimation("Dance", "Run");

    this.setScale(0.5); // container and hitbox size
    this.setDepth(10);

    Align.rightSpine(this, this.spine, this.scale);

    this.drawDebug(true);

    // this.playAnimation("NBidle", false)

    // this.faceDirection(-1)

    if (runAnimation) {
      this.runTowardCrowd()
    }

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
    let delay = Math.floor(Math.random() * 300) - 150;
    this.tweenX = this.scene.tweens.add({
      targets: this,
      x: this.crowdPosition + delay,
      duration: 100 * this.speed,
      ease: 'Sine.easeIn',
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.playRunAnimation()
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
   * destroy physic character + remove its tween
   */
  public deleteCharacter() {
    if (this.tweenX) { this.tweenX.remove(); }
    this.destroy();
  }
}

export default PhysicCharacter;
