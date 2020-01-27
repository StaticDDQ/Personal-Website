const db = require('../database');

class Account {
    static retrieveAll(callback) {
        db.query('SELECT * from person', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
}

module.exports = Account;