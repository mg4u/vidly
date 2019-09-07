const crypto = require('crypto');

const HashWord=(word,salt)=>{
	//return crypto.createHmac('sha512',salt).update(word).digest("hex");
	return crypto.createHmac('md5',salt).update(word).digest("base64");
	// return crypto.createHmac('md5',salt).update(word).digest("hex");
	// return crypto.MD5(word);
}
module.exports={
	HashWord
}
