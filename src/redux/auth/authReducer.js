import { createSlice } from '@reduxjs/toolkit';

const state = {
    userId: null,
    nickname: null,
    email: null,
    avatar: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            nickname: payload.login,
            email: payload.email,
            avatar: payload.avatar,
        }),
        authSignOut: () => state,
    }
})

