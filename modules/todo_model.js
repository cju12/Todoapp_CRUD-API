import mongoose, {model, Schema} from 'mongoose'; // import mongoose and model from mongoose library

const todoSchema = new Schema({
    text: {type : String, required: true},
    priority: {type : String, required: true},
    deadline: {type : String, required: true},
});

export const Todo = mongoose.models.Todo || new model('Todo', todoSchema); // create a model named 'Todo' using the schema defined above,
//  or use the existing model if it already exists