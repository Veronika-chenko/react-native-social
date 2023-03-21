import { useSelector } from "react-redux";
import { selectUserEmail, selectUserNickname } from '../redux/auth/authSelectors';

export const useAuth = () => {
    return {
        userEmail: useSelector(selectUserEmail),
        userNickname: useSelector(selectUserNickname),
    }
}