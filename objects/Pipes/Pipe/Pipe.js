const Pipe = function({ position, dimension }) {
	this.position = position
	this.dimension = dimension
	this.passed = false

	this.togglePassed = () => (this.passed = !this.passed)

	this.setPosition = position => (this.position = position)

	this.move = velocity => (this.position[0] += velocity)

	this.getX = () => this.position[0]

	this.getY = () => this.position[1]

	this.setX = x => (this.position[0] = x)

	this.getW = () => this.dimension[0]

	this.getH = () => this.dimension[1]

	this.collides = (bird, { offset: offset = 0 }) => {
		return this.withinX(bird, offset) && this.withinY(bird, offset)
	}

	this.withinX = (bird, offset = 0) => {
		return (
			this.position[0] <= (width + bird.dimension[0]) / 2 - offset &&
			this.position[0] + this.dimension[0] >=
				(width - bird.dimension[0]) / 2 + offset
		)
	}

	this.withinY = (bird, offset) => {
		return (
			(this.position[1] - bird.dimension[1] / 2 + offset <= bird.height &&
				this.position[1] + bird.dimension[1] / 2 + this.dimension[1] - offset >=
					bird.height) ||
			(this.position[1] + this.dimension[1] + bird.dimension[1] / 2 - offset >=
				bird.height &&
				this.position[1] - bird.dimension[1] / 2 + offset <= bird.height)
		)
	}
}
