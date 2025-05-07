import mongoose, {model, Schema} from 'mongoose'; // import mongoose and model from mongoose library

/**
 * Using Schema in MongoDB to save an user input "text", "priority" and "deadline" as JSON data format
 * 
 * Schema is a JSON object that define the structure and contents of users' data from MongoDB
 * 
 * Model is a constructor function from a schema, which represents the collection of the database, as well as providing the interface
 * for the interaction with DB datas. (i.e CRUD operation (method of Create, Read, Update, and Delete))
 * 
 */

const todoSchema = new Schema({
    text: {type : String, required: true},
    priority: {type : String, required: true},
    deadline: {type : String, required: true},
});

/**
 * Create a model named "Todo" using the schema defined above (const todoSchema)
 * 
 * Or, use the existing model if it already exists
 * 
 */

export const Todo = mongoose.models.Todo || new model('Todo', todoSchema);