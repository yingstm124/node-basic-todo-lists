var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');

const { getHomePage, addTask, deleteTask } = require('./routes');

const db = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: '27365410',
    database: 'Todolist'
});

db.connect((err) => {
    if(err) {
        console.log(err);
        throw err
    }
    console.log('Database is connected !!');
});

global.db = db;

const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');
app.use(express.static(
    path.join(__dirname, 'public')
));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', getHomePage);
app.post('/add', addTask);
app.get('/delete/:id', deleteTask);

app.listen(PORT, () => {
    console.log('PORT ',PORT, ' is working !!');
});
