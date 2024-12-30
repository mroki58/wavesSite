const express = require('express')
const jwt = require('jsonwebtoken'); 
const bcryptjs = require('bcryptjs');

const db = require('../db_entry/model.js');

const router = express.Router();

const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';
let refreshTokens = [];

// Usuwa tokeny, których ważność się skończyła
setInterval(() => {
    const now = Date.now();
    refreshTokens.filter((token) => token.exp >= now);
}, 30 * 60 * 1000); 

router.post('/register', async (req,res) => {
    try{
        const {email, username, password} = req.body;

        // jeśli użytkownik istnieje to nie tworzymy nowego
        const select = db.prepare("SELECT email, username FROM users WHERE email = ? OR username = ?");
        const ans = select.all(email, username);

        if(ans.length != 0)
        {
            if(email == ans[0].email)
                return res.send(`Istnieje użytkownik o adresie email ${email}`);
            return res.send(`Nazwa użytkownika zajęta`);

        }

        // hashowanie hasła
        const salt_rounds = 10;
        const hashed_password = await bcryptjs.hash(password, salt_rounds);

        const insert = db.prepare('INSERT INTO users(email, username, password) VALUES (?, ?, ?)');
        insert.run(email, username, hashed_password);

        return res.send("Użytkownik zarejestrowany pomyślnie");

    }catch(err){
        res.status(500).send("Błąd bazy danych");
    }
})

router.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body;

        const select = db.prepare('SELECT user_id, password FROM users WHERE username = ?')
        const ans = select.all(username);

        if(ans.length == 0)
        {
            return res.status(401).send({msg: "Użytkownik nie istnieje!"});
        }


        const is_password_good = await bcryptjs.compare(password, ans[0].password);

        if (is_password_good) {
            // generate an access token
            const accessToken = jwt.sign({ username: username }, accessTokenSecret, { expiresIn: '10m' });
            const refreshToken = jwt.sign({ username: username }, refreshTokenSecret, {expiresIn: '2h'});

            refreshTokens.push({refreshToken: refreshToken, exp: Date.now() + 7200 * 1000});

            res.cookie('accessToken', accessToken, { maxAge: 10 * 60 * 1000 });
            res.cookie('refreshToken', refreshToken, {maxAge: 2 * 60 * 60 * 1000});
            res.cookie('user_id', user_id, { maxAge: 2 * 60 * 60 * 1000 });
            res.send({msg: 'Użytkownik zalogowany' });
        } else {
            res.status(401).send({msg: 'Nieprawidłowe dane logowania'});
        }
    }catch(err){
        res.status(500).send({msg: err.message});
    }
});

router.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username}, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
});

router.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t.refreshToken !== token);

    res.send("Logout successful");
});

module.exports = router;