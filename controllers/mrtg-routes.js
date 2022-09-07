const express = require("express");
const router = express.Router();

const { mrtgAdd, mrtgUpdate, mrtg, mrtgRemove } = require('./mrtg-routes-functions.js');

router.post("/mrtg/add", (req, res) => {
    mrtgAdd(req, res)
});

router.patch("/mrtg/:id", (req, res) => {
    mrtgUpdate(req, res);
});

router.get("/mrtg", (req, res) => {
    mrtg(req, res);
});

router.delete("/mrtg/:id", (req, res) => {
    mrtgRemove(req, res);
});


module.exports = router;