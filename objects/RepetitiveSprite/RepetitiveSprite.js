const RepetitiveSprite = function({ sprite, initY: initY = 0, velocity: velocity = -1 }) {
	this.sprite = sprite
	this.x = 0
	this.y = initY
	this.velocity = velocity

	this.setSprite = sprite => (this.sprite = sprite)

	this.update = () => {
		this.x += this.velocity
		if (this.x <= -this.sprite.width) this.x = 0
	}

	this.render = () => {
		image(this.sprite, this.x, this.y)
		image(this.sprite, width + this.x, this.y)
	}

	this.reset = () => {
		this.x = 0
		this.y = initY
	}
}
