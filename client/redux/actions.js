require('isomorphic-fetch');
var Cookies = require("js-cookie");


var FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
var fetchUserSuccess = function(user, score, answer) {
  return {
    type: FETCH_USER_SUCCESS,
    user: user,
    score: score,
    answer: answer
  };
};

var FETCH_USER_ERROR = 'FETCH_USER_ERROR';
var fetchUserError = function(error) {
  return {
    type: FETCH_USER_ERROR,
    error: error
  };
};

var FETCH_TRAILS_SUCCESS = 'FETCH_TRAILS_SUCCESS';
var fetchTrailsSuccess = function(trails) {
  return {
    type: FETCH_TRAILS_SUCCESS,
    trails: trails
  };
};

var FETCH_TRAILS_ERROR = 'FETCH_TRAILS_ERROR';
var fetchTrailsError = function(error) {
  return {
    type: FETCH_TRAILS_ERROR,
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

var putData = function(user, score, userId) {
  console.log('before put', user)
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    console.log("putdata");
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

var getTrails = function(location) {
  console.log('Location', location);
  return function(dispatch) {
    // console.log('LOC', location);
    // var cityAndRest = location.split(',');
    // var city = cityAndRest[0];
    // var stateAndZip = cityAndRest[1].trim().split(' ');
    // var state = stateAndZip[0];
    // var zip = stateAndZip[1];
   
    // return fetch("https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=mountain+biking&q[city_cont]=Phoenix&q[state_cont]=Arizona&radius=25",
    //   {
    //     method: 'get',
    //     headers: {'Content-type': 'application/json', 'X-Mashape-Key': 'Njf9yX0QmImshN5LtDdUS9MQcM68p1BVQxqjsna4e89QJjc3NI'}
    //   }
    // )

    var url = 'http://localhost:8080/trails';
    return fetch(url, {headers: headers}).then(function(response) {
      if (response.status < 200 || response.status >= 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(trails) {
        console.log("TRAILS", trails);
      return dispatch(
        fetchTrailsSuccess(trails)
      );
    })
    .catch(function(error) {
      return dispatch(
        fetchTrailsError(error)
      );
    });
  }
};

exports.fetchUser = fetchUser;
exports.fetchUserSuccess = fetchUserSuccess;
exports.fetchUserError = fetchUserError;
exports.FETCH_USER_SUCCESS = FETCH_USER_SUCCESS;
exports.FETCH_USER_ERROR = FETCH_USER_ERROR;
exports.putData = putData;
exports.getTrails = getTrails;
exports.fetchTrailsSuccess = fetchTrailsSuccess;
exports.fetchTrailsError = fetchTrailsError;
exports.FETCH_TRAILS_SUCCESS = FETCH_TRAILS_SUCCESS;
exports.FETCH_TRAILS_SUCCESS = FETCH_TRAILS_SUCCESS;
