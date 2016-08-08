
export const FIND_ELEMENT_GUI_REQUESTED = 'FIND_ELEMENT_GUI_REQUESTED';
export const CLOSE_FIND_BAR_REQUESTED = 'CLOSE_FIND_BAR_REQUESTED';

export function launchFindElementGUI(){
	return {type: FIND_ELEMENT_GUI_REQUESTED };
}

export function escWasPressed(){
	return {type: CLOSE_FIND_BAR_REQUESTED};
}
