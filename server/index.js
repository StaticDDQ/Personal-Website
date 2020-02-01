let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

var db = require('./database');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/account', require('./api/account'));
app.use('/api/project', require('./api/project'));
app.use('/api/update', require('./api/update'));

app.listen(PORT, () => console.log("Listening on port " + PORT));

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static(__dirname, '../client/build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

db.query('SELECT NOW()', (err, res) => {
    if (err.error)
        return console.log(err.error);
    console.log('PostgreSQL connected: ' + res[0].now);
});

module.exports = app;