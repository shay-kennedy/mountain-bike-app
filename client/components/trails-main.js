var React = require("react");
var connect = require('react-redux').connect;
var actions = require('../redux/actions');
var Input = require('./input');
var TrailsList = require('./trails-list');


function TrailsMain() {
		return (
			<div>
				<h1>MTB Trail Finder</h1>
				<button ><a href='/logout'>Logout</a></button>
				<button >Favorites</button>
				<div>
					<Input />
				</div>
				<div>
					<TrailsList />
				</div>	
			</div>
		)
};


module.exports = TrailsMain;










