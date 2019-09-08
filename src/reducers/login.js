const initialState = {
    userInfo: {},
    isGetUserInfo: false,
};

export const actionsTypes = {
    USER_LOGIN: 'USER_LOGIN',
    GET_USER_INFO: 'GET_USER_INFO',
    SAVE_USER_INFO: 'SAVE_USER_INFO',
};

export const actions = {
    userLogin: function (username, password) {
        return {
            type: actionsTypes.USER_LOGIN,
            username,
            password
        }
    },
    getUserInfo: function () {
        return {
            type: actionsTypes.GET_USER_INFO
        }
    }
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.SAVE_USER_INFO:
            return {
                ...state, userInfo: action.userInfo, isGetUserInfo: action.isGetUserInfo
            }
        default:
            return state
    }
}

export default reducer