import { USER_ACTION_TYPES } from './user.types.js'

const INITIAL_STATE = {
	currentUser: null,
	isLoading: false,
	error: null,
}

// SET_CURRENT_USER: 'user/SET_CURRENT_USER',
// 	CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
// 	GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
// 	EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
// 	SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
// 	SIGN_IN_FAILED: 'user/SIGN_IN_FAILED',
// 	SIGN_UP_START: 'user/SIGN_UP_START',
// 	SIGN_UP_SUCCESS: 'user/SIGN_UP_SUCCESS',
// 	SIGN_UP_FAILED: 'user/SIGN_UP_FAILED',

export const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action

	switch (type) {
		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
			return { ...state, currentUser: payload }
		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
			return { ...state, currentUser: null }
		case USER_ACTION_TYPES.SIGN_OUT_FAILED:
		case USER_ACTION_TYPES.SIGN_IN_FAILED:
		case USER_ACTION_TYPES.SIGN_UP_FAILED:
			return { ...state, error: payload }
		default:
			return state
	}
}
