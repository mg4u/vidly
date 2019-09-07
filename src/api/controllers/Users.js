// src/api/users

const UsersModel = require('../models/Users');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {SECRET_KEY}=require('../configs/Config')
const {HashWord}=require('../helpers/hashword')

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
		let hash = HashWord(originalPassword,salt)
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
		res.send({message:'Data Saved',data:{...lastUser,token}});
	}

	//

	Login (req, res){
		const {email,password:originalPassword}=req.body
		//check mondatary data is submitted
		if(!email||!originalPassword){
			res.status(400).send({error:'empty data'})
		}
		//check email is exists
		let checkData=UsersModel.checkData({email})

		if(!checkData.length){
			res.status(400).send({error:'Email not exists'})
		}
		const data=checkData[0]
		//check Password
		//create pasword
		const salt=data.password.split('$')[0]
		const password=data.password.split('$')[1]
		const hashedPassword=HashWord(originalPassword,salt)
		//comapre
		if(password!=hashedPassword){
			res.status(400).send({error:'wrond password'})
		}
		//create token to login
		const token = jwt.sign( { user: data}, SECRET_KEY, {expiresIn: 3600000} );
		// res.status(200).send({hashedPassword,password})
		res.send({message:'logged In success',data:{...data,token}});
	}

}

module.exports= new Users