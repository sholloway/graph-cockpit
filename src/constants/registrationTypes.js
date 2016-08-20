export const PHASE_TYPES = {
	INTRODUCTION: 0,
	NICKNAME_PROMPT: 1,
	PASSWORD_PROMPT: 2,
	EMAIL_PROMPT: 3,
	EMAIL_VERIFICATION: 4,
	LAUNCH: 5
};

export const STATUS_TYPES = {OK: "OK", ERROR: "ERROR"};

export function minimumPhase(){
	return 0;
}

export function maximumPhase(){
	return 4;
}
