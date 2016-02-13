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

describe('getPosterByMovieId()', function() {
  it('should get the correct poster image url by imdb id', function(done) {
    omdb.getPosterByMovieId('tt0078748', function(posterImage) {
      assert.equal('http://ia.media-imdb.com/images/M/MV5BMTU1ODQ4NjQyOV5BMl5BanBnXkFtZTgwOTQ3NDU2MTE@._V1_SX1400.jpg', posterImage);
      done();
    });
  });
});

describe('searchForMovie()', function() {
  it('should get the correct search results', function(done) {
    omdb.searchForMovie('Aliens', {}, function(queryResults) {
      var parsedResults = JSON.parse(queryResults);
      assert(parsedResults.Response);
      assert.equal('tt0090605', parsedResults.Search[0].imdbID);
      done();
    });
  });
});