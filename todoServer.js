
const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

app.use(bodyParser.json());
const todos = [];


app.get('/todos' ,(req,res)=>{
  res.json(todos);
})

app.post('/todos', (req,res)=>{
  const newTodo ={
    id : Math.floor(Math.random() * 1000),
    title : req.body.title,
    description : req.body.description
  };
  todos.push(newTodo);
  console.log(newTodo);
  res.status(200).json(newTodo);

  

})
app.get('/todos/id',(req,res)=>{
  const todoId = todos.map(todo => todo.id);
  const obj = {
    "id" : todoId
  }
  res.status(200).json(obj);

})


app.put('/todos/:id',(req,res)=>{
  const todoIndex = todos.findIndex(todo => todo.id == parseInt(req.params.id));
  if(todoIndex == -1){
    res.status(401).send("Index does not exist")
  }else{
    todos[todoIndex].title  = req.body.title;
    todos[todoIndex].description = req.body.descrption;
    res.json(todos[todoIndex]);
  }

})



app.delete('/todos/id',(req,res)=>{
  const todoIdtodelete = parseInt(req.params.id);
  const todoIndex = todos.find((todo)=> todo.id == todoIdtodelete);
  if(todoIndex == -1){
    res.status(401).send("Index does not exist")
  }
  const deletedTodo = todos.splice(todoIndex , 1);
  res.status(200).json({message : "The ToDo item has been deleted successfully" , deletedTodo});

})

app.listen(port,()=>{
  console.log(`this server is running on port ${port}`);
})

module.exports = app;
