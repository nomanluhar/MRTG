const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

// var connection = mysql.createConnection({
//     host     : process.env.MYSQL_HOST,
//     port     : process.env.MYSQL_PORT,
//     user     : process.env.MYSQL_USER,
//     password : process.env.MYSQL_PASSWORD,
//     database : process.env.MYSQL_DATABASE
// });

var connection = mysql.createConnection({  
  host: "localhost",  
  user: "root",  
  password: "root",
  database : "MRTG"
});  

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    // console.log('connected as id ' + connection.threadId);
    console.log('Database connected!!!');   
});

module.exports = connection