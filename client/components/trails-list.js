var React = require("react");
var connect = require('react-redux').connect;
var actions = require('../redux/actions');
var Input = require('./input');


var TrailsList = React.createClass({
	
	render: function(props) {
		console.log('HERE', this.props.trails);
		return (
			<div>
				{this.props.trails}
			</div>
		)
	}
});

var mapStateToProps = function(state, props) {
	return {
		trails: state.trails,
	} 
}

var Container = connect(mapStateToProps)(TrailsList);

module.exports = Container;

