// test/all.js
var chai = require('chai');
var expect = chai.expect;
var All = require('./../src/all');
var all = new All();

describe('All', function() {
  it('get all movies should return 0 if no items in db', function() {
    expect(all.getCount()).to.equal(0);
  });
  it('get all movies should return 2 if 2 items in db', function() {
    all.addMovie('Hunger Games')
    all.addMovie('Brave Hurt')
    expect(all.getCount()).to.equal(2);
  });
  it('get all movies should return 1 if 1 items in db', function() {
    all.deleteMovie('Hunger Games')
    expect(all.getCount()).to.equal(1);
  });
  it('get all movies should return 1 if 1 items in db', function() {
    expect(all.updateMovie('Hunger Games','Hunger Games 2')).to.equal('Hunger Games 2')
  });
});