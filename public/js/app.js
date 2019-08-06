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
                <a class = "btn btn-primary save" data-id="${data[i]._id}">Save Article</a>
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
        console.log(data.note);
        // data.note.forEach((note)=>{
        //     $("#notes").append(`${note}`)
        // })
        
        
        $("#notes").append(`<h2>${data.title}</h2>`);
        if (data.note) {
            $("#notes").append(data.note.body + "<br>");
        };

        $("#notes").append(`<textarea id="bodyinput" name="body"></textarea>`);
        $("#notes").append(`<button data-id="${data._id}" id="savenote">Save Note</button>`);

        
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
    }).then((data) => {

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