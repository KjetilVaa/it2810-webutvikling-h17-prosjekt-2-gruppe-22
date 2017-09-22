class Element {
    constructor({type, id, className, src, inner, score, date, comments, author, title, post_hint}) {
        this.type = type,
        this.id = id,
        this.className = className
        this.src = src
        this.score = score
        this.date = date
        this.comments = comments
        this.author = author
        this.title = title
        this.postHint = post_hint;

    }

    render(parent, c) {
        let children = c || []
        let element = document.createElement(this.type)
        if (this.id) { element.id = this.id }
        if (this.className) { element.className = this.className }
        if (this.src) { element.src = this.src }
        let node = parent.appendChild(element)
        children.forEach((child) => {
            child.render(node)
        })
    }
}

export default Element
