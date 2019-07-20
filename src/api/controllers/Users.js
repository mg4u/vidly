// src/api/users

const UsersModel = require('../models/Users');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {SECRET_KEY}=require('../configs/Config')


class Users{
	constructor(){
		// UsersModel.fill()
		// console.warn('SECRET_KEY',SECRET_KEY)
	}

	Insert (req, res){
		const {name,email,password:originalPassword}=req.body

		//check mondatary data is submitted
		if(!name||!email||!originalPassword){
			res.status(400).send({error:'empty data'})
		}

		// Hash Passowrd
		let salt = crypto.randomBytes(16).toString('base64');
		let hash = this.hashWord(originalPassword,salt)
		req.body.password = salt + "$" + hash;
		req.body.permissionLevel = 1;

		//check name or email is not exists
		let checkData=UsersModel.checkData({name,email})
		if(checkData.length){
			res.status(400).send({error:'data exists'})
		}
		//Insert into DB
		UsersModel.addUser(req.body)
		const lastUser=UsersModel.lastUser()
		
		// res.render('pages/about', { users: users });

		//Login check Login
		//create token to login
		const token = jwt.sign( { user: lastUser}, SECRET_KEY, {expiresIn: 3600000} );
		let decodedUser={}
		jwt.verify( token, SECRET_KEY, ( err, decoded ) => {
		    if ( err ) {
		      // 401 Unauthorized -- 'Incorrect token'
		      res.status(400).send({err})
		    }
		    decodedUser = decoded.user;

		});

		res.send({message:'Data Saved',data:{...lastUser,token,decodedUser}});
	}

	hashWord(word,salt){
		//return crypto.createHmac('sha512',salt).update(word).digest("hex");
		return crypto.createHmac('md5',salt).update(word).digest("base64");
		// return crypto.createHmac('md5',salt).update(word).digest("hex");
		// return crypto.MD5(word);
	}

	checkHashWord(word){
		const wordParts=word.split('$')
		const salt=wordParts[0]

		//return crypto.createHmac('sha512',salt).update(word).digest("hex");
		return crypto.createHmac('md5',salt).update(word).digest("base64");
		// return crypto.createHmac('md5',salt).update(word).digest("hex");
		// return crypto.MD5(word);
	}
}
module.exports= new Users