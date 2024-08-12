const { where } = require('sequelize');
const db = require('../db');
const Tasks = db.tasks;
const checkToken = require('../functions/CheckToken').checkToken;
const getResponse = require('../functions/getResponse').getResponse

async function getTasks(req, res) {
  const groupID = parseInt(req.params.groupID);
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).send(getResponse(401));
    }

    checkToken(res , token)

    const result = await Tasks.findAll({
      where: {
        group_id: groupID
      }
    });
    res.json(result);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send(getResponse(500));
  }
}

module.exports = {
  getTasks,
};