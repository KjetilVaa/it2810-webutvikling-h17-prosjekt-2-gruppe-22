import $ from 'jquery'
import Element from './Element.js'
import APIQueryer from './APIQueryer.js'

// Define constants
const PICTURE_API_LIMIT = 6
const PICTURE_API_BASE = 'https://www.reddit.com'

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

let fetchAndRender = (type) => {
    type.fetchTop().then((data) => {
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

let mountain = new APIQueryer(PICTURE_API_BASE, '/r/geologyporn/.json', 6)
let city = new APIQueryer(PICTURE_API_BASE, '/r/CityPorn/.json', 6)
let water = new APIQueryer(PICTURE_API_BASE, '/r/seaporn/.json', 6)
let forest = new APIQueryer(PICTURE_API_BASE, '/r/BotanicalPorn/.json',6)

function callFetchAndRender(name) {
    switch(name) {
        case "Forest":
            fetchAndRender(forest)
            break
        case "Water":
            fetchAndRender(water)
            break
        case "City":
            fetchAndRender(city)
            break
        case "Mountain":
            fetchAndRender(mountain)
    }
}

$(document).ready(() => {
    // Enable bottom button
    $('.button').click( () => {
        if(event.target.id === 'load-city') {
            fetchAndRender(city)
        }
        else if(event.target.id === 'load-water'){
            fetchAndRender(water)
        }
        else if(event.target.id === 'load-forest'){
            fetchAndRender(forest)
        }
        else if(event.target.id === 'load-mountain'){
            fetchAndRender(mountain)
        }
    })


})

callFetchAndRender($(document).find("title").text());