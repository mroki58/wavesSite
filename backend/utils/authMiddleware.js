const jwt = require('jsonwebtoken');

const { routerAuth, refreshTokens } = require('../route/routerAuth.js');

const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';

const authMid = (req, res, next) =>
{
    try{
        let refreshToken = req.cookies.refreshToken;
        let accessToken = req.cookies.accessToken;

        if (!accessToken && !refreshToken) {
            return res.status(401).send('Access Denied. No token provided.');
        }

        try {
            const decoded = jwt.verify(accessToken, accessTokenSecret);
            next();
        } catch (error) 
        {
            if (!refreshToken) {
                return res.status(401).send('Access Denied. No refresh token provided.');
            }

            try {
                const decoded = jwt.verify(refreshToken, refreshTokenSecret);
                const accessToken = jwt.sign({ user_id: decoded.user_id }, accessTokenSecret, { expiresIn: '30m' });
                res.cookie('accessToken', accessToken, {httpOnly: true, sameSite: 'strict'})
                next();
            } catch (error) {
                return res.status(400).send('Invalid Token.');
            }
        }
    }catch(err)
    {
        console.log(err.message);
    }
    
    
}

module.exports = authMid;