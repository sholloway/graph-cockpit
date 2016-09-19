
export const FIND_ELEMENT_GUI_REQUESTED = 'FIND_ELEMENT_GUI_REQUESTED';
export const CLOSE_FIND_BAR_REQUESTED = 'CLOSE_FIND_BAR_REQUESTED';

export function launchFindElementGUI(){
	return {type: FIND_ELEMENT_GUI_REQUESTED };
}

export function escWasPressed(){
	return {type: CLOSE_FIND_BAR_REQUESTED};
}

import shortid from 'shortid';
import {ElementRenderStates} from '../constants/elementRenderStates';

export const CREATE_NEW_ELEMENT ='CREATE_NEW_ELEMENT';
export const DELETE_ELEMENT ='DELETE_ELEMENT';
export const STANDARD_LAYOUT_CANVAS_CLICKED ='STANDARD_LAYOUT_CANVAS_CLICKED';
export const STANDARD_LAYOUT_CANVAS_RIGHT_CLICKED ='STANDARD_LAYOUT_CANVAS_RIGHT_CLICKED';
export const STANDARD_LAYOUT_ELEMENT_CLICKED ='STANDARD_LAYOUT_ELEMENT_CLICKED';
export const STANDARD_LAYOUT_ELEMENT_DRAG_START ='STANDARD_LAYOUT_ELEMENT_DRAG_START';
export const STANDARD_LAYOUT_ELEMENT_DRAG ='STANDARD_LAYOUT_ELEMENT_DRAG';
export const STANDARD_LAYOUT_ELEMENT_DRAG_END ='STANDARD_LAYOUT_ELEMENT_DRAG_END';
export const STANDARD_LAYOUT_DISPLAY_ELEMENT_CONTEXT_MENU ='STANDARD_LAYOUT_DISPLAY_ELEMENT_CONTEXT_MENU';

export function createElement(x, y, elementType){
	let node = {
		x: x,
		y: y,
		renderState: ElementRenderStates.SELECTED,
		displayContextMenu: false,
		moving: false,
		data: { id: generateId() },
		elementType: elementType
	};
	return {
		type: CREATE_NEW_ELEMENT,
		node: node
	};
}

export function deleteElement(elementId){
	return {
		type: DELETE_ELEMENT,
		elementId: elementId
	};
}

export function standardLayoutCanvasClicked(x, y){
	return {
		type: STANDARD_LAYOUT_CANVAS_CLICKED,
		point: {
			x: x,
			y: y
		}
	};
}

export function standardLayoutCanvasRightClicked(x, y){
	return {
		type: STANDARD_LAYOUT_CANVAS_RIGHT_CLICKED,
		point: {
			x: x,
			y: y
		}
	};
}

export function standardLayoutElementClicked(elementId){
	return {
		type: STANDARD_LAYOUT_ELEMENT_CLICKED,
		elementId: elementId
	};
}

/* Temporary function to generate unique ids for nodes.
	This will be replaced by the IDs generated by the engine.
*/
function generateId(){
	return shortid.generate();
}

export function standardLayoutDragStarted(elementId, x, y){
	return {
		type: STANDARD_LAYOUT_ELEMENT_DRAG_START,
		elementId: elementId,
		point: {x: x, y: y}
	};
}

export function standardLayoutDrag(elementId, x, y){
	return {
		type: STANDARD_LAYOUT_ELEMENT_DRAG,
		elementId: elementId,
		point: {x: x, y: y}
	};
}

export function standardLayoutDragEnded(elementId){
	return {
		type: STANDARD_LAYOUT_ELEMENT_DRAG_END,
		elementId: elementId
	};
}

export function standardLayoutDisplayContextMenu(elementId){
	return {
		type: STANDARD_LAYOUT_DISPLAY_ELEMENT_CONTEXT_MENU,
		elementId: elementId
	};
}
