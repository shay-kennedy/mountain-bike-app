var React = require('react');
var ReactDOM = require('react-dom');


var Main = function(props) {
	return (		
		<div className="container">
			{props.children}
		</div>
	)
}


module.exports = Main;