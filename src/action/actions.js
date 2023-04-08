import {
    INCREMENT, DECREMENT,
    FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR,
    CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR
} from './types';
import axios from 'axios'


export const increaseCounter = () => {

    return {

        type: INCREMENT,

    };

};

export const decreaseCounter = () => {

    return {

        type: DECREMENT,

    };

};


export const fetchAllUser = () => {
    return async (dispatch, getState) => {

        dispatch(fetchUsersRequest())

        try {
            const res = await axios.get("http://localhost:8080/users/all")
            const data = res && res.data ? res.data : []

            dispatch(fetchUsersSuccess(data))
        } catch (error) {
            console.log(error);
            dispatch(fetchUsersError())
        }
    }
}

export const fetchUsersRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

export const fetchUsersSuccess = (data) => {
    return {
        type: FETCH_USER_SUCCESS,
        data
    }
}

export const fetchUsersError = () => {
    return {
        type: FETCH_USER_ERROR
    }
}


export const createUsersRequest = () => {
    return {
        type: CREATE_USER_REQUEST
    }
}

export const createUsersSuccess = () => {
    return {
        type: CREATE_USER_SUCCESS
    }
}

export const createUsersError = () => {
    return {
        type: CREATE_USER_ERROR
    }
}

export const createNewUserRedux = (email, password, username) => {
    return async (dispatch, getState) => {

        dispatch(createUsersRequest())

        try {
            let res = await axios.post("http://localhost:8080/users/create", { email, password, username })

            if (res && res.data.errCode === 0) {
                dispatch(createUsersSuccess())
                dispatch(fetchAllUser())
            }

        } catch (error) {
            console.log(error);
            dispatch(createUsersError())
        }
    }
}