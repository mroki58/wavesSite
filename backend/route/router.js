const express = require('express')
const authMid = require('../utils/authMiddleware.js')

const db = require('../db_entry/model.js');

const router =  new express.Router();

router.use('/', authMid);

router.get('/', (req, res) => {

    const user_id = req.cookies.user_id;

    let select =  db.prepare("SELECT username FROM users WHERE user_id = ?");
    let ans = select.all(user_id);

    res.status(200).send(`hello ${ans[0].username}`);
});

module.exports = router;