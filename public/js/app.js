// grab json articles
$.getJSON("/articles", (data) => {
    // $.ajax({
    //     method: "GET",
    //     url: "/scrape"
    // }).then((data)=>{
    //     console.log(data);
    // })
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
    const thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId

    }).then((data) => {
        // data.note.body.forEach(data)
        // console.log(data.note.body);
        



        $("#notes").append(`<h2>${data.title}</h2>`);
        // for (var i = 0; i < data.length; i++) {
            // if (data.note) {
            $("#notes").append(`<li>${data.note[0].body} <button class="delete" data-id="${data._id}">Delete note</button></li>`);
            // };
        // }
        $("#notes").append(`<textarea id="bodyinput" rows="4" cols="50" name="body"></textarea><br>
        <button data-id="${data._id}" id="savenote">Save Note</button>`);


    });
});


$(document).on("click", "#savenote", function () {

    const thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,

        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    }).then(() => {

        $("#notes").empty();
    });
    $("#titleinput").val("");
    $("#bodyinput").val("");
});


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