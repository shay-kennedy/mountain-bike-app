var actions = require('./actions');
var update = require('react-addons-update');

var initialState = {
	trails: null,
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
	}
	return state;	
};


exports.reducer = reducer;