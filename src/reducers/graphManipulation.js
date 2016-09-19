import { CREATE_NEW_ELEMENT,
	DELETE_ELEMENT,
	STANDARD_LAYOUT_CANVAS_CLICKED,
	STANDARD_LAYOUT_CANVAS_RIGHT_CLICKED,
	STANDARD_LAYOUT_ELEMENT_CLICKED,
	STANDARD_LAYOUT_ELEMENT_DRAG_START,
	STANDARD_LAYOUT_ELEMENT_DRAG,
	STANDARD_LAYOUT_ELEMENT_DRAG_END,
	STANDARD_LAYOUT_DISPLAY_ELEMENT_CONTEXT_MENU } from '../actions/main';
import {ElementRenderStates} from '../constants/elementRenderStates';

let initialState = {
	sceneGraph:{
		nodes: [],
		edges: []
	}
};

export default function main(state=initialState, action){
	let nextState, nodes;
	switch(action.type){
		case CREATE_NEW_ELEMENT:
			nodes = resetNodeStates(state.sceneGraph.nodes);
			nodes.push(action.node);
			nextState = Object.assign({}, state,{
				sceneGraph:{
					nodes: nodes
				}
			});
			break;
		case DELETE_ELEMENT:
			nodes = state.sceneGraph.nodes.filter((node)=>{
				return (node.renderState != ElementRenderStates.SELECTED);
			});
			nextState = Object.assign({}, state, {
				sceneGraph:{
					nodes: nodes
				}
			});
			break;
		case STANDARD_LAYOUT_CANVAS_CLICKED:
		case STANDARD_LAYOUT_CANVAS_RIGHT_CLICKED:
			nodes = resetNodeStates(state.sceneGraph.nodes);
			nextState = Object.assign({}, state, {
				sceneGraph:{
					nodes: nodes
				}
			});
			break;
		case STANDARD_LAYOUT_ELEMENT_CLICKED:
			nodes = state.sceneGraph.nodes.map(function(node){
				if (node.data.id == action.elementId){
					node.renderState = ElementRenderStates.SELECTED
				}else{
					node.renderState = ElementRenderStates.IDLE;
				}
				node.displayContextMenu = false;
				return node;
			});
			nextState = Object.assign({}, state, {
				sceneGraph:{
					nodes: nodes
				}
			});
			break;
		case STANDARD_LAYOUT_ELEMENT_DRAG_START:
			nodes = state.sceneGraph.nodes.map(function(node){
				if (node.data.id == action.elementId){
					node.moving = true;
				}
				return node;
			});
			nextState = Object.assign({}, state, {
				sceneGraph:{
					nodes: nodes
				}
			});
			break;
		case STANDARD_LAYOUT_ELEMENT_DRAG:
			nextState = state;
			break;
		case STANDARD_LAYOUT_ELEMENT_DRAG_END:
			nodes = state.sceneGraph.nodes.map(function(node){
				if (node.data.id == action.elementId){
					node.moving = false;
				}
				return node;
			});
			nextState = Object.assign({}, state, {
				sceneGraph:{
					nodes: nodes
				}
			});
			break;
		case STANDARD_LAYOUT_DISPLAY_ELEMENT_CONTEXT_MENU:
			nodes = state.sceneGraph.nodes.map(function(node){
				node.displayContextMenu = (node.data.id == action.elementId);
				return node;
			});
			nextState = Object.assign({}, state, {
				sceneGraph:{
					nodes: nodes
				}
			});
			break;
		default:
			nextState = state;
	}
	return nextState;
}

function resetNodeStates(nodes){
	return nodes.map(function(node){
		node.displayContextMenu = false;
		node.renderState = ElementRenderStates.IDLE;
		return node;
	});
}
