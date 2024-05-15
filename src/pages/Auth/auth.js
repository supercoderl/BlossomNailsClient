import Login from "./login";
import Register from "./register";

const Auth = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <input type="checkbox" id="flip" />
                <div className="cover">
                    <div className="front">
                        <img src="https://orionxoxo.lk/cdn/shop/products/romand-mood-pebble-nail-16-mamang-berry-makeup-romand-orion-xo-sri-lanka-114056.webp?v=1679434894&width=1500" alt="" />
                        <div className="text">
                            <span className="text-1">Every new friend is a <br /> new adventure</span>
                            <span className="text-2">Let's get connected</span>
                        </div>
                    </div>
                    <div className="back">
                        <div className="text">
                            <span className="text-1">Complete miles of journey <br /> with one step</span>
                            <span className="text-2">Let's get started</span>
                        </div>
                    </div>
                </div>
                <div className="forms">
                    <div className="form-content">
                        <Login />
                        <Register />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;