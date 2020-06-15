import Phaser from 'phaser'

declare global {
    interface ISpineContainer extends Phaser.GameObjects.Container {
        readonly spine: SpineGameObject
        readonly spineBody: Phaser.Physics.Arcade.Body
        readonly animationsList: Array<string>
        readonly skinsList: Array<string>
        readonly slotList: Array<string>
        id: string | undefined;
        setPhysicsSize(width: number, height: number): void
        faceDirection(dir: 1 | -1): void
        drawDebug(bool: boolean): void
        playAnimation(animationname: string, loop: boolean): void
        playOnceThenLoopNextAnimation(firstAnimation: string, secondAnimation: string, delay: number): void
        allowCollideWorldBounds(bool: boolean): void
        runVelocity(number: number): void
        changeAnimationSpeed(number: number): void
        changeSlotColor(slotname: string, r: number, v: number, b: number): void
        changeSkin(skinname: string): void
        applyDefaultSkin(defaultSkin: boolean): void
        mixAnimation(from: string, to: string): void
        delete(): void
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

    get animationsList() {
        return this.SpineGameObject.getAnimationList();
    }

    get skinsList() {
        return this.SpineGameObject.getSkinList();
    }

    get slotList() {
        return this.SpineGameObject.getSlotList();
    }

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, anim?: string, loop = false, id?: string) {
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

    public changeAnimationSpeed(speed: number) {
        this.SpineGameObject.state.timeScale = speed;
    }

    public allowCollideWorldBounds(bool: boolean) {
        this.SpineBody.setCollideWorldBounds(bool)
    }

    public nextAnimation(animationname: string, loop: boolean) {
        this.SpineGameObject.addAnimation(0, animationname, loop);
    }

    public playAnimation(animationname: string, loop: boolean) {
        this.SpineGameObject.clearTrack(1) // just in case
        this.SpineGameObject.setEmptyAnimation(0, 0)
        this.SpineGameObject.setAnimation(0, animationname, loop)
    }

    public playOnceThenLoopNextAnimation(firstAnimation: string, secondAnimation: string, delay: number) {
        this.SpineGameObject.setEmptyAnimation(1, 1)
        this.SpineGameObject.addAnimation(1, firstAnimation, false, delay)
        this.SpineGameObject.addAnimation(1, secondAnimation, true, 0)
    }

    public changeSlotColor(slotname: string, r: number, g: number, b: number, a?: number) {
        let slot = this.SpineGameObject.skeleton.findSlot(slotname)
        slot.color.r = r
        slot.color.g = g
        slot.color.b = b
    }

    public changeSkin(skinname: string) {
        this.SpineGameObject.setSkinByName(skinname)
    }

    public applyDefaultSkin(defaultSkin: boolean) {
        if (defaultSkin) {
            // [0] is 'default'
            // we want [1] to get 'Color1'
            this.changeSkin(this.skinsList[1])
        } else {
            let rand = Math.floor(Math.random() * (this.skinsList.length - 1) + 1)
            this.changeSkin(this.skinsList[rand])
        }
    }

    public findSlot(slotname: string) {
        return this.SpineGameObject.findSlot(slotname)
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

    public mixAnimation(from: string, to: string) {
        this.SpineGameObject.setMix(from, to, 0.1)
    }

    public setPhysicsSize(width: number, height: number) {
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setOffset(width * -0.5, -height)
        body.setSize(width, height)
    }

    public delete() {
        this.destroy()
    }
}

Phaser.GameObjects.GameObjectFactory.register('spineContainer', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, key: string, anim: string, loop: boolean, id?: string) {
    const container = new SpineContainer(this.scene, x, y, key, anim, loop, id)
    this.displayList.add(container)
    return container
})