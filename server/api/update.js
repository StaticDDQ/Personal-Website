let express = require('express');
let Update = require('../models/update');

let router = express.Router();

router.get('/', function (req, res) {
    Update.retrieveAll(function (err, update) {
        if (err)
            return res.json(err);
        return res.json(update);
    })
});

router.get('/firstfive', function (req, res) {
    Update.retrieveFive(function (err, update) {
        if (err)
            return res.json(err);
        return res.json(update);
    });
});

router.get('/:id', function (req, res) {
    Update.findUpdate(req.params.id, function (err, update) {
        if (err)
            return res.json(err);
        return res.json(update);
    })
});

router.post('/', function (req, res) {
    var update = {
        title: req.body.title,
        info: req.body.info,
        date: req.body.date
    };

    Update.insert(update, function (err, result) {
        if (err)
            return res.json(err);
        return res.json(result);
    })
});

module.exports = router;