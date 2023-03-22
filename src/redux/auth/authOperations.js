import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import { auth } from '../../firebase/config';
import { authSlice } from './authReducer';

export const authSignUpUser = ({email, password, login}) => async (dispatch, getState) => {
    try {
        // створюємо користувача
        await createUserWithEmailAndPassword(auth, email, password);
        // тут же його обновляємо саме на firebase 
        await updateProfile(auth.currentUser, {
            displayName: login,
        })
        // витаскуємо id і displayName
        const { uid, displayName } = auth.currentUser;
        // обновляємо користувача в redux
        dispatch(authSlice.actions.updateUserProfile({
            userId: uid,
            login: displayName,
        }))
        // console.log("user in Reg:", user)
    } catch (error) {
        if (error.message.includes('auth/email-already-in-use')) {
            alert('user already exists');
            return;
        }
        console.log('error:', error.message)
        alert(error.message)
    }
}

export const authSignInUser = ({email, password}) => async (dispatch, getState) => { 
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        // витаскуємо id і displayName
        const { uid, displayName } = auth.currentUser;
        console.log(43, uid, "+", displayName)
        // обновляємо користувача в redux
        dispatch(authSlice.actions.updateUserProfile({
            userId: uid,
            login: displayName,
            email: email,
        }))
        console.log("user in log:", user)
    } catch (error) {
        if (error.message.includes('auth/user-not-found')) {
            alert('user not found');
            return;
        }
        if (error.message.includes('auth/invalid-email')) {
            alert('invalid emai');
            return;
        }
        console.log('error:', error.message)
        alert(error.message)
    }
}

export const authSignOutUser = () => async (dispatch, getState) => { 
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
}
export const authStateChangeUser = () => async (dispatch, getState) => {
    dispatch(authSlice.actions.authStateChange())
    console.log(123, "inside authStateChangeUser operation")
    // onAuthStateChanged(auth, (user) => {
    //     console.log("user: ", user)
    //     if (user) {
    //         dispatch(
    //             authSlice.actions.authStateChange({
    //                 userId: user.uid,
    //                 nickname: user.displayName,
    //                 email: user.email,
    //             })
    //         );
    //         dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    //     }
    // })
}

// export const authStateChangeUser = () => async (dispatch, getState) => {
//     console.log(123, "inside authStateChangeUser operation")
//     onAuthStateChanged(auth, (user) => {
//         console.log("user: ", user)
//         if (user) {
//             dispatch(
//                 authSlice.actions.authStateChange({
//                     userId: user.uid,
//                     nickname: user.displayName,
//                     email: user.email,
//                 })
//             );
//             dispatch(authSlice.actions.authStateChange({ stateChange: true }));
//         }
//     })
// }
