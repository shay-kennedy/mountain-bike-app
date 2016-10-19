require('isomorphic-fetch');
var Cookies = require("js-cookie");


var FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
var fetchUserSuccess = function(user, score, answer) {
  return {
    type: FETCH_USER_SUCCESS,
    user: user
  };
};

var FETCH_USER_ERROR = 'FETCH_USER_ERROR';
var fetchUserError = function(error) {
  return {
    type: FETCH_USER_ERROR,
    error: error
  };
};

var GET_TRAILS_SUCCESS = 'GET_TRAILS_SUCCESS';
var getTrailsSuccess = function(trails) {
  return {
    type: GET_TRAILS_SUCCESS,
    trails: trails
  };
};

var GET_TRAILS_ERROR = 'GET_TRAILS_ERROR';
var getTrailsError = function(error) {
  return {
    type: GET_TRAILS_ERROR,
    error: error
  };
};

var fetchUser = function() {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    console.log(token);
  	var headers = new Headers({
  		Authorization: 'bearer ' + token
  	});
    var url = 'http://localhost:8080/user';
    return fetch(url, {headers: headers}).then(function(response) {
      if (response.status < 200 || response.status >= 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(user) {
        console.log("USER", user);
      return dispatch(
        fetchUserSuccess(user)
      );
    })
    .catch(function(error) {
      return dispatch(
        fetchUserError(error)
      );
    });
  }
};

var getTrails = function(location) {
  // console.log('Location', location);
  return function(dispatch) {
    var cityAndRest = location.split(',');
    var city = cityAndRest[0];
    var stateAndZip = cityAndRest[1].trim().split(' ');
    var state = stateAndZip[0];
    var zip = stateAndZip[1];
    // console.log('CITY', city, 'STATE', state);
    var url = `http://localhost:8080/trails/${city}/${state}`;
    return fetch(url)
    .then(function(response) {
      if (response.status < 200 || response.status >= 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(trails) {
        // console.log("TRAILS", trails);
      return dispatch(
        getTrailsSuccess(trails)
      );
    })
    .catch(function(error) {
      return dispatch(
        getTrailsError(error)
      );
    });
  }
};

var updateFavorites = function(props) {
  console.log('ACTION SIDE PROPS', props)
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = 'http://localhost:8080/user/'+userId;
  return fetch(url,
  {
    method: 'put',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
        user: user,
        score: score
    })
  }
    ).then(function(response) {
      if(response.status < 200 || response.status > 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(user) {
      console.log('Data', user)
      return dispatch(
        fetchUserSuccess(user, score)
        );
    })
    .catch(function(error) {
      return dispatch(
        fetchUserError(error)
        );
    });
  }
};



exports.fetchUser = fetchUser;
exports.fetchUserSuccess = fetchUserSuccess;
exports.fetchUserError = fetchUserError;
exports.FETCH_USER_SUCCESS = FETCH_USER_SUCCESS;
exports.FETCH_USER_ERROR = FETCH_USER_ERROR;
exports.getTrails = getTrails;
exports.getTrailsSuccess = getTrailsSuccess;
exports.getTrailsError = getTrailsError;
exports.GET_TRAILS_SUCCESS = GET_TRAILS_SUCCESS;
exports.GET_TRAILS_ERROR = GET_TRAILS_ERROR;
exports.updateFavorites = updateFavorites;
