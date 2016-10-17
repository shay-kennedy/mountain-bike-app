var React = require("react");
var connect = require('react-redux').connect;
var actions = require('../redux/actions');
var Form = require('./input');


var Questions = React.createClass({

	componentDidMount: function() {
		console.log('before dispatch', this.props.question);
		this.props.dispatch(actions.fetchUser());
		console.log('after dispatch', this.props.question);
	},
	
	// compareAnswer: function(e) {
	// 	e.preventDefault();
	// 	var userAnswer = this.refs.userInput.value;
	// 	console.log(userAnswer);
	// },
	// submitForm: function(result, userId) {
	// 		this.props.dispatch(actions.guessAnswer(result));
	// 		// this.props.dispatch(actions.putData(result, userId));
	// 		this.props.dispatch(actions.fetchUser());

	// },
	render: function() {
		return (
			<div className="container">
				<div className="test">
					<div className="left">
						<h1>Mountain Biking</h1>
					</div>
					<div className="right">
						<button ><a href='/logout'>Logout</a></button>
					</div>
				</div>
					<div className="questions">
						<h2 className="left"> {this.props.question} </h2>
						<h2 className="right"><Form /></h2>
					</div>
			</div>
		)
	}
});

var mapStateToProps = function(state, props) {
	return {
		id: state.userId,
		question: state.question.question,
		score: state.score
	} 
}

var Container = connect(mapStateToProps)(Questions);

module.exports = Container;










