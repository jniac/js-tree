
let nodeUID = 0

class Node {

	constructor(props) {

		Object.defineProperty(this, 'uid', { enumerable: true, value: nodeUID++ })

		this.root = this

		Object.assign(this, props)

	}

	append(...children) {

		for (let child of children) {

			if (child.parent)
				child.parent.remove(child)

			child.parent = this
			child.root = this.root

			if (this.lastChild) {

				this.lastChild.next = child
				child.previous = this.lastChild

				this.lastChild = child

			} else {

				this.firstChild = 
				this.lastChild = child

			}

		}

		return this

	}

	remove(...children) {

		for (let child of children) {

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
			child.root = child
			child.previous = null
			child.next = null

		}

		return this

	}

	removeAll() {

		let child = this.firstChild

		while (child) {

			child.parent = null
			child.root = child
			child.previous = null
			child.next = null

			child = child.next

		}

		this.firstChild = null
		this.lastChild = null

		return this

	}

	appendTo(parent) {

		parent.append(this)

		return this

	}

	detach() {

		if (this.parent)
			this.parent.remove(this)

		return this

	}

	walk(callback) {

		callback(this)

		let child = this.firstChild

		while(child) {

			child.walk(callback)

			child = child.next

		}

	}

	// hierarchy test:

	get isRoot() {

		return this.root === this

	}

	get isDetached() {

		return this.root === this && !this.parent && !this.next && !this.previous

	}

	isParentOf(node) {

		while (node) {

			if (node.parent === this)
				return true

			node = node.parent

		}

		return false

	}

	isChildOf(node) {

		return node.isParentOf(this)

	}



	// iterators:

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



	// print:

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
