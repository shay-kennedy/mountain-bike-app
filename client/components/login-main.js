var React = require("react");
var actions = require('../redux/actions');
var connect = require('react-redux').connect;


var Login = React.createClass({
	fetchUser: function(e) {
		e.preventDefault();
		this.props.dispatch(actions.fetchUser());
	},
	render: function() {
		return (
			<div>
				<h1>MTB Trail Finder</h1>
				<form onSubmit={this.fetchUser}>
					<button type='submit'><a href="/auth/google">Login</a></button>
					<p>Please login with your Google credentials so that we can provide you with a better experience!</p>
				</form>
			</div>
		)
	}
});



var Container = connect()(Login);

module.exports = Container;