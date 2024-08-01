const db = require('../db');
const Tasks = db.tasks;
const checkToken = require('../functions/CheckToken').checkToken;

async function getTasks(req, res) {
  try {
    const token = req.headers['access-token'];
    const userId = req.headers['user-id'];
    if (!token || !userId) {
      return res.status(400).send('Bad request');
    }

    checkToken(res, userId, token)

    const result = await Tasks.findAll();
    res.json(result);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  getTasks,
};