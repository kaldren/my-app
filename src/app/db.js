const sql = require('mssql');

const config = {
  user: 'MyAppLogin',
  password: 'Parola123',
  server: 'localhost\\SQLEXPRESS', 
  database: 'my-app',
  options: {
      encrypt: false, // for local development
      trustedConnection: true,
      trustServerCertificate: false
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool;
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
  sql, poolPromise
};
