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
			/*
			When a node is selected, bring it to the foreground.
			Two approaches. Manipulate z-Index, reorder array. Let's try the array method.
			1. Find the selected Node.
			2. Remove it from the array.
			3. Set all remaining nodes to IDLE.
			4. Set the clicked node to SELECTED.
			5. Place the node at the head of the array.
			*/

			let selectedNodes = state.sceneGraph.nodes
				.filter((node) => {return node.data.id == action.elementId;})
				.map((node) => {
					node.renderState = ElementRenderStates.SELECTED;
					node.displayContextMenu = false;
					return node;
				});

			let unselectedNodes = state.sceneGraph.nodes
				.filter((node) => {return node.data.id != action.elementId})
				.map((node) => {
					node.renderState = ElementRenderStates.IDLE;
					node.displayContextMenu = false;
					return node;
				});
			let nodes = unselectedNodes.concat(selectedNodes);
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
					node.draging = {
						originalPosition: {
							x: node.x,
							y: node.y
						},
						mouse: {
							x: action.point.x,
							y: action.point.y
						}
					};
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
			nodes = state.sceneGraph.nodes.map(function(node){
				if (node.moving){
					let dx = action.point.x - node.draging.mouse.x;
					let dy = action.point.y - node.draging.mouse.y;
					node.x = Math.round(node.draging.originalPosition.x + dx);
					node.y = Math.round(node.draging.originalPosition.y + dy);
				}
				return node;
			});
			nextState = Object.assign({}, state, {
				sceneGraph:{
					nodes: nodes
				}
			});
			break;
		case STANDARD_LAYOUT_ELEMENT_DRAG_END:
			nodes = state.sceneGraph.nodes.map(function(node){
				if (node.moving){
					node.moving = false;
					node.dragging = null;
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
