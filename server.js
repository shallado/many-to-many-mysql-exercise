const mysql = require('mysql');
const {
  host,
  user,
  password,
  database
} = require('./config/db');

const createTables = (connection) => {
  const reviewersTable = `CREATE TABLE IF NOT EXISTS reviewers (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL    
    )`;
  const seriesTable = `CREATE TABLE IF NOT EXISTS series (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      released_year INT NOT NULL,
      genre VARCHAR(255) NOT NULL
    )`;
  const reviewsTable = `CREATE TABLE IF NOT EXISTS reviews (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      rating DECIMAL(2, 1),
      series_id INT NOT NULL,
      reviewer_id INT NOT NULL,
      FOREIGN KEY(series_id) REFERENCES series(id),
      FOREIGN KEY(reviewer_id) REFERENCES reviewers(id)
    )`

  const tables = [reviewersTable, seriesTable, reviewsTable];

  for (let table of tables) {
    connection.query(
      table,
      (err, results) => {
        if (err) {
          return console.log('Unable to create table \n', err);
        }

        console.log('Successfully created table \n', results);
      }
    );
  }
};

const insertData = (connection) => {
  const seriesData = `INSERT INTO series (title, released_year, genre) VALUES
    ('Archer', 2009, 'Animation'),
    ('Arrested Development', 2003, 'Comedy'),
    ("Bob's Burgers", 2011, 'Animation'),
    ('Bojack Horseman', 2014, 'Animation'),
    ("Breaking Bad", 2008, 'Drama'),
    ('Curb Your Enthusiasm', 2000, 'Comedy'),
    ("Fargo", 2014, 'Drama'),
    ('Freaks and Geeks', 1999, 'Comedy'),
    ('General Hospital', 1963, 'Drama'),
    ('Halt and Catch Fire', 2014, 'Drama'),
    ('Malcolm In The Middle', 2000, 'Comedy'),
    ('Pushing Daisies', 2007, 'Comedy'),
    ('Seinfeld', 1989, 'Comedy'),
    ('Stranger Things', 2016, 'Drama');`;

  const reviewersData = `INSERT INTO reviewers (first_name, last_name) VALUES
    ('Thomas', 'Stoneman'),
    ('Wyatt', 'Skaggs'),
    ('Kimbra', 'Masters'),
    ('Domingo', 'Cortes'),
    ('Colt', 'Steele'),
    ('Pinkie', 'Petit'),
    ('Marlon', 'Crafford');`;

  const reviewsData = `INSERT INTO reviews(series_id, reviewer_id, rating) VALUES
    (1,1,8.0),(1,2,7.5),(1,3,8.5),(1,4,7.7),(1,5,8.9),
    (2,1,8.1),(2,4,6.0),(2,3,8.0),(2,6,8.4),(2,5,9.9),
    (3,1,7.0),(3,6,7.5),(3,4,8.0),(3,3,7.1),(3,5,8.0),
    (4,1,7.5),(4,3,7.8),(4,4,8.3),(4,2,7.6),(4,5,8.5),
    (5,1,9.5),(5,3,9.0),(5,4,9.1),(5,2,9.3),(5,5,9.9),
    (6,2,6.5),(6,3,7.8),(6,4,8.8),(6,2,8.4),(6,5,9.1),
    (7,2,9.1),(7,5,9.7),
    (8,4,8.5),(8,2,7.8),(8,6,8.8),(8,5,9.3),
    (9,2,5.5),(9,3,6.8),(9,4,5.8),(9,6,4.3),(9,5,4.5),
    (10,5,9.9),
    (13,3,8.0),(13,4,7.2),
    (14,2,8.5),(14,3,8.9),(14,4,8.9);`;

  const tableData = [seriesData, reviewersData, reviewsData];

  for (let data of tableData) {
    connection.query(data, (err, result) => {
      if (err) {
        console.log('Unable to add data \n', err);
      }

      console.log('Successfully added data')
    });
  }

};

const connection = mysql.createConnection({
  host,
  user,
  password,
  database
});

connection.connect((err) => {
  if (err) {
    return console.log('Unable to connect to the database \n', err);
  }

  createTables(connection);
  insertData(connection);

  console.log('Successfully connected to the database');
});
