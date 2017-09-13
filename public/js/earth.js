// Define constants
const PICTURE_API_LIMIT = 6
const PICTURE_API_BASE = 'https://www.reddit.com'
const PICTURE_API_URL = '/r/earthporn/top.json'
const LOADING_GIF_URL = './static/loading.gif'

let renderPictures = (pictures) => {
    pictures.forEach((picture) => {
        let card = new Element({
            type: 'div',
            className: 'earth-picture-card'
        })
        let title = new Element({
            type: 'p',
            inner: picture.title,
            className: 'earth-picture-title'
        })
        let img = new Element({
            id: picture.id,
            type: 'img',
            src: picture.url,
            className: 'earth-picture'
        })
        card.render(document.querySelector('.earth-picture-container'), [img, title])
    })
}

let fetchAndRender = (API) => {
    earthAPI.fetchTop().then((data) => {
        let pictures = data.map((p) => {
            const d = p.data
            return {
                id: d.id,
                author: d.author,
                over_18: d.over_18,
                title: d.title,
                url: d.url,
                score: d.score,
                post_hint: d.post_hint
            }
        }).filter((p) => !p.over_18 && p.post_hint === 'image')
        console.log(pictures)

        renderPictures(pictures)
    })
}

let main = () => {
    document.getElementById('load-more-pictures').addEventListener('click', fetchAndRender)
    fetchAndRender()
}

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

class APIQueryer {
    constructor(base, url, limit) {
        this.base = base,
        this.url = url,
        this.limit = limit
        this.previous = ''
    }

    createQuery() {
        return `${this.base}${this.url}?limit=${this.limit}&after=${this.previous}`
    }

    fetchTop() {
        return new Promise((resolve, reject) => {
            const query = this.createQuery()
            console.log(query)
            fetch(query)
                .then((res) => { return res.json() })
                .then(({data}) => {
                    const after = data.after
                    this.updatePrevious(after)
                    resolve(data.children)
                }).catch((err) => {
                    console.error(err)
                    reject(err)
                })
        })
    }

    updatePrevious(id) {
        this.previous = id
    }
}

let earthAPI = new APIQueryer(PICTURE_API_BASE, PICTURE_API_URL, PICTURE_API_LIMIT)

// Initialize the  main JavaScript
document.addEventListener("DOMContentLoaded", main())