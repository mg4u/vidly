const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {SECRET_KEY}=require('../configs/Config')


const VerifyToken = (req, res, next) => {
  	const { token } = req.query;
  	let headerToken = ''
  	const { headers: { authorization } } = req;

  	if(authorization && authorization.split(' ')[0] === 'Token') {
        headerToken = authorization.split(' ')[1];
    }
  	jwt.verify( token, SECRET_KEY, ( err, decoded ) => {
	    if ( err ) {
	    	res.status(401).send({error:'Unauthorized'})
	      	// 401 Unauthorized -- 'Incorrect token'
	    }
    	req.user = decoded.user;

    	next();
  	}); 
}

module.exports = {
 	VerifyToken
}