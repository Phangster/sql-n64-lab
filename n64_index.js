const pg = require('pg');

// set all of the configuration in an object
const configs = {
    user: 'drillaxholic',
    host: '127.0.0.1',
    database: 'n64',
    port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

// start using your client
client.connect((err) => {
    if (err) {
        console.log('error', err.message);
    } else {
        let Arr_SQL_Data = [
        					'SELECT title FROM games', 
        					'SELECT year FROM games', 
        					"SELECT title FROM games WHERE developers = 'Rare'", 
        					'SELECT title FROM games WHERE year < 1998',
        					'SELECT AVG(year) FROM games'
        					]
        Arr_SQL_Data.forEach((game) => {
            client.query(game, (err, res) => {
                if (err) {
                    console.log('query error', err.message);
                } else {
                	console.log(res.rows);
                    if (game === Arr_SQL_Data.length - 1) {
                        client.end();
                    }
                }
            })
        })
    };
});