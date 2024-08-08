const db = require('../db');
const Users = db.users;
const bcrypt = require('bcrypt');
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
        const result = await Users.findAll({
            where: { login: req.body.login },
        });

        if (!result.length) {
            return res.status(401).json({ message: 'Авторизация не удалась' });
        }

        const user = result[0];
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (isPasswordValid) {
            const resBody = {
                id: user.id,
                login: user.login,
                username: user.username,
                token: user.token,
            };
            return res.status(202).json(resBody);
        } else {
            return res.status(401).json({ message: 'Authorization failed' });
        }

    } catch (error) {
        console.error('Error during authorization:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function registration(req, res) {
    if (!req.body) return res.sendStatus(400);
    if (!req.body.login || !req.body.password || !req.body.username) return res.status(400).json({ message: `Empty fields` })

    try {
        const existingUser = await Users.findAll({
            where: { login: req.body.login },
        });

        if (existingUser.length) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const token = Randomizer.generateRandomString(30);
        const newUser = {
            id: null,
            login: req.body.login,
            password: hashedPassword,
            username: req.body.username,
            token: token,
        }

        const user = await Users.create(newUser)

        res.status(201).send({
            id: user.null,
            login: user.login,
            username: user.username,
            token: user.token
        });


    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    getUsers,
    authorization,
    registration
};