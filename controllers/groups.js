const db = require('../db');
const Groups = db.groups;
const checkToken = require('../functions/CheckToken').checkToken
const getResponse = require('../functions/getResponse').getResponse;

async function getGroups(req, res) {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send(getResponse(401));
    }

    checkToken(res, token)

    const groups = await Groups.findAll();
    res.json(groups);
  } catch (error) {
    console.log(error)
    res.status(500).send(getResponse(500));
  }
}

module.exports = {
  getGroups,
};