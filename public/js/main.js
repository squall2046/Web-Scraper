$(document).ready(function () {
    // $getJSON("/new", (data) => {})

    // =============== click clear News button ===============
    $("#clearBtn").on("click", () => {
        $.ajax({
            method: "DELETE",
            url: "/clear"
        })
            .then(function (data) {
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

        $.ajax({
            method: "PUT",
            url: "/save/" + thisId,
            data: thisTitle
        })
            .then(function (data) {
                window.location.reload()
            });
    });

    // =============== click unSave button to un-save news ===============
    $(document).on("click", ".unSaveBtn", function () {
        let thisId = $(this).attr("data-ObjectId");

        $.ajax({
            method: "PUT",
            url: "/unsave/" + thisId
        })
            .then(function (data) {
                window.location.reload()
            });
    });

    // =============== click note button to pop-up page ===============
    $(document).on("click", ".noteBtn", function () {
        $(".popUp").fadeIn();

        let thisId = $(this).attr("data-ObjectId");

        $.ajax({
            method: "GET",
            url: "/note/" + thisId
        })
            .then(function (data) {
                $(".noteList").empty();
                console.log(data.theNews.note.note);
                data.theNews.note.note.forEach((eachNote) => {
                    $(".noteList").prepend('<li class="newLi">');
                    $(".newLi").append(eachNote);
                    $(".newLi").append('<button class="btn delNote"><i class="fas fa-trash"></i></button>')
                })

                // =============== click note-submit button to post a new note ===============
                $(document).on("click", ".submitNoteBtn", function () {
                    event.preventDefault();
                    let writeNote = $("#writeNote").val().trim();
                    let newsId = data.theNews._id;
                    console.log(newsId);

                    $.ajax({
                        method: "POST",
                        url: "/post/" + newsId,
                        data: { note: writeNote }
                    })
                        .then(function (data) {
                            console.log(data.note);
                        });
                });
            });
    });

    // =============== click X to close pop-up page ===============
    $(document).on("click", ".close", function () {
        $(".popUp").fadeOut();
    })

    // // =============== click note-submit button to post a new note ===============
    // $(document).on("click", ".submitNoteBtn", function () {
    //     event.preventDefault();
    //     let writeNote = $("#writeNote").val();
    //     let thisId = $(this).attr("data-ObjectId");

    //     $.ajax({
    //         method: "POST",
    //         url: "/post/" + thisId,
    //         data: writeNote
    //     })
    //         .then(function (data) {
    //             // console.log(data);
    //         });
    // });
})
