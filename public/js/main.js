
// $(document).ready(function () {
//     $getJSON("/new", (data) => {
//     })
// })

// =============== click clear News button ===============
$("#clearBtn").on("click", () => {
    console.log("test");

    $.ajax({
        method: "DELETE",
        url: "/clear"
    })
        .then(function (data) {
            console.log("test");
            window.location.reload();
        });
});

// =============== click Scrape News button ===============
$("#scrapeBtn").on("click", () => {

    $.ajax({
        method: "POST",
        url: "/scrape"
    })
        .then(function (data) {
            window.location.reload();
        });
});

// =============== click save button to save news ===============
$(document).on("click", ".saveBtn", function () {
    let thisId = $(this).attr("data-ObjectId");
    let thisTitle = $(this).attr("data-Title");
    console.log(thisId);

    $.ajax({
        method: "PUT",
        url: "/save/" + thisId,
        data: thisTitle
    })
        .then(function (data) {
            console.log(data);
            window.location.reload()
        });
});

// =============== click remove button to un-save news ===============
$(document).on("click", ".unSaveBtn", function () {
    let thisId = $(this).attr("data-ObjectId");
    console.log(thisId);

    $.ajax({
        method: "PUT",
        url: "/unsave/" + thisId
    })
        .then(function (data) {
            console.log(data);
            window.location.reload()
        });
});

// =============== click note button to edit notes ===============
$(".popUp").hide()
$(document).on("click", ".noteBtn", function () {
    $(".popUp").show()

    let thisId = $(this).attr("data-ObjectId");
    console.log(thisId);

    $.ajax({
        method: "GET",
        url: "/note/" + thisId
    })
        .then(function (data) {
            console.log(data);
        });
});

// =============== click X to close pop-up page ===============
$(document).on("click", ".close", function () {
    $(".popUp").hide()
})


// =============== click note-submit button to post a new note ===============
$(document).on("click", ".submitNoteBtn", function () {
    event.preventDefault();
    let writeNote = $("#writeNote").val();
    let thisId = $(this).attr("data-ObjectId");
    console.log(thisId);

    $.ajax({
        method: "GET",
        url: "/note/" + thisId,
    })
        .then(function (data) {
            console.log(data);

        });

    $.ajax({
        method: "POST",
        url: "/post/" + thisId,
        data: writeNote
    })
        .then(function (data) {
            console.log(data);

        });
});
