import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axiosInstance from "../configs/axios";
import auth from "../configs/firebase";

const googleProvider = new GoogleAuthProvider();

const AuthService = {
    isAuthenticated: () => {
        return !!localStorage.getItem('accessToken');
    },

    saveAccessToken: (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
    },

    saveRefreshToken: (refreshToken) => {
        localStorage.setItem("refreshToken", refreshToken);
    },

    saveUser: (user) => {
        localStorage.setItem("user", user);
    },

    getRefreshToken: () => {
        return localStorage.getItem("refreshToken");
    },

    getUser: () => {
        return localStorage.getItem("user");
    },

    logout: async () => {
        if (AuthService.getRefreshToken()) {
            console.log(AuthService.getRefreshToken());
            await axiosInstance.post("Auth/logout", { refreshToken: AuthService.getRefreshToken() }).then(() => {
                localStorage.clear();
                window.location.replace("/");
                return true;
            }).catch((error) => console.log(error));
            return false;
        }
        return false
    },

    googleLogin: async () => {
        const res = await signInWithPopup(auth, googleProvider);
        return res;
    }
};

export default AuthService;