import Lottie from "lottie-react";
import password from "../../assets/animation/password1.json";
import code from "../../assets/animation/verify-code.json";
import verify from "../../assets/animation/verified.json";
import congratulation from "../../assets/animation/congratulation.json";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faKey } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axiosInstance from "../../configs/axios";
import { toast } from "react-toastify";
library.add(faEnvelope, faLock, faKey);

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [codeInput, setCodeInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState("begin");
    const [newPassword, setNewPassword] = useState("");

    const handleSendVerifyCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axiosInstance.post("Auth/send-verify-code", { email }).then((response) => {
            const result = response.data;
            if (!result) return;
            else if (result.success) {
                setTimeout(() => setState("sent"), 1500);
            }
            else toast.error(result.message);
        }).catch((error) => toast.error(error)).finally(() => setTimeout(() => setLoading(false), 1500));
    }

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axiosInstance.post("Auth/verify-code", { code: codeInput, email }).then((response) => {
            const result = response.data;
            if (!result) return;
            else if (result.success) {
                setTimeout(() => setState("verified"), 1500);
            }
            else toast.error(result.message);
        }).catch((error) => toast.error(error)).finally(() => setTimeout(() => setLoading(false), 1500));
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axiosInstance.post("Auth/reset-password", { email, newPassword }).then((response) => {
            const result = response.data;
            if (!result) return;
            else if (result.success) {
                setTimeout(() => setState("success"), 1500);
            }
            else toast.error(result.message);
        }).catch((error) => toast.error(error)).finally(() => setTimeout(() => setLoading(false), 1500));
    }

    return (
        <div className="require-container forgot-password-container">
            {
                state === "sent" ?
                    <div className="require-box d-flex align-items-center flex-column">
                        <Lottie
                            animationData={code}
                            loop={true}
                            style={{ width: "50%" }}
                        />;
                        <h2 className="text-center m-0">Sent verify code</h2>
                        <p className="mb-0 text-center">We sent to you a verification code. Please input your code here to continue!</p>
                        <form onSubmit={handleVerifyCode}>
                            <div className="input-boxes pb-3">
                                <div className="input-box">
                                    <FontAwesomeIcon icon="fa-solid fa-key" />
                                    <input
                                        type="text"
                                        placeholder="Enter your code"
                                        value={codeInput}
                                        onChange={e => setCodeInput(e.target.value)}
                                        required={!codeInput || codeInput.length <= 0}
                                    />
                                </div>
                            </div>
                            <button type="submit" href="/" className="back-btn">
                                {
                                    loading ?
                                        <FontAwesomeIcon icon="fa-solid fa-spinner" />
                                        :
                                        "Send"
                                }
                            </button>
                        </form>
                    </div>
                    :
                    state === "verified"
                        ?
                        <div className="require-box d-flex align-items-center flex-column">
                            <Lottie
                                animationData={verify}
                                loop={true}
                                style={{ width: "50%" }}
                            />;
                            <h2 className="text-center m-0">Change password</h2>
                            <p className="mb-0 text-center">Please input your new password here.</p>
                            <form onSubmit={handleChangePassword}>
                                <div className="input-boxes pb-3">
                                    <div className="input-box">
                                        <FontAwesomeIcon icon="fa-solid fa-lock" />
                                        <input
                                            type="text"
                                            placeholder="Enter your password"
                                            value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
                                            required={!newPassword || newPassword.length <= 0}
                                        />
                                    </div>
                                </div>
                                <button type="submit" href="/" className="back-btn">
                                    {
                                        loading ?
                                            <FontAwesomeIcon icon="fa-solid fa-spinner" />
                                            :
                                            "Send"
                                    }
                                </button>
                            </form>
                        </div>
                        :
                        state === "success"
                            ?
                            <div className="require-box d-flex align-items-center flex-column">
                                <Lottie
                                    animationData={congratulation}
                                    loop={true}
                                    style={{ width: "50%" }}
                                />;
                                <h2 className="text-center m-0">Password was changed</h2>
                                <p className="text-center">Let's come back to login with your new password. If you have any trouble, please contact with us. Thanks for using our services.</p>
                                <div className="w-100">
                                    <button className="back-btn" onClick={() => window.location.href = "/"}>
                                        Back to home
                                    </button>
                                </div>
                            </div>
                            :
                            <div className="require-box d-flex align-items-center flex-column">
                                <Lottie
                                    animationData={password}
                                    loop={true}
                                    style={{ width: "50%" }}
                                />;
                                <h2 className="text-center m-0">Forgot password?</h2>
                                <p className="mb-0 text-center">Enter your email and we'll send a link to reset your password.</p>
                                <form onSubmit={handleSendVerifyCode}>
                                    <div className="input-boxes pb-3">
                                        <div className="input-box">
                                            <FontAwesomeIcon icon="fa-solid fa-envelope" />
                                            <input
                                                type="text"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required={!email || email.length <= 0}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" href="/" className="back-btn">
                                        {
                                            loading ?
                                                <FontAwesomeIcon icon="fa-solid fa-spinner" />
                                                :
                                                "Send"
                                        }
                                    </button>
                                </form>
                            </div>
            }
        </div>
    )
}

export default ForgotPassword;