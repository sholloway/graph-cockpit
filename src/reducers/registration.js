let initialState = {
	user: {
		exists: false //This will be replaced with a database lookup after integration.
	}
};

export default function register(state=initialState, action){
	let nextState;
	switch(action.type){
		default:
			nextState = state;
	}
	return nextState;
}
