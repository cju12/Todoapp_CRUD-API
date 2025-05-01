// This is a simple Express server that serves static files from the 'public' directory

import express from 'express'; // importing express module.
import mongoose from 'mongoose'; // importing mongoose module.
import dotenv from 'dotenv'; // importing dotenv module.
import path from 'path'; // importing path module.
import { fileURLToPath } from 'url'; // importing fileURLToPath module.
import connectToDB from './database/db.js'; // importing connectToDB function from db.js file.
import { Todo } from './modules/todo_model.js'; // importing Todo model from todo_model.js file.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // getting the directory name of the current file.
// This is used to resolve the path of the current file and get the directory name.

dotenv.config(); // Load environment variables from .env file 

const app = express(); // Create an instance of express 

app.set('view engine', 'ejs'); // using EJS as the templating engine for rendering views.
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // parse URL-encoded data (form data) (basically, it allows us to access form data from EJS in req.body)
app.use(express.static(__dirname + '/public')); // serving static files from the 'public' directory.

connectToDB(); // connecting to the mongoDB database

app.get('/add', async (req, res) => {
    try {
        res.render('add'); // rendering add.ejs file when the user accesses the /add route.
    } catch (error) {
        res.status(500).send('Internal Server Error'); // if an error occurs, send a 500 status code.
    }
});

app.get('/', async (req, res) => {
    try {
        const result = await Todo.find({}); // using Todo model to find all todo items in the DB.  
        res.render('index', { todoList: result }); // rendering index.ejs file and passing the todoList data to it.
    } catch (error) {
        res.send('Internal Server Error'); // if an error occurs, send a 500 status code.
    }
});
//TODO APIs
app.get('/todo', async (req, res) => {
    try {
        const result = await Todo.find({}); // using Todo model to find all todo items in the DB.  
        res.send({
            success: true,
            message: "Todo Lists Retrieved Successfully",
            data: result,
        });
    } catch (error) {
        res.send({
            success: false,
            message: "Failed To Retrieved Todo Lists Successfully",
            data: null,
        });

    }
});

app.get('/patch:todoId', async (req, res) => {
    const todoID = req.params.todoId; // get the todoId from the request URL.
    try {
        const result = await Todo.findById(todoID);
        res.render('patch', { todo : result }); // rendering patch.ejs file and passing the todo data to it.
    } catch (error) {
        res.status(500).send('Internal Server Error'); // if an error occurs, send a 500 status code.
    }
});

app.post('/create-todo', async (req, res) => {
    const todoDetails = req.body; // get the todo details from the request body.
    // const todoDetails = { text: "asdf", priority: "high", deadline: "dd/mm/yyyy" }; // example todo details
    try {
        const result = await Todo.create(todoDetails); // Using todo model to create a new todo item in the DB.
        res.send({
            success: true,
            message: "Todo Created Successfully",
            data: result,
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Failed To Create Todo",
            data: null,
        });
    }
});

app.get('/:todoId', async (req, res) => {
    const todoID = req.params.todoId; // 요청 URL에서 todoId를 가져옵니다.
    try{
        const result = await Todo.findById(todoID);
        res.send({
            success: true,
            message: "Todo is Retrieved Successfully",
            data: result,
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Failed To Retrieved Todo",
            data: null,
        })
    }
})

app.patch('/:todoId', async (req, res) => {
    const todoId = req.params.todoId; // 요청 URL에서 todoId를 가져옵니다.
    const updatedTodo = req.body; // 요청 본문에서 업데이트할 Todo 항목을 가져옵니다.
    try {
        const result = await Todo.findByIdAndUpdate(todoId, updatedTodo, { new: true }); // Todo 모델을 사용하여 Todo 항목을 업데이트합니다.
        res.send({
            success: true,
            message: "Todo Updated Successfully",
            data: result,
        });
    } catch (error) {
        res.send({
            success: false,
            message: "Failed To Update Todo",
            data: null,
        });
    }
});

app.delete('/:todoId', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.todoId); // Todo 모델을 사용하여 Todo 항목을 삭제합니다.
        res.send({
            success: true,
            message: "Todo is Deleted Successfully",
            data: null,
        });
    } catch (error) {
        res.send({
            success: false,
            message: "Failed To Delete Todo",
            data: null,
        });
    }
})

const port = process.env.port || 3000;

app.listen(port, function(){
    console.log(`listening on ${port}`);
});//3000의 포트로 서버를 실행합니다. 만약 3000포트로 사용자가 접속하면 console.log(...)를 실행합니다

//요청을 처리하는 기계 제작
//누군가가 /todo로 요청을 하면, 서버는 '투두 앱'이라는 응답을 보냅니다.
//app.get('경로', function(요청, 응답){})
// '/'는 루트 경로를 의미합니다. 즉, 사용자가 http://localhost:3000/로 접속했을 때 이 경로가 실행됩니다.



