var React = require("react");


var Login = function() {
		return (
			<div>
				<form>
					<button type='submit'><a href="/auth/google" >Login</a></button>
				</form>
			</div>
		)
};

module.exports = Login;