/** Defines the actions involving user authentication.
*/
export const REQUEST_AUTHENTICATION_STATUS = 'REQUEST_AUTHENTICATION_STATUS';
export const USER_CHALLENGE_DISPLAY_PWD_CHANGED = 'USER_CHALLENGE_DISPLAY_PWD_CHANGED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const DO_NOTHING = "DO_NOTHING";

export function isAuthenticated(){
	return { type : REQUEST_AUTHENTICATION_STATUS };
}

export function authenticationRequest(userInput){
	//This is where I will make the WS request.
	return {type: USER_AUTHENTICATED};
}

/**
Updates the state of displaying the password on the login screen.
@param displayedStatus boolean
*/
export function displayPasswordOptionChanged(event){
	return {
		type : USER_CHALLENGE_DISPLAY_PWD_CHANGED,
		displayedStatus: event.target.checked
	};
}
