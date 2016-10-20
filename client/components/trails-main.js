var React = require("react");
var Input = require('./input');
var router = require('react-router');
var Link = router.Link;


var TrailsMain = React.createClass({
	// componentDidMount: function() {
	// 	this.props.dispatch(actions.fetchUser());
	// 	console.log('CDM PROPS', this.props);
	// },

	render: function(props) {
		// console.log('RENDER PROPS', this.props);
		// var trailList = this.props.trails.places.map(function(trail) {
		// 	return (
		// 		<TrailDetail 
		// 			key={trail.unique_id}
		// 			trail_id={trail.unique_id}
		// 			city={trail.city} 
		// 			state={trail.state} 
		// 			name={trail.name}
		// 			url={trail.activities[0].url} 
		// 			length={trail.activities[0].length}
		// 			description={trail.activities[0].description}
		// 			directions={trail.directions}
		// 		/>
		// 	)
		// });
		return (
			<div>
				<h1><Link to={'/trails'} >MTB Trail Finder</Link></h1>
				<div className="inputs">					
					<Link to={'/trails/favorites'}><input type='button' value='Favorites' className='input-button' /></Link>
					<div>
						<Input />
					</div>
					<a href='/logout'><input type='button' value='Logout' className='input-button' /></a>
				</div>
				<div className="display">
					{this.props.children}
				</div>	
			</div>
		)
	}
});

// <a href='/trails/favorites'>Favorites</a>

// var mapStateToProps = function(state, props) {
// 	return {
// 		trails: state.trails,
// 		userId: state.googleID,
// 		favorites: state.favorites
// 	} 
// }

// var Container = connect(mapStateToProps)(TrailsMain);


module.exports = TrailsMain;


// <button ><Link to={'/trails/favorites'}>Favorites</Link></button>


