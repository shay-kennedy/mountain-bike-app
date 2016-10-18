var React = require("react");


var Login = function() {
	return (
		<div>
			<form>
				<button type='submit'><a href="/auth/google">Login</a></button>
				<p>Please login with your Google credentials so that we can provide you with a better experience!</p>
			</form>
		</div>
	)
};


module.exports = Login;