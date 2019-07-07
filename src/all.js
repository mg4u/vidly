function All () {
	this.movies=[]
}

All.prototype.addMovie = function(movie) {
	return this.movies.push(movie)
};

All.prototype.deleteMovie = function(movie) {
	return this.movies.splice(this.movies.indexOf(movie),1)
};

All.prototype.updateMovie = function(movie,newMovie) {
	var index=this.movies.indexOf(movie)
	this.movies[index]=newMovie
	return this.movies[index]
};

All.prototype.getCount = function() {
	return this.movies.length
};

module.exports= All