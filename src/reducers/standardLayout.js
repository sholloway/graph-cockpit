import {CREATE_NEW_ELEMENT,
	STANDARD_LAYOUT_CANVAS_CLICKED,
	STANDARD_LAYOUT_CANVAS_RIGHT_CLICKED,
	STANDARD_LAYOUT_ELEMENT_DRAG_START} from '../actions/main';

let initialState = {
	contextMenu: {
		display: false
	},
	mouse: {
		x: 0,
		y: 0
	}
};

export default function main(state=initialState, action){
	let nextState;
	switch(action.type){
		case CREATE_NEW_ELEMENT:
			nextState = Object.assign({}, state, {
				contextMenu: {
					display: false
				}
			});
			break;
		case STANDARD_LAYOUT_CANVAS_CLICKED:
			nextState = Object.assign({}, state, {
				contextMenu: {
					display: false
				},
				mouse: {
					x: action.point.x,
					y: action.point.y
				}
			});
			break;
		case STANDARD_LAYOUT_CANVAS_RIGHT_CLICKED:
			nextState = Object.assign({}, state, {
				contextMenu:{
					display: true
				},
				mouse: {
					x: action.point.x,
					y: action.point.y
				}
			});
			break;
		default:
			nextState = state;
	}
	return nextState;
}
