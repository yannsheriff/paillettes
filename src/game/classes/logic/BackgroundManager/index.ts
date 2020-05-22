import Mask from "../../physic/Mask";
import Plane from "../../physic/Plane";
import Align from '../../utils/align'

class BackgroundManager {
    private pink: number = 0xFF00AB
    private blue: number = 0x2B3AFF
    private purple: number = 0x6A23FF
    private red: number = 0xff0b0b
    private white: number = 0xffffff;
    private globalSpeed: number = 50;
    private currentPlanes: Array<Plane> = [];
    private nextPlanes: Array<Plane> = [];
    private scene: Phaser.Scene
    private canvasWidth: number = 0;
    private planesAssets: Array<Array<string>> = [
        [
            "word_1_plane_1_1",
            "word_1_plane_1_2",
            "word_1_plane_1_3",
            "word_1_plane_1_4",
        ],
        [
            "word_1_plane_2_1",
            "word_1_plane_2_2",
            "word_1_plane_2_3",
            "word_1_plane_2_4",
            "word_1_plane_2_5",
            "word_1_plane_2_6",
        ],
        [
            "word_1_plane_3_1",
            "word_1_plane_3_2",
            "word_1_plane_3_3",
            "word_1_plane_3_4",
            "word_1_plane_3_5",
            "word_1_plane_3_6",
        ],
    ]
    constructor(
        scene: Phaser.Scene,
    ) {
        this.scene = scene

        this.canvasWidth = scene.sys.game.canvas.width;

        let mask = new Mask(scene, 600, 400, "mask", 0, this.pink)
        Align.left(mask)

        scene.add
        .text(50, 50, 'Update speed', { fill: 'red' })
        .setInteractive()
        .on('pointerdown', () => {
            this.updateSpeed(100)
        })

        for (let planenb = 0; planenb < 1; planenb++) {
            this.generatePlanes(planenb, true)
        }
    }

    /**
     * Generate a new plane and set its destroy time
     * and the time it will generate the next one
     */
    public generatePlanes(planenb: number, isInit: boolean) {
        // get random asset for plane
        let rand = Math.floor(Math.random() * (this.planesAssets[planenb].length - 1) + 1)
        
        let planeObj = new Plane(
            this.scene, 0, 0,
            this.planesAssets[planenb][rand],
            planenb,
            this.globalSpeed
        )

        if (isInit) {
            this.currentPlanes[planenb] = planeObj
        } else {
            this.nextPlanes[planenb] = planeObj
        }

        this.initDestroy(this.currentPlanes[planenb], planenb)
        this.initNextPlane(this.currentPlanes[planenb], planenb)
    }

    public initDestroy(planeinstance: Plane, planeArrayNb: number) {
        const timeToExitCanvas = this.calculateTime(planeinstance.width, planeinstance.scale, planeinstance.speed, this.canvasWidth, true)

        setTimeout(() => {
            planeinstance.destroy(true)
            this.currentPlanes[planeArrayNb] = this.nextPlanes[planeArrayNb]
        }, timeToExitCanvas)
    }

    public initNextPlane(planeinstance: Plane, planeArrayNb: number) {
        const timeBeforeGenerateNextPlane = this.calculateTime(planeinstance.width, planeinstance.scale, planeinstance.speed, this.canvasWidth, false)

        setTimeout(() => {
            this.generatePlanes(planeArrayNb, false)
        }, timeBeforeGenerateNextPlane)
    }

    /**
    * Helper fonction
    *
    * Permet de calculer en sec combien de temps met
    * le plan à sortir du canvas
    */
    public calculateTime(
        planeWidth: number,
        planeScale: number,
        planeSpeed: number,
        canvasWidth: number,
        isExit: boolean
    ): number {
        let latency = 50;
        const v = planeSpeed
        let d = (planeWidth * planeScale) + latency
        if (isExit) {
            d += canvasWidth
        }
        return (d / v) * 1000
    }

    public updateSpeed(newSpeed: number) {
        // 
        this.globalSpeed = newSpeed
        this.currentPlanes.forEach(planeelement => {
            planeelement.updatePlaneSpeed(newSpeed)
        });
        this.nextPlanes.forEach(planeelement => {
            planeelement.updatePlaneSpeed(newSpeed)
        });
    }
}

export default BackgroundManager;