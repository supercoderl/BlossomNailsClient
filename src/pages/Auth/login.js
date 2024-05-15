import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axiosInstance from "../../configs/axios";
import AuthService from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
library.add(faEnvelope, faLock, faSpinner);

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axiosInstance.post("Auth/login", data).then((response) => {
            const result = response.data;
            if (!result) return;
            else if (result.success) {
                AuthService.saveAccessToken(result.data?.token?.accessToken);
                AuthService.saveRefreshToken(result.data?.refreshToken?.refreshToken);
                AuthService.saveUser(JSON.stringify(result.data?.userResult));
                toast.success(result.message);
                setTimeout(() => {
                    window.location.href = "/";
                }, 1200);
            }
            else toast.error(result.message);
        }).catch((error) => toast.error(error)).finally(() => setTimeout(() => setLoading(false), 300));
    }

    return (
        <div className="login-form">
            <div className="title">Login</div>
            <form action="#" onSubmit={handleSubmit}>
                <div className="input-boxes">
                    <div className="input-box">
                        <FontAwesomeIcon icon="fa-solid fa-envelope" />
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={data.usename}
                            onChange={e => setData({ ...data, username: e.target.value })}
                            required={!data.username || data.username.length <= 0}
                        />
                    </div>
                    <div className="input-box">
                        <FontAwesomeIcon icon="fa-solid fa-lock" />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={data.password}
                            onChange={e => setData({ ...data, password: e.target.value })}
                            required={!data.password || data.password.length <= 0}
                        />
                    </div>
                    <div className="text"><a href="/forgot-password">Forgot password?</a></div>
                    <div className="button input-box">
                        <button type="submit">
                            {
                                loading ?
                                    <FontAwesomeIcon icon="fa-solid fa-spinner" />
                                    :
                                    "Submit"
                            }
                        </button>
                    </div>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        locale="en-EN"
                        text="continue_with"
                    />
                    <div className="text sign-up-text">Don't have an account? <label htmlFor="flip">Sigup now</label></div>
                </div>
            </form>
        </div>
    )
}

export default Login;