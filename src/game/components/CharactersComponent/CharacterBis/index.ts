import Align from "../../../helpers/Align/align";
import SpineContainer from "../../../helpers/SpineContainer/SpineContainer";
import { closeSync } from "fs";

class PhysicCharacter extends SpineContainer {
  public scene: Phaser.Scene
  public planeY: number = 0;
  public id: string;
  public speed: number = 400;
  public tweenX?: Phaser.Tweens.Tween;
  public scale: number = 0.5;
  public positionInCrowd: number = 0;
  public crowdPositionX: number = window.innerWidth * 0.20;
  public isUnlock: boolean = false;
  public distanceBetweenCharacters: number = 40;
  
  constructor(
    scene: Phaser.Scene,
    key: string,
    anim: string,
    id: string,
    loop: boolean = false,
    runAnimation: boolean = false,
    isDebug: boolean = false,
    positionInCrowd: number = 0,
  ) {
    super(scene, 0, 0, key, anim, loop);
    this.id = id;
    this.scene = scene;
    
    scene.add.existing(this);
    
    // apply default skin to character
    this.applyDefaultSkin(false);

    this.mixAnimation("Transition", "Run");
    this.mixAnimation("Run", "Dance");
    this.mixAnimation("Dance", "Run");

    if (positionInCrowd) {
      this.positionInCrowd = positionInCrowd;
    }

    this.setScale(0.45); // container and hitbox size
    this.setDepth(10);

    if (!isDebug) {
      Align.outsideRightSpine(this, this.spine, this.scale);
      Align.charactersOnGround(this, this.spine, this.scale)
    } else {
      Align.crowdPosition(this, this.spine, this.scale);
      Align.charactersOnGround(this, this.spine, this.scale)
    }

    this.drawDebug(false);

    if (runAnimation) {
      this.runTowardCrowd()
    }

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

  public unlock() {
    this.isUnlock = true;
  }

  // 
  public runTowardCrowd() {
    let destinationX = this.crowdPositionX - this.positionInCrowd * this.distanceBetweenCharacters
    if (destinationX < 0) { destinationX = 0 }

    let destination = (window.innerWidth - destinationX) + this.displayWidth / 2 * this.scale
    
    let duration = (destination / this.speed) * 1000;

    let latency = 400;

    // join crowd
    this.tweenX = this.scene.tweens.add({
      targets: this,
      x: destinationX,
      duration: duration + latency,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.playRunAnimation()
      },
    });
  }

  public joinCrowd(positionInCrowd: number) {
    this.playAnimation("Transition", false);
    this.positionInCrowd = positionInCrowd;
    positionInCrowd % 2 ? this.setDepth(10) : this.setDepth(11);
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
