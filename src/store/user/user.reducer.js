import { USER_ACTION_TYPES } from './user.types.js'

const INITIAL_STATE = {
	currentUser: null,
	isLoading: false,
	error: null,
}

// SET_CURRENT_USER: 'user/SET_CURRENT_USER',
// CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
// GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
// EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
// SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
// SIGN_IN_FAILURE: 'user/SIGN_IN_FAILURE',

export const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action

	switch (type) {
		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
			return { ...state, currentUser: payload }
		case USER_ACTION_TYPES.SIGN_IN_FAILED:
			return { ...state, error: payload }
		default:
			return state
	}
}
