var actions = require('./actions');
var update = require('react-addons-update');

var initialState = {
	trails: {places:[]},
	favorites: null,
	googleID: null
};

var reducer = function(state, action) {
	state = state || initialState;
	switch (action.type) {
		
		case actions.FETCH_USER_SUCCESS:
			console.log('FETCH_USER_SUCCESS');
			var user = action.user[0];
			state = Object.assign({}, state, {
				favorites: user.favorites,
				googleID: user.googleID
			});
			return state;
		
		case action.FETCH_USER_ERROR:
			console.log('FETCH_USER_ERROR');
			return state;
		
		case actions.GET_TRAILS_SUCCESS:
			console.log('GET_TRAILS_SUCCESS');
			// console.log('TRAILS FROM REDUCER', action.trails);
			var trails = action.trails;
			state = Object.assign({}, state, {
				trails: trails,
			});
			console.log('STATE', state);
			return state;

		case action.GET_TRAILS_ERROR:
			console.log('GET_TRAILS_ERROR');
			return state;
	
	}
	return state;	
};


exports.reducer = reducer;