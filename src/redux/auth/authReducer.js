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
        }),
        authStateChange: (state, { payload }) => ({
            ...state,
            stateChange: payload.stateChange
        }),
        authSignOut: () => state,
    }
})

// console.log("authSlice:", authSlice)