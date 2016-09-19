import {FIND_ELEMENT_GUI_REQUESTED, CLOSE_FIND_BAR_REQUESTED} from '../actions/main.js';

let initialState = {
	findBar: {displayed: false}
};

export default function main(state=initialState, action){
	let nextState;
	switch(action.type){
		case FIND_ELEMENT_GUI_REQUESTED:
			nextState = Object.assign({}, state,{
				findBar: {displayed: true}
			});
			break;
		case CLOSE_FIND_BAR_REQUESTED:
			nextState = Object.assign({}, state,{
				findBar: {displayed: false}
			});
			break;
		default:
			nextState = state;
	}
	return nextState;
}
