const Bird = function({
	sprite,
	wing,
	initHeight,
	gravity: gravity = 0.6,
	angularAcc: angularAcc = 2.5,
	maxRotation: maxRotation = 100,
	flapDuration: flapDuration = 5,
	maxV: maxV = -15
}) {
	this.sprite = sprite
	this.dimension = [sprite[0].width, sprite[0].height]
	this.height = initHeight
	this.v = -9
	this.angle = 0

	this.passes = (pipe, { offset: offset = 0 }) => {
		if (pipe.withinX(this, offset)) {
			return pipe.position[0] + pipe.dimension[0] / 2 < width / 2
		}
	}

	this.on = (base, offset = 0) => {
		return this.height > base.y - offset
	}

	this.setSprite = sprite => (this.sprite = sprite)

	this.update = () => {
		if (this.v >= maxV) this.v += gravity
		if (this.angle <= maxRotation) this.angle += angularAcc

		// reversed
		this.height += this.v
	}

	this.render = ({ flap }) => {
		push()
		translate(width / 2, this.height)
		rotate((PI / 180) * this.angle)
		imageMode(CENTER)
		image(this.sprite[flap ? Math.floor((frameCount / flapDuration) % 3) : 0], 0, 0)
		pop()
	}

	this.jump = () => {
		this.v = -10
		this.angle = -maxRotation / 2
		wing.play()
	}

	this.reset = () => {
		this.height = initHeight
		this.angle = 0
	}
}
