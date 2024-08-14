const db = require('../db');
const { getUnauthorizedResponse } = require('../functions/getResponse');

async function authenticateUser(req, res, next) {
  const token = req.headers['authorization'];

  let isTokenCorrect = token ? await checkToken(token) : false

  if (isTokenCorrect) next()
  else return getUnauthorizedResponse(res);
}

async function checkToken (token) {
  const user = await db.users.findOne({
    where: {
      token: token
    }
  });

  return user ? true : false
} 

module.exports = {
    authenticateUser
}