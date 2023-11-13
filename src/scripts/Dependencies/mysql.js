const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'RealEstate',
});

connection.connect();

connection.query('SELECT * FROM real_estate', (error, results) => {
    if (error) {
        throw error;
    }
    console.log('Data from the real_estate table:', results);
});

connection.end();
