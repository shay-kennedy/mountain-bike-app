var React = require("react");
var connect = require('react-redux').connect;
var actions = require('../redux/actions');
	
var Input = React.createClass({
	onFormSubmit: function(event){
		event.preventDefault();

		// Grabs the value from the input on submit
		var location = this.refs.location.value;
		console.log('LOCATION ', location);
		
		// Dispatched action to get trails based on user input
		this.props.dispatch(actions.getTrails(location));
		
		// Clears the value on Submit
		this.refs.location.value = '';
	},
	render: function(){
	return (
		<div>
			<form onSubmit={this.onFormSubmit}>
				<input placeholder='Enter City and State' ref="location" />
				<span>
					<button type='submit'>Search</button>
				</span>
			</form>
		</div>
	);
}});

var mapStateToProps = function(state, props) {
	return {
		id: state.googleID,
		question: state.question,
		score: state.score
	} 
}

var Container = connect(mapStateToProps)(Input);

module.exports = Container;