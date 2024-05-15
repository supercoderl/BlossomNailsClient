import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
library.add(faLongArrowAltRight);

const HeroSection = () => {
    return (
        <section className="hero-section rel z-1 bg-butter">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-8 col-sm-10">
                        <div className="hero-content mt-200 mb-220">
                            <h1 className="wow fadeInUp delay-0-2s">Blossom Nails Express Yourself</h1>
                            <div className="hero-btn mt-30 wow fadeInUp delay-0-4s">
                                <a href="/" className="theme-btn">Learn more <FontAwesomeIcon icon="fas fa-long-arrow-alt-right" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hero-right-image" style={{ backgroundImage: `url("https://mitty.com.au/cdn/shop/products/Love-fever-CIRCLE_1200x1200.jpg?v=1636674762")` }}></div>
        </section>
    )
}

export default HeroSection;