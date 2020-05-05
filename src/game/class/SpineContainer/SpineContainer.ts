import Phaser from 'phaser'

declare global {
    interface ISpineContainer extends Phaser.GameObjects.Container {
        readonly spine: SpineGameObject
        readonly spineBody: Phaser.Physics.Arcade.Body
        id: string | undefined;
        setPhysicsSize(width: number, height: number): void
        faceDirection(dir: 1 | -1): void
        drawDebug(bool: boolean): void
        playAnimation(animationname: string, loop: boolean): void
        allowCollideWorldBounds(bool: boolean): void
        runVelocity(number: number): void
    }
}

export default class SpineContainer extends Phaser.GameObjects.Container implements ISpineContainer {
    private SpineGameObject: SpineGameObject
    private SpineBody: Phaser.Physics.Arcade.Body
    public id: string | undefined;

    get spine() {
        return this.SpineGameObject
    }

    get spineBody() {
        return this.SpineBody
    }

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, anim: string, loop = false, id?: string) {
        super(scene, x, y)

        this.id = id
        this.SpineGameObject = scene.add.spine(0, 0, key, anim, loop)
        scene.physics.add.existing(this)
        
        this.SpineBody = this.body as Phaser.Physics.Arcade.Body;

        const bounds = this.SpineGameObject.getBounds()
        const width = bounds.size.x
        const height = bounds.size.y
        this.setPhysicsSize(width, height)
        this.add(this.SpineGameObject)
    }

    public drawDebug(bool: boolean) {
        this.SpineGameObject.drawDebug = bool;
    }

    public allowCollideWorldBounds(bool: boolean) {
        this.SpineBody.setCollideWorldBounds(bool)
    }

    public playAnimation(animationname: string, loop: boolean) {
        this.SpineGameObject.play(animationname, loop)
    }

    public runVelocity(number: number) {
        this.SpineBody.setVelocityX(number);
    }

    public faceDirection(dir: 1 | -1) {
        if (this.SpineGameObject.scaleX === dir) {
            return
        }
        this.SpineGameObject.scaleX = dir
    }

    public setPhysicsSize(width: number, height: number) {
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setOffset(width * -0.5, -height)
        body.setSize(width, height)
    }
}

Phaser.GameObjects.GameObjectFactory.register('spineContainer', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, key: string, anim: string, loop: boolean, id?: string) {
    const container = new SpineContainer(this.scene, x, y, key, anim, loop, id)
    this.displayList.add(container)
    return container
})