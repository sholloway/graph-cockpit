
export const FIND_ELEMENT_GUI_REQUESTED = 'FIND_ELEMENT_GUI_REQUESTED';

export function launchFindElementGUI(){
	console.log("Holy Cow, it worked!")
	return {type: FIND_ELEMENT_GUI_REQUESTED };
}
