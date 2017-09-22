class Element {
    constructor({type, id, className, src, inner}) {
        this.type = type,
        this.id = id,
        this.className = className
        this.src = src
        this.inner = inner
    }

    render(parent, c) {
        let children = c || []
        let element = document.createElement(this.type)
        if (this.id) { element.id = this.id }
        if (this.className) { element.className = this.className }
        if (this.src) { element.src = this.src }
        if (this.inner) { element.innerHTML = this.inner }
        let node = parent.appendChild(element)
        children.forEach((child) => {
            child.render(node)
        })
    }
}

export default Element
