$(document).ready(() => {
    $('#results').hide();
    $('#contact_form').show();

    $("#submit-button").click( () => {
        let text = $("#msg-text").text()
        let name = $("#msg-name").text()
        $.get( '/msg',{name, text}, function(data) {
            $('#contact_form').hide();
            $('#results').html(data);
            $('#results').show();
        })
    }
)
})