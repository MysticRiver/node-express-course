const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1/tasks', tasks)      // Routes placed before error handling
app.use(notFound)                    // Error handling middleware placed after routes
app.use(errorHandlerMiddleware)



//routes
app.use('/api/v1/tasks', tasks)

//app.get('/api/v1/tasks')               
//app.post('/api/v1/tasks')               - create a new tasks
//app.get('/api/v1/tasks/:id')            - get a single task
//app.patch('/api/v1/tasks/:id')                - get all the tasks
//app.delete('/api/v1/tasks/:id')                - get all the tasks




const port = process.env.PORT || 3023;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start()
