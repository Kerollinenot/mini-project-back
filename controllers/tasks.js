const db = require('../db');
const Tasks = db.tasks;
const {getErrorResponse} = require('../functions/getResponse');

async function getTasks(req, res, next) {
  const groupID = parseInt(req.params.groupID);
  try {
    const result = await Tasks.findAll({
      where: {
        group_id: groupID
      }
    });
    res.json(result);
  } catch (error) {
    getErrorResponse(res)
    next(error)
  }
}

module.exports = {
  getTasks,
};