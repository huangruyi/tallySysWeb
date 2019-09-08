import { combineReducers } from 'redux'
import login from './login'
import income from './income'
const initialState = {
    isHasToken: false,
    isLoading: true,
};

export const actionsTypes = {
    SET_TOKEN_STATUS: 'SET_TOKEN_STATUS'
};

export const actions = {
    setTokenStatus: function (status = true) {
        return {
            type: actionsTypes.SET_TOKEN_STATUS,
            status
        }
    }
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.SET_TOKEN_STATUS:
            return {
                ...state, isHasToken: action.status, isLoading: false
            }
        default:
            return state
    }
}

export default combineReducers({
    login,
    income,
    globalState: reducer
})