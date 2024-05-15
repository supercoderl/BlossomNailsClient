import Lottie from "lottie-react";
import notfound from "../../assets/animation/not-found.json";

const LoginRequire = () => {
    const handleNavigate = (path) => {
        window.location.href = path;
    }
    return (
        <div className="require-container">
            <div className="require-box d-flex align-items-center flex-column">
                <Lottie
                    animationData={notfound}
                    loop={true}
                    style={{ width: "50%" }}
                />;
                <h2 className="text-center m-0">Oops!!! Login required</h2>
                <p className="pb-3">To book an appointment, you must log in to continue this process. The account is your information that includes booking orders, information about promotional discounts, ect.   </p>
                <div className="d-flex w-100" style={{ gap: 10 }}>
                    <button href="/" className="back-btn" onClick={() => handleNavigate("/")}>Back to home</button>
                    <button className="go-btn" onClick={() => handleNavigate("/auth")}>Go to login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginRequire;