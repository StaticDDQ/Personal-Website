let express = require('express');
let Person = require('../models/account');

let router = express.Router();

router.get('/', function (req, res) {
    Person.retrieveAll(function (err, person) {
        if (err)
            return res.json(err);
        return res.json(person);
    })
});

module.exports = router;