// Dependencies
// =============================================================
const axios = require("axios");
const cheerio = require("cheerio");

// Models
// =============================================================
const db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // =============== get news from mongodb news collection ===============
    app.get("/", function (req, res) {
        db.New.find({ saved: false }).sort({ date: -1 })
            .then((dbNew) => {
                let hbsObject = {
                    news: dbNew
                };
                res.render("index", hbsObject);
                // console.log(hbsObject)
                console.log(hbsObject.news)
            });
    });

    // =============== get saved from mongodb news collection as well ===============
    app.get("/saved", function (req, res) {
        db.New.find({ saved: true }).sort({ date: -1 })
            .then((dbSaved) => {
                let hbsObject = {
                    news: dbSaved
                };
                res.render("saved", hbsObject);
                console.log(hbsObject)
            });
    });

    // =============== click clear News button ===============
    app.delete("/clear", (req, res) => {
        db.New.remove({})
            .then((cleared) => {
                console.log("It's been cleared")
            })
            .catch((err) => {
                console.log(err)
            });
    })

    // =============== click Scrape News button ===============
    app.post("/scrape", (req, res) => {
        db.New.remove({})
            .then((cleared) => {
                axios.get("http://www.ign.com/")
                    .then((response) => {
                        let $ = cheerio.load(response.data);
                        let result = {};
                        $("article .item-body .item-thumbnail a").each(function (i, element) {
                            result.title = $(this)
                                .children("img")
                                .attr("alt");
                            result.link = $(this)
                                .attr("href");
                            result.img = $(this)
                                .children("img")
                                .attr("data-original");
                            console.log(result)

                            db.New.create(result)
                                .then((dbNew) => {
                                    // console.log(dbNew)
                                })
                                .catch((err) => {
                                    console.log(err)
                                });
                        })
                    });

                // res.send("Scrape Complete !!")
            })
            .catch((err) => {
                console.log(err)
            });
    })


    // =============== click save button to save news ===============
    app.put("/save/:id", (req, res) => {
        db.New.findOneAndUpdate({ _id: req.params.id }, { saved: true })
            .then((dbSave) => {
                res.json(dbSave);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    // =============== click remove button to un-save news ===============
    app.put("/unsave/:id", (req, res) => {
        db.New.findOneAndUpdate({ _id: req.params.id }, { saved: false })
            .then((dbUnsave) => {
                res.json(dbUnsave);
            })
            .catch((err) => {
                res.json(err);
            });
    });






    // =============== click note ===============
    app.get("/new/:id", (req, res) => {
        db.New.findOne({ _id: req.params.id })
            .populate("note")
            .then(function (dbNew) {
                res.json(dbNew);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    app.post("/new/:id", (req, res) => {
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.dbNew.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function (dbNew) {
                res.json(dbNew);
            })
            .catch((err) => {
                res.json(err);
            });
    });

};
