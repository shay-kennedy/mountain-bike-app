var React = require("react");
var connect = require('react-redux').connect;
var actions = require('../redux/actions');
var router = require('react-router');
var Link = router.Link;

	
var Input = React.createClass({

	onFormSubmit: function(event){
		event.preventDefault();
		var location = this.refs.location.value;
		// console.log('INPUT LOCATION', location);		
		this.props.dispatch(actions.getTrails(location));
		this.refs.location.value = '';	
	},
	render: function(){
	return (
		<div>
			
			<form onSubmit={this.onFormSubmit} >				
					<input placeholder='Enter City and State' ref="location" />
					<button type='submit'>Search</button>					
			</form>
			
		</div>
	);
}});


var Container = connect()(Input);

module.exports = Container;