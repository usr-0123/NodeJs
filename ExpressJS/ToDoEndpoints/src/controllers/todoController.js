import { paginate, sendServerError, sendNotFound, sendCreated,sendDeleteSuccess,orderData,checkIfValuesIsEmptyNullUndefined } from "../helper/helperFunctions.js";
import data from "../data/data.json" assert { type: "json" };
import {todoValidator} from "../validators/todoValidator.js";

export const getTodos = async (req, res) => {
  try {
    if (data.length === 0) {
      sendNotFound(res, "No todos found");
    } else {
      if (!req.query.limit && !req.query.page) {
        if (req.query.order) {
          res.status(200).json(orderData(data, req.query.order));
        } else {
          res.status(200).json(data);
        }
      } else {
        if (req.query.order) {
          paginate(orderData(data, req.query.order), req, res);
        } else {
          paginate(data, req, res);
        }
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getTodoById = async (req, res) => {
    try{
        const todo = data.find(todo => todo.id == req.params.id);
        if (!todo) {
            sendNotFound(res, 'Todo not found');
        } else {
            res.status(200).json(todo);
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
}

export const CreateTodo = async (req, res) => {
  const {title, completed} = req.body;
  const {error} = todoValidator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    try {
        const newTodo = {
            id: data.length + 1,
            title: title,
            completed: completed
        }
        data.push(newTodo);
        sendCreated(res, 'Todo created successfully');
    } catch (error){
        sendServerError(res, error.message);
    }
  }
};

export const completeTodo = async (req, res) => {
  try{
    const todo = data.find(todo => todo.id == req.params.id);
    if (!todo) {
        sendNotFound(res, 'Todo not found');
    } else {
        console.log (req)
        todo.completed = req.body.completed;
        sendCreated(res, 'Todo completed successfully');
    }
  }
  catch (error){
    sendServerError(res, error.message);
  }
};

export const deleteTodo = async (req, res) => {
  try{
    const todo = data.find(todo => todo.id == req.params.id);
    if (!todo){
        sendNotFound(res, 'Todo not found');
    } else {
        data.splice(data.inddexOf(todo), 1);
        sendDeleteSuccess(res, 'Todo with id: ${todo.id} was deleted successfully');
    }
  }
  catch{
    sendServerError(res, error.message);
  }
};

export const updateTodo = async (req, res) => {
  try{
    const todo = data.find(todo => todo.id == req.params.id);
    if(!todo) {
        sendNotFound (res, 'Todo not found');
    } else {
        if (checkIfValuesIsEmptyNullUndefined (req, res, req.body)){
            if(req.body.title) {
                todo.title = req.body.title;
            }
            if (req.body.completed) {
                todo.completed = req.body.completed;
            }
            sendCreated(res, 'Todo updated successfully');
        } else {
            sendServerError (res, 'Please provide a title or completed field')
        }
    }
  } catch{
    sendServerError (res, error.message);
  }
};
