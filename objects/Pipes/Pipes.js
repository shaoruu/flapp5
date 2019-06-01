const Pipes = function({
	sprites,
	pipeGap: pipeGap = 230,
	boundary: boundary = 50,
	quantity: quantity = 2,
	velocity: velocity = -4,
	availableHeight: height
}) {
	this.sprites = sprites
	this.dimension = [this.sprites.UPPER.width, this.sprites.UPPER.height]

	this.pipeGap = pipeGap
	this.boundary = boundary // represents the upper limit for a pipe
	this.quantity = quantity
	this.velocity = velocity
	this.interval = (width + this.dimension[0]) / quantity - this.dimension[0]
	this.height = height

	this.pipes = []

	this.init = () => {
		for (let i = 0; i < this.quantity; i++)
			this.pipes.push(this._getNewPipes(i, true))
	}

	this.setSprites = sprites => (this.sprites = sprites)

	this.update = () => {
		this.pipes.forEach(pipe => {
			pipe.UPPER.move(this.velocity)
			pipe.LOWER.move(this.velocity)
			if (pipe.UPPER.getX() < -this.dimension[0]) {
				const { UPPER, LOWER } = this._getNewPipes()
				pipe.UPPER = UPPER
				pipe.LOWER = LOWER
			}
		})
	}

	this.checkCollisionsAndPoints = (game, addPoint) => {
		this.pipes.forEach(pipe => {
			if (
				pipe.UPPER.collides(game.bird, { offset: 6 }) ||
				pipe.LOWER.collides(game.bird, { offset: 6 }) ||
				(pipe.UPPER.withinX(game.bird) && game.bird.height < 0)
			) {
				game.gameover()
			} else if (
				game.bird.passes(pipe.UPPER, { offset: 7 }) &&
				!pipe.UPPER.passed
			) {
				pipe.UPPER.togglePassed()
				pipe.LOWER.togglePassed()
				addPoint()
			}
		})
	}

	this.render = () => {
		this.pipes.forEach(pipeGroup => {
			if (pipeGroup.UPPER.position[0] <= width) {
				push()
				imageMode(CORNER)
				image(this.sprites.UPPER, pipeGroup.UPPER.getX(), pipeGroup.UPPER.getY())
				image(this.sprites.LOWER, pipeGroup.LOWER.getX(), pipeGroup.LOWER.getY())
				pop()
			}
		})
	}

	this._getNewPipes = (i = 0, init = false, offset = 300) => {
		const upPipe = new Pipe({
			position: [
				i * (this.dimension[0] + this.interval) + width + (init ? offset : 0),
				random(
					this.pipeGap / 2 + this.boundary,
					this.height - this.boundary - this.pipeGap
				) - this.dimension[1]
			],
			dimension: this.dimension
		})
		const downPipe = new Pipe({
			position: [
				upPipe.position[0],
				upPipe.position[1] + this.dimension[1] + this.pipeGap
			],
			dimension: this.dimension
		})
		return { UPPER: upPipe, LOWER: downPipe }
	}

	this.reset = () => {
		this.pipes = []
	}
}
