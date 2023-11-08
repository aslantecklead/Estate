const { createPool } = require('mysql');

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "RealEstate",
});

const getProperties = (callback) => {
  pool.query('SELECT * FROM real_estate', (err, result) => {
    if (err) {
      console.error(err);
      callback({ error: 'Failed to fetch data from the database' }, null);
    } else {
      callback(null, { data: result });
    }
  });
};

module.exports = {
  getProperties,
};
