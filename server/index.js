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

if (ENV === 'production') {
 
}

db.query('SELECT NOW()', (err, res) => {
    if (err.error)
        return console.log(err.error);
    console.log('PostgreSQL connected: ' + res[0].now);
});

module.exports = app;