
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
            console.log("test")
            window.location.reload();

            // window.location = "/"
            // ==== not work

            // window.location.reload();
            // ==== not work

            // $.ajax({
            //     method: "GET",
            //     url: "/"
            // })
            //     .then(function (data) {
            //     });
            // ==== not work

        });
});

// =============== click save button to save news ===============
$(document).on("click", ".saveBtn", () => {
    let thisId = $(".saveBtn").attr("data-ObjectId");
    console.log(thisId);

    $.ajax({
        method: "PUT",
        url: "/save/" + thisId
    })
        .then(function (data) {
            console.log(data);
            window.location.reload()
        });
});

// =============== click remove button to un-save news ===============
$(document).on("click", ".unSaveBtn", () => {
    let thisId = $(".unSaveBtn").attr("data-ObjectId");
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
