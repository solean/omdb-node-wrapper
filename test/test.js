var omdb = require('../omdb');
var assert = require('assert');

// TESTING (using mocha)

describe('getMovieByTitle()', function() {
  it('should get the correct movie data by title', function(done) {
    omdb.getMovieByTitle('Zodiac', {}, function(movieData) {
      var parsedData = JSON.parse(movieData);
      assert.equal('Zodiac', parsedData.Title);
      assert.equal('David Fincher', parsedData.Director);
      assert.equal('157 min', parsedData.Runtime);
      done();
    });
  });

  it('should correctly apply additional params', function(done) {
    omdb.getMovieByTitle('Zodiac', {
      type: 'movie',
      year: 2007,
      plotLength: 'full',
      dataType: 'json',
      tomatoes: true
    }, function(movieData) {
      var parsedData = JSON.parse(movieData);
      assert.equal('Zodiac', parsedData.Title);
      assert.equal('David Fincher', parsedData.Director);
      assert.equal(true, !!parsedData.tomatoReviews);
      done();
    });
  });
});

describe('getMovieById()', function() {
  it('should get the correct movie data by imdb id', function(done) {
    omdb.getMovieById('tt0078748', {}, function(movieData) {
      var parsedData = JSON.parse(movieData);
      assert.equal('Alien', parsedData.Title);
      assert.equal('Ridley Scott', parsedData.Director);
      assert.equal('117 min', parsedData.Runtime);
      done();
    });
  });

  it('should correctly apply additional params', function(done) {
    omdb.getMovieById('tt0078748', {
      type: 'movie',
      year: 1979,
      plotLength: 'full',
      dataType: 'json',
      tomatoes: true
    }, function(movieData) {
      var parsedData = JSON.parse(movieData);
      assert.equal('Alien', parsedData.Title);
      assert.equal('Ridley Scott', parsedData.Director);
      assert.equal(true, !!parsedData.tomatoReviews);
      done();
    });
  });
});

describe('searchForMovie()', function() {
  it('should get the correct search results', function(done) {
    omdb.searchForMovie('Aliens', {}, function(queryResults) {
      var parsedResults = JSON.parse(queryResults);
      assert(parsedResults.Response);
      assert.equal(187, parsedResults.totalResults);
      assert.equal('tt0090605', parsedResults.Search[0].imdbID);
      done();
    });
  });
});