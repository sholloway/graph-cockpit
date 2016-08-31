import {REQUEST_AUTHENTICATION_STATUS,
	USER_CHALLENGE_DISPLAY_PWD_CHANGED,
	USER_AUTHENTICATED,
	DO_NOTHING} from '../actions/authentication.js';

let initialState = {
	user: { //TODO: Create an App Reducer and place this there.
		authenticated: true
	},
	system: { //TODO: Create an App Reducer and place this there.
		authenticating: false
	},
	userChallenge:{
		dispayPassword: false
	}
};

export default function authenticate(state=initialState, action){
	let nextState;
	switch (action.type){
		case REQUEST_AUTHENTICATION_STATUS:
			nextState = state;
			break;
		case USER_CHALLENGE_DISPLAY_PWD_CHANGED:
			nextState = Object.assign({}, state, {
				userChallenge:{
					dispayPassword: action.displayedStatus
				}
			});
			break;
		case USER_AUTHENTICATED:
		nextState = Object.assign({}, state, {
			user: {
				authenticated: true
			}
		});
		break;
		case DO_NOTHING:
			nextState = state;
			break;
		default:
				nextState = state;
	}
	return nextState;
}
