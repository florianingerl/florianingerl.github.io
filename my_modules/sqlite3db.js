const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./sample.db');


function insertNewUser( user, callback) {
    db.run(`INSERT INTO users (nickname, email, password) VALUES(?,?,?)`, [user.nickname, user.email, user.password], function(err) {
        if (err) {
          return console.log(err.message);
        }
        callback();
      });
}

exports = {
    insertNewUser 
};