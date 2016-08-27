import {REGISTER_USER} from '../actions/registration';
let initialState = {
	user: {
		exists: false //This will be replaced with a database lookup after integration.
	}
};

export default function register(state=initialState, action){
	console.log("Registration Reducer");
	let nextState;
	switch(action.type){
		case REGISTER_USER:
			console.log("Matched Register User Reduction");
			nextState = Object.assign({}, state, {
				user:{
					exists: true
				}
			});
			break;
		default:
			nextState = state;
	}
	return nextState;
}
