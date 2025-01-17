const jwt = require('jsonwebtoken');
require('dotenv').config()

const { routerAuth, refreshTokens } = require('../route/routerAuth.js');

const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

const authMid = (req, res, next) =>
{
    try{
        let refreshToken = req.cookies.refreshToken;
        let accessToken = req.cookies.accessToken;

        if (!accessToken && !refreshToken) {
            return res.status(401).json(false);
        }

        try {
            const decoded = jwt.verify(accessToken, accessTokenSecret);
            next();
        } catch (error) 
        {
            if (!refreshToken) {
                return res.status(401).json(false);
            }

            try {
                if(!refreshTokens.find(item => item.refreshToken == refreshToken))
                {
                    return res.status(401).json(false);
                }

                const decoded = jwt.verify(refreshToken, refreshTokenSecret);
                const accessToken = jwt.sign({ user_id: decoded.user_id }, accessTokenSecret, { expiresIn: '5m' });
                res.cookie('accessToken', accessToken, {httpOnly: true, sameSite: 'strict'})
                next();
            } catch (error) {
                return res.status(400).json(false);
            }
        }
    }catch(err)
    {
        console.log(err.message);
    }
    
    
}

module.exports = authMid;