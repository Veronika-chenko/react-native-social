import { auth } from '../../firebase/config';
import { authSlice } from './authReducer';

export const authSignUpUser = ({email, password, login}) => async (dispatch, getState) => {
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        
        const user = await auth.currentUser;
        
        await user.updateProfile({
            displayName: login,
        })
        const { uid, displayName } = await auth.currentUser;
        
        dispatch(authSlice.actions.updateUserProfile({
            userId: uid,
            login: displayName,
        }))
        // console.log("user in Reg:", user)
    } catch (error) {
        console.log('error:', error.message)
        alert(error.message)
    }
}

export const authSignInUser = ({email, password}) => async (dispatch, getState) => { 
    try {
        const user = await auth
            .signInWithEmailAndPassword(email, password);
        console.log("user in log:", user)
    } catch (error) {
        console.log('error:', error.message)
        alert(error.message)
    }
}

export const authSignOutUser = () => async (dispatch, getState) => { }
export const authStateChangeUser = () => async (dispatch, getState) => { }
