import SimplexNoise from "simplex-noise";

class Blob extends Phaser.GameObjects.Graphics {
    private pink: number = 0xff00ab;
    private blue: number = 0x2b3aff;
    private purple: number = 0x6a23ff;
    private red: number = 0xff0b0b;
    private blob?: Phaser.GameObjects.Graphics;
    private speed: number = 5;
    private blobPosition: any = {
        x: 0,
        y: window.innerHeight / 2
    }
    private rayon: number = window.innerWidth / 2; // le blob prend 1/3 de l'écran
    private variation: number = 70;
    private noise: SimplexNoise = new SimplexNoise(Math.random);

    constructor(
        scene: Phaser.Scene
    ) {
        super(scene);

        scene.add.existing(this);
        this.drawBlob()
    }

    preUpdate(time: any, delta: any) {
        this.drawBlob()
    }

    public drawBlob() {
        this.speed += 0.004; // maybe refacto

        this.clear()
        this.lineStyle(2, this.pink, 1);
        this.fillStyle(this.pink, 1);
        this.moveTo(this.blobPosition.x, this.blobPosition.y); // center

        for (var i = - Math.PI / 2; i < Math.PI / 2 + 0.02; i += 0.02 * (Math.PI / 2)) {
            let value2d =
                this.noise.noise2D(
                    Math.cos(i) + this.speed,
                    Math.sin(i) + this.speed
                ) * this.variation;
            let x = Math.cos(i) * (this.rayon + value2d) + (this.blobPosition.x);
            let y =
                Math.sin(i) * (this.rayon + value2d) + (this.blobPosition.y);
            this.lineTo(x, y);
        }

        this.fillPath();
        this.setDepth(7).setBlendMode('SCREEN')
    }

}
export default Blob;
