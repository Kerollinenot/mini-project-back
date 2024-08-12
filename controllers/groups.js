const db = require('../db');
const Groups = db.groups;
const {getErrorResponse} = require('../functions/getResponse');

async function getGroups(req, res, next) {
  try {
    throw new Error('easdasd')
    const groups = await Groups.findAll();
    res.json(groups);
  } catch (error) {
    getErrorResponse(res)
    next(error)
  }
}

module.exports = {
  getGroups,
};