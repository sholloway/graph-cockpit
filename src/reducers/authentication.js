import {REQUEST_AUTHENTICATION_STATUS} from '../actions/authentication.js';

export default function authenticate(state=0, action){
	switch (action.type){
		case REQUEST_AUTHENTICATION_STATUS:
			return state;
		default:
			return state;
	}
}
