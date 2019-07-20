// src/api/users

function Users () {
	this.users=[]
}

Users.prototype.addUser = function(user) {
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
		return (row.name==user.name||row.email==user.email)
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
	// console.warn(this.users)
};
module.exports= new Users