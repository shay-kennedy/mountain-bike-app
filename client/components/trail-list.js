var React = require("react");
var connect = require('react-redux').connect;
var actions = require('../redux/actions');
var Input = require('./input');
var TrailDetail = require('./trail-detail');


var TrailList = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(actions.fetchUser());
		console.log('CDM PROPS', this.props);
	},

	render: function(props) {
		console.log('RENDER PROPS', this.props);
		var trailList = this.props.trails.places.map(function(trail) {
			return (
				<TrailDetail 
					key={trail.unique_id}
					trail_id={trail.unique_id}
					city={trail.city} 
					state={trail.state} 
					name={trail.name}
					url={trail.activities[0].url} 
					length={trail.activities[0].length}
					description={trail.activities[0].description}
					directions={trail.directions}
				/>
			)
		});
		return (
			<div className="display">
				<h2>Trail list: </h2>
				{trailList}
			</div>	
		)
	}
});


var mapStateToProps = function(state, props) {
	return {
		trails: state.trails,
		userId: state.googleID,
		favorites: state.favorites
	} 
}

var Container = connect(mapStateToProps)(TrailList);


module.exports = Container;

