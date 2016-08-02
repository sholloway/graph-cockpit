/** Defines the actions involving user authentication.
*/
export const REQUEST_AUTHENTICATION_STATUS = 'REQUEST_AUTHENTICATION_STATUS';

export function isAuthenticated(){
	return { type : REQUEST_AUTHENTICATION_STATUS };
}
