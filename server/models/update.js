const db = require('../database');

class Update {
    static retrieveAll(callback) {
        db.query('SELECT id,title from update', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static retrieveFive(callback) {
        db.query('SELECT id,title FROM update ORDER BY id DESC LIMIT 5', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static findUpdate(id, callback) {
        db.query('SELECT title,info,date from update WHERE id=' + id, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert(update, callback) {

        var str = "('" + update.title + "','" + update.info + "','" + update.date + "')";

        db.query('INSERT INTO update (title,info,date) VALUES ' + str,
            function (err, res) {
                if (err.error)
                    return callback(err);
                callback(res);
            });
    }
}

module.exports = Update;