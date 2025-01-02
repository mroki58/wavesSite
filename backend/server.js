const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const router = require('./route/router.js');
const {routerAuth, refreshTokens} = require('./route/routerAuth.js')

const app = express()

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser())

app.use('/api', router);
app.use('/auth', routerAuth);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Serwer dziala na porcie ${PORT}`)
})