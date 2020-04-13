import Phaser from 'phaser'

declare global
{
	interface ISpineContainer extends Phaser.GameObjects.Container
	{
        readonly spine: SpineGameObject
        faceDirection(dir: 1 | -1)
		setPhysicsSize(width: number, height: number)
	}
}

export default class SpineContainer extends Phaser.GameObjects.Container implements ISpineContainer {
    private SpineGameObject: SpineGameObject

    get spine() {
        return this.SpineGameObject
    }

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, anim: string, loop = false) {
        super(scene, x, y)
        
        this.SpineGameObject = scene.add.spine(0, 0, key, anim, loop)

        scene.physics.add.existing(this)

        console.log(this)

        const bounds = this.SpineGameObject.getBounds()
        const width = bounds.size.x
        const height = bounds.size.y
        this.setPhysicsSize(width, height)
        this.add(this.SpineGameObject)
    }

    public faceDirection(dir: 1 | -1) {
        if (this.SpineGameObject.scaleX === dir) {
            return 0
        }

        this.SpineGameObject.scaleX = dir
    }

    public setPhysicsSize(width: number, height: number) {
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setOffset(width * -0.5, -height)
        body.setSize(width, height)
    }
}

Phaser.GameObjects.GameObjectFactory.register('spineContainer', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, key: string, anim: string, loop = false) {
	const container = new SpineContainer(this.scene, x, y, key, anim, loop)

	this.displayList.add(container)

	return container
})