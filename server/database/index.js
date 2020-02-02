var { Pool } = require('pg');

class Database {
    constructor() {
        this.pool = new Pool({
            port: 5432,
            password: 'a11c65c05aecee5172198c72f674d6ad820c4008c560e26a03479167d7fb7110',
            database: 'de4n21afqrunnt',
            host: 'ec2-54-174-221-35.compute-1.amazonaws.com',
            user: 'usjoltevzpxptz'
        });

        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle PostgreSQL client.', err);
            process.exit(-1);
        });
    }

    query(query, ...args) {
        this.pool.connect((err, client, done) => {
            if (err) throw err;
            const params = args.length === 2 ? args[0] : [];
            const callback = args.length === 1 ? args[0] : args[1];

            client.query(query, params, (err, res) => {
                done();
                if (err) {
                    console.log(err.stack);
                    return callback({ error: 'Database error.' }, null);
                }
                callback({}, res.rows);
            });
        });
    }

    end() {
        this.pool.end();
    }
}

module.exports = new Database();