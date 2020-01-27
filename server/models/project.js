const db = require('../database');

class Project {

    static retrieveAll(callback) {
        db.query('SELECT id,projtitle, projlogo FROM project ', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static retrieveById(id, callback) {
        db.query('SELECT * FROM project WHERE id = ' + id, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert(project, callback) {

        var imgs = [];

        for (var i = 0; i < project.projImgs.length; i++) {
            if (project.projImgs[i] !== null) {
                imgs.push("'" + project.projImgs[i] + "'");
            }
        };

        var str = "('" + project.projTitle + "','" + project.projDesc + "','" + project.projLogo + "', ARRAY[" + imgs + "],'" + project.projVid + "')";
        db.query('INSERT INTO project (projTitle,projDesc,projLogo,projImgs,projVid) VALUES ' + str,
            function (err, res) {
                if (err.error)
                    return callback(err);
                callback(res);
            });
    }
}

module.exports = Project;