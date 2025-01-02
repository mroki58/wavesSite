const jwt = require('jsonwebtoken');

const { routerAuth, refreshTokens } = require('../route/routerAuth.js');

const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';

const authMid = (req, res, next) =>
{
    console.log('authmid')

    let refreshCookie = req.cookies.refreshToken;
    let accessCookie = req.cookies.accessToken;
    let user_id = req.cookies.user_id;

    if (!refreshCookie) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.clearCookie('user_id');
        return res.status(401).location(req.get('Referrer'));
    }

    let refreshToken = refreshTokens.find((el) => el.refreshToken == refreshCookie)

    if(!refreshToken || refreshToken.exp <= Date.now())
    {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.clearCookie('user_id');
        return res.status(401).location(req.get("Referrer"));
    }
    
    jwt.verify(accessCookie, accessTokenSecret, async (err, result) => {

        if (err) 
        {
            // tutaj musimy zmienić na werysikację refreshToken
            const accessToken = jwt.sign({ user_id: user_id }, accessTokenSecret, { expiresIn: '10m' });
            res.cookie('accessToken', accessToken, { maxAge: 10 * 60 * 1000, httpOnly: true, sameSite: 'Strict', domain: 'localhost' });
            return next();
        }

        return next();
    });
    
    


}

module.exports = authMid;