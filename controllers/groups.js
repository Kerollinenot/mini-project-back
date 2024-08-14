const db = require('../db');
const Groups = db.groups;

async function getGroups(req, res, next) {
  await Groups.findAll()
    .then(groups => res.json(groups))
    .catch(error => next(error));
}

module.exports = {
  getGroups,
};