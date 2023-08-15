import {
    AUTH_LOGIN_SUCCESS,
    AUTH_REGISTER_SUCCESS,
    AUTH_REQ,
    AUTH_REQ_FAILURE,
    
} from "./actionTypes";

let InitialState = {
    isAuth: false,
    isError: "",
    isLoading: false,
    token: "",
    isRegistered: "",
};

type Action = {
    type: string;
    payload: string | number;
};

export const reducer = (state = InitialState, { type, payload }: Action) => {
    switch (type) {
        case AUTH_REQ: {
            return {
                ...state,
                isError: "",
                isLoading: true,
                regSuccess: false,
            };
        }

        case AUTH_REGISTER_SUCCESS: {
            return {
                ...state,
                isError: "",
                isLoading: false,
                isRegistered: payload,
            };
        }

        case AUTH_REQ_FAILURE: {
            return {
                ...state,
                isError: payload,
                isLoading: false,
                isRegistered: "",
            };
        }
        case AUTH_LOGIN_SUCCESS: {
            return {
                isAuth: true,
                isError: "",
                isLoading: false,
                token: payload,
                isRegistered: "",
            };
        }
        default: {
            return state;
        }
    }
};
