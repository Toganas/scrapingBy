// grab json articles, show all articles that aren't favorited
$.getJSON("/articles", (data) => {
    for (var i = 0; i < data.length; i++) {
        if (data[i].favorite === false) {
            // $("#articles").append(`<p data-id="${data[i]._id}">${data[i].title}<br />${data[i].link}<br />${data[i].summary}</p>`);
            $("#articles").append(`
        <div class="card mb-3">
            <div class="card-header" >
                <h2><a href="${data[i].link}">${data[i].title}</a></h2>
                <a class = "btn btn-primary save" href="/" data-id="${data[i]._id}">Save Article</a>
            </div>
            <div class="card-body">
                <h5 class="card-title">${data[i].summary}<h5>
            </div>
        </div>
                `);
        };
    };
});
// show all articles that are favorited
$.getJSON("/articles", (data) => {
    for (var i = 0; i < data.length; i++) {
        if (data[i].favorite === true) {

            $("#favorites").append(`
        <div class="card mb-3">
            <div class="card-header" >
                <h2><a href="${data[i].link}">${data[i].title}</a></h2>
                <a class = "btn btn-primary note" data-id="${data[i]._id}">Make a Note</a>
                <a class = "btn btn-primary remove" href="/favorites" data-id="${data[i]._id}">Remove from favorites</a>
            </div>
            <div class="card-body">
                <h5 class="card-title">${data[i].summary}<h5>
            </div>
        </div>
                `);
        };
    };
});

$(document).on("click", ".note", function () {
    $("#notes").empty();
    $("#prevNotes").empty();
    const thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId

    }).then(data => {
        // data.note.body.forEach(data)
        console.log(data);
        $("#notes").append(`<h2>${data.title}</h2>`);
        $("#notes").append("<input id='titleinput' placeholder='Title for Note' name='title' >")
        $("#notes").append(`<textarea id="bodyinput" placeholder="New Note" rows="4" cols="50" name="body"></textarea><br>
        <button data-id="${data._id}" id="savenote">Save Note</button>`);
        if (data.note) {
            console.log(data.note);
            $("#prevNotes").append(`<li>${data.note[0].title} : ${data.note[0].body} <button class="delete" data-id="${data.note[0]._id}">Delete note</button></li>`);
        };
    });
});


// updating note
$(document).on("click", "#savenote", function () {
    // const thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/",

        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    }).then(() => {

        $("#notes").empty();
        $("#prevNotes").empty();
    });
    $("#titleinput").val("");
    $("#bodyinput").val("");
});

// put in favorites

$(document).on("click", ".save", function () {
    const thisId = $(this).attr("data-id")
    console.log(thisId)
    $.ajax({
        method: "POST",
        url: "/favorite/" + thisId,
        data: {
            favorite: true
        }
    }).then(() => {
        location.reload();
    })
})

// remove from favorites
$(document).on("click", ".remove", function () {
    const thisId = $(this).attr("data-id")
    console.log(thisId)
    $.ajax({
        method: "POST",
        url: "/remove/" + thisId,
        data: {
            favorite: false
        }
    }).then(() => {
        location.reload();
    })
})

$(document).on("click", ".delete", function (){
    const thisId = $(this).attr("data-id")
    console.log(thisId);
    $.ajax({
        method: "DELETE",
        url: "/notes/" + thisId
    }).then(()=>{
        location.reload
    })
})