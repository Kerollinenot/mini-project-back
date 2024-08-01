const db = require('../db');
const Users = db.users;

async function checkToken (res, userId, token) {
    const user = await Users.findOne({
        where: {
          id: userId
        }
      });
  
      if (!user) {
        return res.status(404).send('User is not assigned');
      }
  
      if (user.token !== token) {
        return res.sendStatus(401);
      }
} 

module.exports = {
    checkToken
}