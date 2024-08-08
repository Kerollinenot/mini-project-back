const db = require('../db');
const Groups = db.groups;
const checkToken = require('../functions/CheckToken').checkToken

async function getGroups(req, res) {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send('User is unauthorized');
    }

    checkToken(res, token)

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