var React = require("react");
var actions = require('../redux/actions');
var connect = require('react-redux').connect;
var TrailsMain = require('./main-trails');



var TrailDetail = React.createClass ({			
	addToFavorites: function() {
		console.log('ITEM ADDED');
		console.log('THIS.PROPS', this.props);
		this.props.dispatch(actions.updateFavorites(this.props));
	},
	render: function() {
		console.log('PROPS', this.props);
		var description = this.props.description;
		description = description.split('&lt;br /&gt;').join(' ');
		description = description.split('&lt;br&gt;').join(' ');
		description = description.split('<br />').join(' ');
		var directions = this.props.directions;
		directions = directions.split('&lt;br /&gt;').join(' ');
		directions = directions.split('&lt;br&gt;').join(' ');
		directions = directions.split('<br />').join(' ');
		return (
			<div>
				<h3><a href={this.props.url} target="_blank"> {this.props.name} </a></h3>
				<p>Location: {this.props.city}, {this.props.state}</p>
				<p>Track Length: {this.props.length} miles</p>
				<p>Description: {description}</p>
				<p>Directions: {directions}</p>	
				<button onClick={this.addToFavorites} >Add to Favorites</button>
			</div>
		)
	}
});


var mapStateToProps = function(state, props) {
	return {
		userID: state.googleID
	} 
}

var Container = connect(mapStateToProps)(TrailDetail);

module.exports = Container;

