const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'RealEstate',
});

connection.connect();

const query = `
  SELECT 
    c.id_client,
    c.name AS client_name,
    SUM(d.price) AS total_purchase_amount
  FROM client c
  JOIN deal d ON c.id_deal = d.id_deal
  GROUP BY c.id_client;
`;

connection.query(query, (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

connection.end();