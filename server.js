/**
 * 
27/04/2025 : 

The "/add" address will now function as the same as the "/patch" "/delete" addresses by using fetch api (it's no longer a html based. Like form action="".... method="").

Fixed the bug in "/patch" which was allowing the wrong date inputs like (123/02/20254 .... etc).

28/04/2025 :

Added isValidDate() function to check whether the deadline of the goals are valid (not like 31/02/2025 or 31/11/2025)

01/05/2025 : 

Designed the main page, and few changes are made in index ejs file for the design

02/05/2025 : 

Fixed (From **TODO** : delete todos are sometimes not working, bug fix is needed.). Designing the mainpage is completed. 

03/05/2025 : 

Designed the "/add" address, with a minor id values changes in add.ejs file 

04/05/2025 : 

Designed the whole webapp. Comments on server.js were changed. Added the top UI in "/add" address

07/05/2025 :

Added comments for the elaboration of the lines of codes

08/05/2025 :

More comments for the elaboration are made in server.js

09/05/2025 :

Created add.js file for javascript functions needed in add.ejs file.  
 */

import express from "express"; // importing express module.
import mongoose from "mongoose"; // importing mongoose module.
import dotenv from "dotenv"; // importing dotenv module.
import path from "path"; // importing path module.
import { fileURLToPath } from "url"; // importing fileURLToPath module.
import connectToDB from "./database/db.js"; // importing connectToDB function from db.js file.
import { Todo } from "./models/todo_model.js"; // importing Todo model from todo_model.js file.

const __filename = fileURLToPath(import.meta.url); // Convert the current module's URL to a file path and assign it to __filename
const __dirname = path.dirname(__filename); // getting the directory name of the current file.
// This is used to resolve the path of the current file and get the directory name.

dotenv.config(); // Load environment variables from .env file 

const app = express(); // Create an instance of express 

app.set("view engine", "ejs"); // using EJS as the templating engine for rendering views.
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // parse URL-encoded data (form data) (basically, it allows us to access form data from EJS in req.body)
app.use(express.static(__dirname + "/public")); // serving static files from the "public" directory.

connectToDB(); // connecting to the mongoDB database

/**
 * When user requests the root URL ("/add"), render an add.ejs file to user
 */

app.get("/add", async (req, res) => {
    try {
        res.render("add"); // rendering add.ejs file when the user accesses the /add route.
    } catch (error) {
        res.status(500).send("Internal Server Error"); // if an error occurs, send a 500 status code.
    }
});

/**
 * When user requests the main page URL, render an index.ejs file to user
 */

app.get("/", async (req, res) => {
    try {
        const result = await Todo.find({}); // using Todo model to find all todo items in the DB.  
        res.render("index", { todoList: result }); // rendering index.ejs file and passing the todoList data to it.
    } catch (error) {
        res.status(500).send("Internal Server Error"); // if an error occurs, send a 500 status code.
    }
});

/**
 * Read API (C"R"UD API)
 * 
 * Check if all the goals and data can be displayed through webpage successfully.
 * 
 * Read all datas in DB
 */

app.get("/todo", async (req, res) => {
    try {
        const result = await Todo.find({}); // using Todo model to find all todo items in the DB.  
        res.render("error"); //render error.ejs file for a wrong URL typing unlike "/add", "/patch:id"
        /**
         * 
         * For checking all the goals saved in the DB
         * 
         * res.send({
         *  success: true,
         *  message: "Todo Lists Retrieved Successfully",
         *  data: result,
         * });
         */
    } catch (error) {
        res.render("error"); //render error.ejs file for a wrong URL typing unlike "/add", "/patch:id"
        /**
         * 
         * Sending fail message
         * 
         * res.send({
         *  success: false,
         *  message: "Failed to Retrieve Todo Lists",
         *  data: null,
         * });
         */
    }
});

/**
 * When user click "Edit" button, the request to the URL "/patch:todoId" is made
 */

app.get("/patch:todoId", async (req, res) => {
    const todoID = req.params.todoId; // get the todoId from the request URL.
    try {
        const result = await Todo.findById(todoID);
        res.render("patch", { todo : result }); // rendering patch.ejs file and passing the todo data to it.
    } catch (error) {
        res.status(500).send("Internal Server Error"); // if an error occurs, send a 500 status code.
    }
});

/**
 * Create API ("C"RUD API)
 * 
 * creating the new data with the user input, and post to the DB
 * 
 * requests are the details of the data
 */

app.post("/create-todo", async (req, res) => {
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
        res.status(500).send("Internal Server Error");
        console.log("Failed To Create Todo");
    }
});

/**
 * Checking if requested data with a specific id exists
 */

app.get("/:todoId", async (req, res) => {
    const todoID = req.params.todoId; // get a todo id from the requested URL
    try{
        const result = await Todo.findById(todoID);
        res.render("error"); //render error.ejs file for a wrong URL typing unlike "/add", "/patch:todoid"
        console.log("Retrieved successfully", result);
    } catch (error) {
        res.render("error"); //render error.ejs file for a wrong URL typing unlike "/add", "/patch:todoid"
    }
})


/**
 * Update the requested data with the new user input
 * 
 * (CR"U"D API)
 */

app.patch("/:todoId", async (req, res) => {
    const todoId = req.params.todoId; // get a todo id from the requested URL
    const updatedTodo = req.body; // get a updated version of todo from a request body
    try {
        /**
         *  Using the Todo model to find a todo item by its ID and update it with the new data from the request body.
         *  The { new: true } option ensures the updated document is returned.
         */
        const result = await Todo.findByIdAndUpdate(todoId, updatedTodo, { new: true });
        res.send({
            success: true,
            message: "Todo Updated Successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).send("Internal Server Error"); // if an error occurs, send a 500 status code.
        console.log("Failed to update todo"); // send an error message in console
    }
});

/**
 * Delete API (CRU"D" API)
 * 
 * Delete the requested data
 */

app.delete("/:todoId", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.todoId); // Delete the requested todo with a specific todoId from a URL
        res.send({
            success: true,
            message: "Todo is Deleted Successfully",
            data: null,
        });
    } catch (error) {
        res.status(500).send("Internal Server Error"); // if an error occurs, send a 500 status code.
        console.log("Failed To Delete todo"); //send error message in console
    }
})

/**
 * Use the value from the environment variable "port" if available, else, default to 3000.
 */
const port = process.env.port || 3000; 


/**
 * listening to a server with a following port, "listening on (port number)" will be showed in terminal
 * so I can know that the server's successfully opened.
 */

app.listen(port, function(){
    console.log(`listening on ${port}`); // Send the message in console if the server is opened successfully with the certain port number
});

