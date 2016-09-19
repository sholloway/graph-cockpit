import {REGISTER_USER} from '../actions/registration';
let initialState = {
	user: {
		exists: true //This will be replaced with a database lookup after integration.
	}
};

export default function register(state=initialState, action){
	let nextState;
	switch(action.type){
		case REGISTER_USER:
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
