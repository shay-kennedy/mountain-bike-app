var React = require("react");
var connect = require('react-redux').connect;
var actions = require('../redux/actions');
var router = require('react-router');
var Link = router.Link;

	
var Input = React.createClass({

	onSearch: function(event){
		event.preventDefault();
		var location = this.refs.location.value;
		if (location == '') {
			alert('Please enter a location.');
			return;
		}
		// console.log('INPUT LOCATION', location);		
		this.props.dispatch(actions.getTrails(location));
		this.refs.location.value = '';	
	},
	render: function(){
	return (
		<div>
			<input placeholder="Enter City and State" ref="location" />
			<button onClick={this.onSearch} >
				<Link to={'/trails/list'} >Search</Link>
			</button>					
		</div>
	);
}});


var Container = connect()(Input);

module.exports = Container;



// <div>
// 	<form onSubmit={this.onSearch} >		
// 		<input placeholder='Enter City and State' ref="location" />
// 		<button type='submit' >Search</button>					
// 	</form>
// </div>

// <div>
// 	<input placeholder='Enter City and State' ref="location" />
// 	<button onClick={this.onSearch} >
// 		<Link to={'/trails/list'} >Search</Link>
// 	</button>					
// </div>
