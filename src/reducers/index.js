import { combineReducers } from 'redux'
import login from './login'
import income from './income'
const initialState = {
    isHasToken: false,
    isLoading: true,
    tallyType: []
};

export const actionsTypes = {
    SET_TOKEN_STATUS: 'SET_TOKEN_STATUS',
    SET_TALLY_TYPE: 'SET_TALLY_TYPE'
};

export const actions = {
    setTokenStatus: function (status = true) {
        return {
            type: actionsTypes.SET_TOKEN_STATUS,
            status
        }
    },
    setTallyType: function (result) {
        return {
            type: actionsTypes.SET_TALLY_TYPE,
            result
        }
    }
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.SET_TOKEN_STATUS:
            return {
                ...state, isHasToken: action.status, isLoading: false
            }
        case actionsTypes.SET_TALLY_TYPE:
            return {
                ...state, tallyType: action.result
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