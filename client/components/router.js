var React = require("react");
var Provider = require('react-redux').Provider;
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Main from './main';
import TrailsMain from './main-trails';
import Login from './main-login';
import store from '../redux/store';


var routes = (
	<Provider store={store}>
	<Router history={hashHistory} >
		<Route path="/" component={Main} >
			<IndexRoute component={Login} />
			<Route path="/trails" component={TrailsMain} />
		</Route>
	</Router>
	</Provider>
);


module.exports = routes;
