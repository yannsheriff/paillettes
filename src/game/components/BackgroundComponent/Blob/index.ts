import SimplexNoise from "simplex-noise";

class Blob extends Phaser.GameObjects.Graphics {
    private drawColor: number;
    private colors: Array<[string, number]> = [
        ['pink', 0xff00ab],
        ['blue', 0x2b3aff],
        ['purple', 0x6a23ff],
        ['red', 0xff0b0b]
    ];
    private blob?: Phaser.GameObjects.Graphics;
    private speed: number = 2;
    private blobPosition: any = {
        x: 0,
        y: window.innerHeight / 2
    }
    private initialRayon = window.innerWidth / 2;
    private rayon: number = this.initialRayon; // le blob prend 1/3 de l'écran
    private variation: number = 80;
    private noise: SimplexNoise = new SimplexNoise(Math.random);

    constructor(
        scene: Phaser.Scene
    ) {
        super(scene);
        scene.add.existing(this);
        this.drawColor = this.colors[0][1]
        this.drawBlob()
    }

    preUpdate(time: any, delta: any) {
        this.drawBlob()
    }

    public drawBlob() {
        this.speed += 0.005; // maybe refacto

        this.clear()
        this.lineStyle(2, this.drawColor, 1);
        this.fillStyle(this.drawColor, 1);
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

    public playFreestyle() {
        this.scene.tweens.add({
            targets: this,
            rayon: window.innerWidth + 500,
            duration: 700,
            ease: 'back.in',
            repeat: 0,
            yoyo: false,
        });
    }
    public stopFreestyle() {
        this.scene.tweens.add({
            targets: this,
            rayon: this.initialRayon,
            duration: 700,
            ease: 'back.out',
            repeat: 0,
            yoyo: false,
        });
    }

    public changeColor() {
        let randColor = this.colors[
            Math.floor(Math.random() * this.colors.length)
        ];
        this.scene.tweens.add({
            targets: this,
            drawColor: randColor[1],
            duration: 700,
            ease: 'back.out',
            repeat: 0,
            yoyo: false,
        });
    }
}
export default Blob;
