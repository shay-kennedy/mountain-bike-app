var React = require("react");
var connect = require('react-redux').connect;
var actions = require('../redux/actions');
var Input = require('./input');
var TrailDetail = require('./trail-detail');


var TrailsMain = React.createClass({
	
	render: function(props) {
		var trailList = this.props.trails.places.map(function(trail) {
			return (
				<TrailDetail 
					key={trail.unique_id}
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
			<div>
				<div className="inputs">					
					<button >Favorites</button>
					<div><Input /></div>
					<button ><a href='/logout'>Logout</a></button>
				</div>
				<div className="display">
					<h2>Trails List: </h2>
						{trailList}
				</div>	
			</div>
		)
	}
});


var mapStateToProps = function(state, props) {
	return {
		trails: state.trails,
	} 
}

var Container = connect(mapStateToProps)(TrailsMain);


module.exports = Container;

