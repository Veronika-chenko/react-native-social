import { createSlice } from '@reduxjs/toolkit';

const state = {
    userId: null,
    nickname: null,
    stateChange: false,
    email: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            nickname: payload.login,
            email: payload.email, // для логінізації
        }),
        // updateUserProfile: (state, { payload }) => ({
        //     ...state,
        //     userId: payload.userId,
        //     nickname: payload.login,
        //     email: payload.email, // для логінізації
        // }),
        authStateChange: (state, { payload }) => ({
            ...state,
            // userId: payload.userId,
            // nickname: payload.nickname,
            // // nickname: payload,
            // email: payload.email,
            stateChange: payload.stateChange,
        }),
        authSignOut: () => state,
    }
})

// console.log("authSlice:", authSlice)