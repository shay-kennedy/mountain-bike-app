var React = require("react");
var actions = require('../redux/actions');
var connect = require('react-redux').connect;
var TrailsMain = require('./trails-main');



var TrailDetail = React.createClass ({			
	addToFavorites: function() {
		console.log('ITEM ADDED');
		this.props.dispatch(actions.addFavorite(this.props));
	},
	render: function() {
		// console.log('PROPS', this.props);
		var description = this.props.description;		
		description = description.split('&lt;b&gt;').join(' ');
		description = description.split('&lt;/b&gt;').join(' ');		
		description = description.split('&lt;p&gt;').join(' ');
		description = description.split('&lt;/p&gt;').join(' ');
		description = description.split('&lt;u&gt;').join(' ');
		description = description.split('&lt;/u&gt;').join(' ');
		description = description.split('&lt;li&gt;').join(' ');
		description = description.split('&lt;/li&gt;').join(' ');
		description = description.split('&lt;ul&gt;').join(' ');
		description = description.split('&lt;/ul&gt;').join(' ');		
		// description = description.split('&lt;a href=*&gt;').join(' ');
		description = description.split('&lt;br /&gt;').join(' ');
		description = description.split('<br />').join(' ');
		description = description.split('&quot;').join('"');
		description = description.split('&amp;').join('&');
		var directions = this.props.directions;
		directions = directions.split('&lt;b&gt;').join(' ');
		directions = directions.split('&lt;/b&gt;').join(' ');		
		directions = directions.split('&lt;p&gt;').join(' ');
		directions = directions.split('&lt;/p&gt;').join(' ');
		directions = directions.split('&lt;u&gt;').join(' ');
		directions = directions.split('&lt;/u&gt;').join(' ');
		directions = directions.split('&lt;li&gt;').join(' ');
		directions = directions.split('&lt;/li&gt;').join(' ');
		directions = directions.split('&lt;ul&gt;').join(' ');
		directions = directions.split('&lt;/ul&gt;').join(' ');		
		// directions = directions.split('&lt;a href=*&gt;').join(' ');
		directions = directions.split('&lt;br /&gt;').join(' ');
		directions = directions.split('<br />').join(' ');
		directions = directions.split('&quot;').join('"');
		directions = directions.split('&amp;').join('&');
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

// <p dangerouslySetInnerHTML={{__html: description}} />					
// <p dangerouslySetInnerHTML={{__html: directions}} />

var mapStateToProps = function(state, props) {
	return {
		userId: state.googleID,
		favorites: state.favorites
	} 
}

var Container = connect(mapStateToProps)(TrailDetail);

module.exports = Container;

