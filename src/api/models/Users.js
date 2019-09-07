// src/api/users
const fs = require('fs');
const {UsersDBFile}=require('../configs/Config')

function Users () {
	this.users=[]
	const dataInDB= getUsersFromDB()
	if(dataInDB){
		this.users=JSON.parse(dataInDB)
	}
}

Users.prototype.addUser = function(user) {
	insertIntoDB(user)
	return this.users.push(user)
};

Users.prototype.lastUser = function() {
	return this.users.pop()
};

Users.prototype.deleteUser = function(user) {
	return this.users.splice(this.users.indexOf(user),1)
};

Users.prototype.updateUser = function(user,newUser) {
	var index=this.users.indexOf(user)
	this.users[index]=newUser
	return this.users[index]
};

Users.prototype.list = function() {
	return this.users
};

Users.prototype.getCount = function() {
	return this.users.length
};

Users.prototype.checkData = function(user) {
	const {name,email}=user
	// console.warn(user,this.users)
	const nameExist=this.users.filter((row)=>{
		// console.warn('row',row)
		return ( (name && row.name==name) || (email && row.email==email) )
	})
	// console.warn('nameExist',nameExist)
	return nameExist
};

Users.prototype.fill = function() {
	var usersData = [
	    { name: 'Holly', email: 'holly@scotch.io', avatar: 'http://placekitten.com/300/300'},
	    { name: 'Chris', email: 'chris@scotch.io', avatar: 'http://placekitten.com/400/400'},
	    { name: 'Ado', email: 'Ado@scotch.io', avatar: 'http://placekitten.com/500/500'},
	    { name: 'Samantha', email: 'Samantha@scotch.io', avatar: 'http://placekitten.com/700/700'}
	];

	this.users=this.users.concat(usersData)
	// this.users.map((row)=>{
		insertIntoDB(this.users)
	// })
	// return;
	let {users} =this
	// console.warn(this.users)
};
module.exports= new Users


function insertIntoDB (row) {
	// console.warn('user',row)
	let user=row.constructor=='Array'?row:[row]
	console.warn((row.constructor==Array),'user',user)
	fs.readFile(UsersDBFile, 'utf8', function readFileCallback(err, data){
	    if (err){
	        console.log(err);
			fs.writeFile(UsersDBFile, JSON.stringify(user), 'utf8', ()=>{});
	    } else {
	        // console.log('data',data,user);
	        if(!data){
	        	fs.writeFile(UsersDBFile, JSON.stringify(user), 'utf8', ()=>{});
	    		return
	        }

		    let obj = JSON.parse(data); //now it an object
		    obj=obj.concat(user); //add some data
		    console.log('obj',obj)
		    data = JSON.stringify(obj); //convert it back to data
		    fs.writeFile(UsersDBFile, data, 'utf8', ()=>{}); // write it back 
		}
	});
}

function getUsersFromDB () {
	let dataInDB=fs.readFileSync(UsersDBFile, 'utf8', function readFileCallback(err, data){
		console.log('data reads')
		return data
	});
	return dataInDB
}