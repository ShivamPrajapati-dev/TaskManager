const express = require('express');
const app = express();
const userRouter = require('./router/user');
const taskRouter = require('./router/task');
const port = process.env.PORT||5000;
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);


app.listen(port,()=>{
  console.log("listening on port "+port);
})
