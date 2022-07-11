import { createSlice } from "@reduxjs/toolkit";

const initialStateAuth = {
    token: null,
    userId: null,
    didTryAutoLogin: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialStateAuth,
    reducers: {
        AUTHENTICATE(state, action) {
            const { token, userId } = action.payload;
            state.token = token;
            state.userId = userId;
            state.didTryAutoLogin = true;
        },
        LOGOUT(state) {
            state.token = null;
            state.userId = null;
            state.didTryAutoLogin = true;
        },
        SET_DID_TRY_AL(state) {
            state.didTryAutoLogin = true;
        }
    },
})

export const { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } = authSlice.actions;

export const getAuth = state => state?.auth.userId;

export default authSlice.reducer;