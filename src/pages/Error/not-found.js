import Lottie from "lottie-react";
import notfound from "../../assets/animation/not-found1.json";

const NotFound = () => {
    return (
        <div id="error-page">
            <div class="content">
                <Lottie
                    animationData={notfound}
                    loop={true}
                />;
                <h4 data-text="Opps! Page not found">
                    Opps! Page not found
                </h4>
                <p>
                    Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.
                </p>
                <div class="btns">
                    <a href="/">return home</a>
                    <a href="/">report problem</a>
                </div>
            </div>
        </div>
    )
}

export default NotFound;