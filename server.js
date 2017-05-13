const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {MongoClient, ObjectID} = require('mongodb');
const port = 3000;

//init app
const app = express();


//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

//view setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//mongodb setup
const url = 'mongodb://localhost:27017/NewTodo';

// connect to db
MongoClient.connect(url, (err, database)=>{
    if(err) {
        return console.log('failed to connect to db');
    }
    
    console.log('Connected to DB');

    let db = database;
    let Todos = db.collection('todos');
    db.collection('Todos').insert({
        todo: 'do something'
    }, (err, result)=>{
        if(err){
            console.log('unable to connect to todos');
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    // routes
    app.get('/', (req, res)=>{
        Todos.find().toArray((err , todos)=> {
            if(err){
                console.log('unable to fetch the data');
            }
            // console.log(todos);
            res.render('index',{
                
                todos:todos
            });
        }
        );
    });

});

//listen port
app.listen(port, ()=>{
    console.log('listen port no. :'+ port);
});

module.exports = app;