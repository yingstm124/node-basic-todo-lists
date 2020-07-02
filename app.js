const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');

const { getHomePage, addTask, deleteTask } = require('./routes');

const db = mysql.createConnection( {
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'ba5539d1f9e0b3',
    password: '1648c7b2',
    database: 'heroku_ebdbe8b17c62de8'
});

db.connect((err) => {
    if(err) {
        console.log(err);
        throw err
    }
    console.log('Database is connected !!');
});

global.db = db;

const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');
app.use(express.static(
    path.join(__dirname, 'public')
));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', getHomePage);
app.post('/add', addTask);
app.get('/delete/:id', deleteTask);

app.listen(PORT, () => {
    console.log('PORT ',PORT, ' is working !!');
});
