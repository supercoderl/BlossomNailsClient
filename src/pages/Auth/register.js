import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSpinner, faPhone, faL, faF } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axiosInstance from "../../configs/axios";
import { toast } from "react-toastify";
library.add(faEnvelope, faLock, faSpinner, faPhone, faL, faF);

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axiosInstance.post("Auth/register", data).then((response) => {
            const result = response.data;
            if (!result) return;
            else if (result.success) {
                toast.success(result.message);
                window.location.reload();
            }
            else toast.error(result.message);
        }).catch((error) => toast.error(error)).finally(() => setTimeout(() => setLoading(false), 300));
    }

    return (
        <div className="signup-form">
            <div className="title">Signup</div>
            <form action="#" onSubmit={handleSubmit}>
                <div className="input-boxes">
                    <div className="d-flex" style={{ gap: 30 }}>
                        <div className="input-box m-0">
                            <FontAwesomeIcon icon="fa-solid fa-f" />
                            <input
                                type="text"
                                placeholder="First name"
                                value={data.firstname}
                                onChange={e => setData({ ...data, firstname: e.target.value })}
                                required={!data.firstname || data.firstname.length <= 0}
                            />
                        </div>
                        <div className="input-box m-0">
                            <FontAwesomeIcon icon="fa-solid fa-l" />
                            <input
                                type="text"
                                placeholder="Last name"
                                value={data.lastname}
                                onChange={e => setData({ ...data, lastname: e.target.value })}
                                required={!data.lastname || data.lastname.length <= 0}
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <FontAwesomeIcon icon="fa-solid fa-envelope" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={data.username}
                            onChange={e => setData({ ...data, username: e.target.value })}
                            required={!data.username || data.username.length <= 0}
                        />
                    </div>
                    <div className="input-box">
                        <FontAwesomeIcon icon="fa-solid fa-lock" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={e => setData({ ...data, password: e.target.value })}
                            required={!data.password || data.password.length <= 0}
                        />
                    </div>
                    <div className="input-box">
                        <FontAwesomeIcon icon="fa-solid fa-phone" />
                        <input
                            type="password"
                            placeholder="Phone"
                            value={data.phone}
                            onChange={e => setData({ ...data, phone: e.target.value })}
                            required={!data.phone || data.phone.length <= 0}
                        />
                    </div>
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
                    <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login now</label></div>
                </div>
            </form>
        </div>
    )
}

export default Register;