var React = require("react");
var connect = require('react-redux').connect;
var actions = require('../redux/actions');
var Input = require('./input');


var TrailsList = React.createClass({
	render: function() {
		return (
			<div>
				Render list of trails from API here
			</div>
		)
	}
});

var mapStateToProps = function(state, props) {
	return {
		id: state.userId,
		trails: state.trails,
	} 
}

var Container = connect(mapStateToProps)(TrailsList);

module.exports = Container;

