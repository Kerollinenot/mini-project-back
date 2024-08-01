const express = require("express")
const cors = require("cors")
const config = require('./config');
const tasksRouter = require('./routes/tasksRouter')
const groupsRouter = require('./routes/groupsRouter')
const usersRouter = require('./routes/usersRouter')

const app = express();

app.use(express.json());
app.use(cors())

app.use('/tasks', tasksRouter)
app.use('/groups', groupsRouter)
app.use('/users', usersRouter)

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
