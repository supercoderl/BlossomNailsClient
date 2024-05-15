import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
library.add(faAngleRight, faAngleLeft);

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 767, min: 646 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const ButtonGroup = ({ next, previous }) => {
    return (
        <div className="arrow-carousel-group position-absolute w-98 start-50 translate-middle-x">
            <button className="position-absolute" onClick={() => previous()}>
                <FontAwesomeIcon icon="fa-solid fa-angle-left" />
            </button>
            <button className="position-absolute end-0" onClick={() => next()}>
                <FontAwesomeIcon icon="fa-solid fa-angle-right" />
            </button>
        </div>
    );
};

const FeatureSection = () => {
    return (
        <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            partialVisible={false}
            containerClass="pt-100"
            customButtonGroup={<ButtonGroup />}
            arrows={false}
            className="position-relative"
            autoPlaySpeed={2000}
        >
            <div className="owl-item cloned">
                <div className="item">
                    <div className="spa-service-box">
                        <div className="icon-bx-wraper center text-center">
                            <div className="icon-xl text-primary mb-10">
                                <a href="#" className="icon-cell">
                                    <img src="https://cdn-icons-png.flaticon.com/128/946/946468.png" alt="" />
                                </a>
                            </div>
                            <div className="icon-content">
                                <h3 className="dez-tilte font-weight-600">Relish In Rest</h3>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod..</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="owl-item cloned">
                <div className="item">
                    <div className="spa-service-box">
                        <div className="icon-bx-wraper center text-center">
                            <div className="icon-xl text-primary mb-10">
                                <a href="#" className="icon-cell">
                                    <img src="https://cdn-icons-png.flaticon.com/128/40/40720.png" alt="" />
                                </a>
                            </div>
                            <div className="icon-content">
                                <h3 className="dez-tilte font-weight-600">Trendy Hair Style</h3>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod..</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="owl-item cloned">
                <div className="item">
                    <div className="spa-service-box">
                        <div className="icon-bx-wraper center text-center">
                            <div className="icon-xl text-primary mb-10">
                                <a href="#" className="icon-cell">
                                    <img src="https://cdn-icons-png.flaticon.com/128/599/599750.png" alt="" />
                                </a>
                            </div>
                            <div className="icon-content">
                                <h3 className="dez-tilte font-weight-600">Pebble Treatment</h3>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod..</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="owl-item cloned">
                <div className="item">
                    <div className="spa-service-box">
                        <div className="icon-bx-wraper center text-center">
                            <div className="icon-xl text-primary mb-10">
                                <a href="#" className="icon-cell">
                                    <img src="https://cdn-icons-png.flaticon.com/128/40/40720.png" alt="" />
                                </a>
                            </div>
                            <div className="icon-content">
                                <h3 className="dez-tilte font-weight-600">Trendy Hair Style</h3>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod..</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="owl-item cloned">
                <div className="item">
                    <div className="spa-service-box">
                        <div className="icon-bx-wraper center text-center">
                            <div className="icon-xl text-primary mb-10">
                                <a href="#" className="icon-cell">
                                    <img src="https://cdn-icons-png.flaticon.com/128/599/599750.png" alt="" />
                                </a>
                            </div>
                            <div className="icon-content">
                                <h3 className="dez-tilte font-weight-600">Pebble Treatment</h3>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod..</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Carousel >
    )
}

export default FeatureSection;