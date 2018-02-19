
let nodeUID = 0

class Node {

	constructor(props) {

		Object.defineProperty(this, 'uid', { enumerable: true, value: nodeUID++ })

		this.root = this
		this.level = 0

		Object.assign(this, props)

	}

	isDetached() {

		return !this.root && !this.parent && !this.next && !this.previous

	}

	appendChild(child) {

		if (child.parent)
			removeChild(child.parent, child)

		child.parent = this
		child.root = this.root
		child.level = this.level + 1

		if (this.lastChild) {

			this.lastChild.next = child
			child.previous = this.lastChild

			this.lastChild = child

		} else {

			this.firstChild = 
			this.lastChild = child

		}

		return this

	}

	removeChild(child) {

		if (this.lastChild === child)
			this.lastChild = child.previous

		if (this.firstChild === child)
			this.firstChild = child.next

		let { previous, next } = child

		if (previous)
			previous.next = next

		if (next)
			next.previous = previous

		child.parent = null
		child.root = null
		child.previous = null
		child.next = null
		child.level = 0

		return this

	}

	attach(parent) {

		parent.appendChild(this)

		return this

	}

	detach() {

		if (this.parent)
			this.parent.removeChild(this)

		return this

	}

	*[Symbol.iterator]() {

		let child = this.firstChild

		while(child) {

			yield child

			child = child.next

		}

	}

	*allChildren() {

		let child = this.firstChild

		while(child) {

			yield child

			for (let grandChild of child.allChildren())
				yield grandChild

			child = child.next

		}

	}

	*allParents() {

		let node = this.parent

		while(node) {

			yield node

			node = node.parent

		}

	}

	printLine() {

		let intro = []

		for (let parent of this.allParents())
			intro.unshift(parent.next ? '│ ' : '  ')

		return intro.join('') + (!this.parent ? (this.next ? '┌' : '─') : (this.next ? '├' : '└')) + '─' + (this.firstChild ? '┬' : '─') + '─ Node#' + this.uid + ' {}'

	}

	print() {

		let lines = [this.printLine()]

		for (let child of this.allChildren())
			lines.push(child.printLine())

		return lines.join('\n')

	}

}

export { Node }
