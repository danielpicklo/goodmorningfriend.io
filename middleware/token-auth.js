const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    //get token from header
    const token = req.header('x-auth-token');

    //check if no token
    if(!token){
        return res.status(401).json({ message: 'You are not authorized to access this', missing: 'Token' });
    }

    //verify token
    try{
        const decoded = jwt.verify(token, config.get('secret'));
        req.user = decoded.user;
        next();
    }catch(error){
        return res.status(403).json({ message: `You are not authorized to access this. Invalid token: ${token}` });
    }
}