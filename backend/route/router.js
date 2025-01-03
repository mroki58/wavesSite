const express = require('express')
const authMid = require('../utils/authMiddleware.js')

const db = require('../db_entry/model.js');

const router =  new express.Router();

router.use('/', authMid);

// zwraca informacje użytkownika
// zwraca text
router.get('/info', (req, res) => {

    const user_id = req.cookies.user_id;

    let select =  db.prepare("SELECT username FROM users WHERE user_id = ?");
    let ans = select.all(user_id);

    res.status(200).send(`Witaj ${ans[0].username}!`);
});

// dodaje nowe ustawienie | sprawdza czy nowa nazwa nie jest taka sama jak stara
// zwraca wiadomość
router.post('/settings', (req, res) => {

    const user_id = parseInt(req.cookies.user_id);

    let select = db.prepare("SELECT setting_id FROM settings WHERE user_id = ? AND setting_name = ?");
    let ans = select.all(user_id, req.body.setting_name);

    if(ans.length > 0)
    {
        return res.status(409).send(`Isnieje już ustawienie o nazwie ${req.body.setting_name}. Użyj innej nazwy! `);
    }

    for(const key in req.body)
    {
        if(key != 'setting_name')
        {
            req.body[key] = parseFloat(req.body[key]);
        }
    }

    let insert = db.prepare("INSERT INTO settings(user_id, setting_name, d, f1, f2, a1, a2) VALUES (?, ?, ?, ?, ? ,?, ?)")
    const { setting_name, d, f1, f2, a1, a2 } = req.body;
    insert.run(user_id, setting_name, d, f1, f2, a1, a2);

    return res.status(200).send(`Stworzono nowe ustawienie ${req.body.setting_name}`);

});

// pobiera wszystkie ustawienia
// zwraca tablicę
router.get('/settings', (req, res) => {
    const user_id = req.cookies.user_id;

    let select = db.prepare("SELECT setting_id ,setting_name, d, f1, f2, a1, a2 FROM settings WHERE user_id = ? ")
    let ans = select.all(user_id);

    return res.status(200).send(ans);

});

// pobiera dane dla jednej konfiguracji
router.get('/settings/:id', (req, res) => {
    const user_id = req.cookies.user_id;
    const id = req.params.id;

    let select = db.prepare("SELECT d, f1, f2, a1, a2 FROM settings WHERE user_id = ? AND setting_id = ?")
    let ans = select.all(user_id, id);

    return res.status(200).send(ans[0]);
})

module.exports = router;