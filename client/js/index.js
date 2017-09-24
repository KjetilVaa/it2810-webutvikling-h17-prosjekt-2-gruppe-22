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

/*
 * Creates a picture element, and creates a new HTML element
 */
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

/*
 * Fetches the pictures and checks that they are not for over 18
 */
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

/*
 * Makes the overlay visible
 * Sets in the correct picture and info
 */
let fullPicture =  (type, element) => {
    if(element !== null) {
        var pictureElement;
        elements.forEach(function (item) {
            if (item.id == element.id) {
                pictureElement = item
            }
        });

        //Splits the title into title and resolution and check that it has a valid value
        var resolution = pictureElement.title.match(/[\[][[0-9xX× ]+[[0-9xX× ]+[\]]/g)
        var title = pictureElement.title.match(/[a-zA-ZæøåÆØÅ.' ]+/g)

        //Checks if title and resolution got a value, else unknown
        if(resolution === null) {
            resolution = ["Unknown"]
        }
        else {
            resolution[0] = resolution[0].match(/[^\[\]]+/g)
        }
        if (title === null){
            title = ["Unknown"]
        }


        //Converts the date from UTC to day, month, year
        var picureDate = new Date(0)
        picureDate.setUTCSeconds(parseInt(pictureElement.date))

        //Change the text in the html document
        $("#title").text(title[0])
        $("#date").text("Date: " + picureDate.getDate() + "." + (picureDate.getMonth()+1) + "." + picureDate.getFullYear())
        $("#author").text("Author: " + pictureElement.author)
        $("#resolution").text("Resolution: " + resolution[0])
        $("#overlay-picture").attr("src",pictureElement.src)
    }
    //Turning the overlay visible or making it invisible
    $("#faded").css("display", type);
    $("#overlay-container").css("display", type);
}

/*
 *Calls fetchAndRender function for a given site.
 */
let callFetchAndRender = (name) => {
    //checks what photos to load
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
/*
* As soon as the document is ready,
* Add listeners
* Load first pictures
*/
$(document).ready(() => {
    // Adds listener to "load more pictures" button
    $('.button').click( () => {callFetchAndRender(event.target.id)})

    //Adds listener to exit-overlay button
    $('#exit-button').click( () => {fullPicture('none', null)})
    $('#faded').click( () => {fullPicture('none', null)})


    //contact page
    //Add listener to button submit, refresh div using ajax functionality
    $('#results').hide();
    $('#contact_form').show();

    $("#submit").click( () => {
            let text = $("#msg-text").val();
            let name = $("#msg-name").val();
            let email = $("#msg-mail").val();
            if( text !== "" && email !== "" && name !== "") {
                $.post( '/msg',{name: name,text: text,email: email}, function(data) {
                    $('.text_container').html(data);
                })
            }
        }
    )

    
    //Renders the first 6 pictures
    callFetchAndRender($(document).find("title").text())
})

