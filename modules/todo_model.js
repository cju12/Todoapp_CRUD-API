import mongoose, {model, Schema} from 'mongoose'; // mongoose 모듈을 불러옵니다.

const todoSchema = new Schema({
    text: {type : String, required: true},
    priority: {type : String, required: true},
    deadline: {type : String, required: true},
});

export const Todo = mongoose.models.Todo || new model('Todo', todoSchema); // Todo 모델을 생성합니다. 이미 존재하는 경우에는 기존 모델을 사용합니다.
// Todo 모델을 exports 객체에 추가합니다.