import $ from 'jquery'
import Element from './Element.js'
import APIQueryer from './APIQueryer.js'
var elements = [];

// Define constants
const PICTURE_API_LIMIT = 6
const PICTURE_API_BASE = 'https://www.reddit.com'

//Creates API loaders
let mountain = new APIQueryer(PICTURE_API_BASE, '/r/Mountainpics/.json', PICTURE_API_LIMIT)
let city = new APIQueryer(PICTURE_API_BASE, '/r/CityPorn/.json', PICTURE_API_LIMIT)
let water = new APIQueryer(PICTURE_API_BASE, '/r/seaporn/.json', PICTURE_API_LIMIT)
let forest = new APIQueryer(PICTURE_API_BASE, '/r/BotanicalPorn/.json',PICTURE_API_LIMIT)


let renderPictures = (pictures) => {
    pictures.forEach((picture) => {
        let card = new Element({
            type: 'div',
            className: 'earth-picture-card'
        })
        let img = new Element({
            id: picture.id,
            type: 'img',
            score: picture.score,
            date: picture.date,
            comments: picture.comments,
            author: picture.author,
            title: picture.title,
            post_hint: picture.post_hint,
            src: picture.url,
            className: 'earth-picture'
        })
        elements.push(img)
        card.render(document.querySelector('.picture-container'), [img])


    })
    //Adds listener to all earth-picture-card objects
    $('.earth-picture-card').click(() => fullPicture("flex", event.target))
}

let fetchAndRender = (type) => {
    type.fetchTop().then((data) => {
        let pictures = data.map((p) => {
            const d = p.data
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

        renderPictures(pictures)
    })
}

let fullPicture =  (type, element) => {
    if(element !== null) {
        console.log(element.id)
        var pictureElement;
        elements.forEach(function (item) {
            if (item.id == element.id) {
                pictureElement = item
            }
        });

        var picureDate = new Date(0)
        var reg = "^[a-zA-Z ]*$"
        picureDate.setUTCSeconds(parseInt(pictureElement.date))
        console.log(pictureElement.title)
        $("#title").text(pictureElement.title)
        $("#date").text("Date: " + picureDate.getDate() + "." + picureDate.getMonth() + "." + picureDate.getFullYear())
        $("#author").text(pictureElement.author)

        document.getElementById("overlay-picture").src = pictureElement.src
    }
    document.getElementById("faded").style.display = type
    document.getElementById("overlay").style.display = type
    document.getElementById("overlay-container").style.display = type
}

/*
 *Calls fetchAndRender function for a given site.
 * parm String
 */
let callFetchAndRender = (name) => {
    switch(name) {
        case "Forest":
        case "load-forest":
            fetchAndRender(forest)
            break
        case "Water":
        case "load-water":
            fetchAndRender(water)
            break
        case "City":
        case "load-city":
            fetchAndRender(city)
            break
        case "Mountain":
        case "load-mountain":
            fetchAndRender(mountain)
    }
}

$(document).ready(() => {
    // Adds listener to "load more pictures" button
    $('.button').click( () => {callFetchAndRender(event.target.id)})

    //Adds listener to exit-overlay button
    $('#exit-button').click( () => {fullPicture('none', null)})

    //Renders the first 6 pictures
    callFetchAndRender($(document).find("title").text())
})

