import {REGISTER_USER_REQUEST, REGISTER_USER_CONFIRMERED} from '../actions/registration';
let initialState = {
	user: {
		exists: false, //This will be replaced with a database lookup after integration.
		registrationState: null
	}
};

export default function register(state=initialState, action){
	let nextState;
	switch(action.type){
		case REGISTER_USER_REQUEST:
			nextState = Object.assign({}, state, {
				user: {
					registrationState: 'pending'
				}
			});
			break;
		case REGISTER_USER_CONFIRMERED:
			nextState = Object.assign({}, state, {
				user:{
					exists: true,
					registrationState: 'complete'
				}
			});
			break;
		default:
			nextState = state;
	}
	return nextState;
}
