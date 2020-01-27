let express = require('express');
let Project = require('../models/project');

let router = express.Router();

router.get('/', function (req, res) {
    Project.retrieveAll(function (err, project) {
        if (err)
            return res.json(err);
        return res.json(project);
    })
});

router.get('/:id', function (req, res) {
    Project.retrieveById(req.params.id, function (err, project) {
        if (err)
            return res.json(err);
        return res.json(project);
    })
});

router.post('/', function (req, res) {
    var project = {
        projTitle: req.body.projTitle,
        projDesc: req.body.projDesc,
        projLogo: req.body.projLogo,
        projImgs: req.body.projImgs,
        projVid: req.body.projVid
    };

    Project.insert(project, function (err, result) {
        if (err)
            return res.json(err);
        return res.json(result);
    })
});

module.exports = router;