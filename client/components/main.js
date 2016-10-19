var React = require('react');
var ReactDOM = require('react-dom');
var TrailsMain = require('./main-trails');
var Login = require('./main-login');
var Input = require('./input');

var Main = function(props) {
	return (		
		<div>
			<h1>MTB Trail Finder</h1>
			{props.children}
		</div>
	)
}

module.exports = Main;