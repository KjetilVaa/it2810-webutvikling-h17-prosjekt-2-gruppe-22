import $ from 'jquery'
import Element from './Element.js'
import APIQueryer from './APIQueryer.js'

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
        let img = new Element({
            id: picture.id,
            type: 'img',
            src: picture.url,
            className: 'earth-picture'
        })
        card.render(document.querySelector('.picture-container'), [img])

        $('.earth-picture-card').click(() => fullPicture("flex", event.target))
    })
}

let fetchAndRender = () => {
    earthAPI.fetchTop().then((data) => {
        let pictures = data.map((p) => {
            const d = p.data
            console.log(d)
            return {
                score: d.score,
                date: d.created_utc,
                comments: d.num_comments,
                id: d.id,
                author: d.author,
                over_18: d.over_18,
                title: d.title,
                url: d.url,
                post_hint: d.post_hint
            }
        }).filter((p) => !p.over_18 && p.post_hint === 'image')
        console.log(pictures)

        renderPictures(pictures)
    })
}

function fullPicture (type, element) {
    document.getElementById("faded").style.display = type
    document.getElementById("overlay-container").style.display = type
    console.log(element)
    document.getElementById("overlay-picture").src = element.src
}

let earthAPI = new APIQueryer(PICTURE_API_BASE, PICTURE_API_URL, PICTURE_API_LIMIT)

$(document).ready(() => {

    // Enable bottom button
    $('#load-more-pictures').click(fetchAndRender)

    // Fetch and render first batch of pictures
    fetchAndRender()
})