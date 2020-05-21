class Mask extends Phaser.GameObjects.Sprite {
    constructor(
        scene: Phaser.Scene,
        x: number = 0,
        y: number = 0,
        texture: string = '',
        frame: number = 0,
        color: number = 0xffffff
    ) {
        super(scene, x, y, texture, frame);

        this.setDepth(7)
        this.setTint(color).setBlendMode('SCREEN').setDepth(10);
        
        scene.add.existing(this);
    }
    // ...

    // preUpdate(time, delta) {
    //     super.preUpdate(time, delta);
    // }
}
export default Mask;
