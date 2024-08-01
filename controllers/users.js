const db = require('../db');
const Users = db.users;
const Randomizer = require('@namopanda/random-generator');

async function getUsers(req, res) {
    try {
        const result = await Users.findAll();
        res.json(result);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function authorization(req, res) {
    try {
        const result = Users.findAll({
            where: {
                login: req.body.login,
            }
        });
        if (!result[0]) {
            res.status(400).send(JSON.stringify('Authorization failed'))
        } else {
            if (result[0].login === req.body.login && result[0].password === req.body.password) {
                const resBody = {
                    id: result[0].id,
                    login: result[0].login,
                    username: result[0].username,
                    token: result[0].token
                }
                res.status(202).send(JSON.stringify(resBody));
            } else {
                res.status(400).send(JSON.stringify('Authorization failed'));
            }
        }

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

async function registration(req, res) {
    if (!req.body) return res.sendStatus(400);
    if (!req.body.login || !req.body.password || !req.body.username) return res.status(400).json({ message: `Empty fields` })
    
    try {
        const result = await Users.findAll({
            where: {
                login: req.body.login,
            }
        });

        if (result[0]) {
            res.status(400).send(JSON.stringify('User is already exists'))
        } else {
            const token = Randomizer.generateRandomString(30);
            const resBody = {
                id: null,
                login: req.body.login,
                password: req.body.password,
                username: req.body.username,
                token: token,
            }

            const user = await Users.create(resBody)
            res.status(201).send(`User added with ID: ${user.null}`);
        }

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    getUsers,
    authorization,
    registration
};