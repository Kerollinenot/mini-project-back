const db = require('../db');
const Groups = db.groups;
const checkToken = require('../functions/CheckToken').checkToken

async function getGroups(req, res) {
  try {
    const token = req.headers['access-token'];
    const userId = req.headers['user-id'];
    if (!token || !userId) {
      return res.status(400).send('Bad request');
    }

    checkToken(res, userId, token)

    const groups = await Groups.findAll();
    res.json(groups);
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  getGroups,
};