import { createSlice } from '@reduxjs/toolkit';

const state = {
    userId: null,
    nickname: null,
    stateChange: false,
    email: null,
    avatar: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        // used for login and registration
        updateUserProfile: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            nickname: payload.login,
            email: payload.email,
            avatar: payload.avatar,
        }),
        // authStateChange: (state, { payload }) => ({
        //     ...state,
        //     stateChange: payload.stateChange,
        // }),
        authStateChange: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            nickname: payload.login,
            email: payload.email,
            avatar: payload.avatar,

        }),
        authSignOut: () => state,
    }
})

