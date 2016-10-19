var React = require('react');
var ReactDOM = require('react-dom');


var Main = function(props) {
	return (		
		<div>
			<h1>MTB Trail Finder</h1>
			{props.children}
		</div>
	)
}


module.exports = Main;