const db = require('../db');
const Tasks = db.tasks;

async function getTasks(req, res, next) {
  const groupID = parseInt(req.params.groupID);

  await Tasks.findAll({
    where: {
      group_id: groupID
    }
  })
  .then(tasks => res.json(tasks))
  .catch(error => next(error));
}

module.exports = {
  getTasks,
};