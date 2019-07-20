// src/api/users

const UsersModel = require('../models/Users');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

class Users{
	constructor(){
		UsersModel.fill()
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

		res.send({message:'Data Saved',data:lastUser});
	}

	hashWord(word,salt){
		//return crypto.createHmac('sha512',salt).update(word).digest("hex");
		return crypto.createHmac('md5',salt).update(word).digest("base64");
		// return crypto.createHmac('md5',salt).update(word).digest("hex");
		// return crypto.MD5(word);
	}
}
module.exports= new Users