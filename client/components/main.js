var React = require('react');
var ReactDOM = require('react-dom');
var TrailsMain = require('./trails-main');
var Login = require('./login');
var Input = require('./input');

var Main = function(props) {
	console.log('Hello world');
	return (		
		<div>
			{props.children}
		</div>
	)
}

module.exports = Main;