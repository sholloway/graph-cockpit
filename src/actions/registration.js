/** Defines the actions involving user registration.
*/
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_CONFIRMERED = 'REGISTER_USER_CONFIRMERED';

export function registerUser(user){
	console.log("Fired Action: registerUser()");
	return { type : REGISTER_USER_REQUEST };
}

export function registerUserConfirmed(user){
	console.log("Fired Action: registerUser()");
	return { type : REGISTER_USER_CONFIRMERED };
}
