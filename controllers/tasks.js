const db = require('../db');
const Tasks = db.tasks;
const checkToken = require('../functions/CheckToken').checkToken;

async function getTasks(req, res) {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).send('Bad request');
    }

    checkToken(res , token)

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