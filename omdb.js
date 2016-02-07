var request = require('request');

var BASE_URL = 'http://www.omdbapi.com/?';


/*
 * Helper to generate a url for getting a movie
 * @param idOrTitle - Required. 'i' or 't' for Id or Title
 * @param value - Required. Either the ID value or Title value
 * @param params - Optional, additional parameters (type, year, plotLength, dataType, tomatoes)
 */
function generateUrl(idOrTitle, value, params) {
  var url = BASE_URL;
  if (idOrTitle === '' || (idOrTitle !== 'i' && idOrTitle !== 't')) {
    // invalid params
    return null;
  }
  url += idOrTitle + '=' + value;
  if (params.type) {
    url += '&type=' + params.type;
  }
  if (params.year) {
    url += '&y=' + params.year;
  }
  if (params.plotLength) {
    url += '&plot=' + params.plotLength;
  }
  if (params.dataType) {
    url += '&r=' + params.dataType;
  }
  if (params.tomatoes) {
    url += '&tomatoes=' + params.tomatoes;
  }
  return url;
}

/*
 * Helper to generate a url for a search query
 * @param query - user's search query
 * @param params - Optional, additional parameters (type, year, dataType, page)
 */
function generateSearchUrl(query, params) {
  var url = BASE_URL + 's=' + query;
  if (params.type) {
    url += '&type=' + params.type;
  }
  if (params.year) {
    url += '&y=' + params.year;
  }
  if (params.dataType) {
    url += '&r=' + params.dataType;
  }
  if (params.page) {
    url += '&page=' + params.type;
  }
  return url;
}

/*
 * Helper to make api calls using request
 * @param url - The url to pass to request
 * @param successCallback - Function to pass data to on success
 * @param errorCallback - Function to call if the request fails
 */
function makeRequest(url, successCallback, errorCallback) {
  request(url, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      successCallback(body);
    } else {
      errorCallback(err, res, body);
    }
  });
}

/*
 * Get movie data by title
 * @param title - must be exact match
 * @param params - Object with additional params
 * @param callback - function to receive data
 */
function getMovieByTitle(title, params, callback) {
  var url = generateUrl('t', title, params);

  makeRequest(url, function(data) {
    callback(data);
  }, function(err) {
    console.log(err);
  });
}
module.exports.getMovieByTitle = getMovieByTitle;

/*
 * Get movie data by id
 * @param id - IMDB Movie ID
 * @param params - Object with additional params
 * @param callback - function to receive data
 */
function getMovieById(id, params, callback) {
  var url = generateUrl('i', id, params);

  makeRequest(url, function(data) {
    callback(data);
  }, function(err) {
    console.log(err);
  });
}
module.exports.getMovieById = getMovieById;

/*
 * Search for movie
 * @param query - Search query
 * @param params - Object with additional params
 * @param callback - function to receive data
 */
function searchForMovie(query, params, callback) {
  var url = generateSearchUrl(query, params);

  makeRequest(url, function(data) {
    callback(data);
  }, function(err) {
    console.log(err);
  });
}
module.exports.searchForMovie = searchForMovie;
