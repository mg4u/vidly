const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {SECRET_KEY}=require('../configs/Config')


const verifyToken = (req, res, next) => {
  	const token = req.query.token;
  	jwt.verify( token, SECRET_KEY, ( err, decoded ) => {
	    if ( err ) {
	    	res.status(401).send('Unauthorized')
	      	// 401 Unauthorized -- 'Incorrect token'
	    }
    	req.user = decoded.user;

    	next();
  	}); 
}

module.exports = {
 	verifyToken
}