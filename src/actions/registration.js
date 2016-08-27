/** Defines the actions involving user registration.
*/
export const REGISTER_USER = 'REGISTER_USER';

export function registerUser(){
	//I think this is where I will place the user in the DB.
	//Probably split this into two actions. One to communicate with the DB
	//Then another to signal routing to /home.
	console.log("Fired Action: registerUser()");
	return { type : REGISTER_USER };
}
