import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fas from "@fortawesome/free-solid-svg-icons";
import * as far from "@fortawesome/free-regular-svg-icons";
library.add(fas.faStar, far.faStar, far.faStarHalfStroke);

const FeedbackSection = () => {
    return (
        <div className="testimonial-area section-bg pt-100 pb-70">
            <div className="container">
                <div className="section-title mb-45 text-center">
                    <span className="sub-title">Our feedback</span>
                    <h2>What Our Customers Say?</h2>
                </div>
                <div className="testimonial-slider">
                    <div className="d-flex align-items-center justify-content-center" style={{ height: "363.8px" }}>
                        <div className="owl-item cloned" style={{ width: "412px", marginRight: "30px" }}>
                            <div className="testimonial-item">
                                <img src="https://media.licdn.com/dms/image/C5603AQF8ooJWmOoPVA/profile-displayphoto-shrink_800_800/0/1600704311570?e=2147483647&v=beta&t=s_tleTE5ntmnkk9Acx0KGXRJyNBBTvjA9HGAwwxkf0E" alt="Testimonial" />
                                <h3>Emily Johnson</h3>
                                <p>My recent visit to Blossom Nails was fantastic, every moment was enjoyable. Huge thanks to the team at Blossom Nails for such a great experience!</p>
                                <div className="rating">
                                    <FontAwesomeIcon icon="fa-solid fa-star" />
                                    <FontAwesomeIcon icon="fa-solid fa-star" />
                                    <FontAwesomeIcon icon="fa-solid fa-star" />
                                    <FontAwesomeIcon icon="fa-regular fa-star" />
                                    <FontAwesomeIcon icon="fa-regular fa-star" />
                                </div>
                            </div>
                        </div>
                        <div className="owl-item cloned" style={{ width: "412px", marginRight: "30px" }}>
                            <div className="testimonial-item">
                                <img src="https://media.licdn.com/dms/image/D4E03AQERpjE5Zurfpw/profile-displayphoto-shrink_800_800/0/1694524329034?e=2147483647&v=beta&t=4V26wHQSGjxYC8dJv23n4Udi83M-UAjFRpHIf1tXx1Q" alt="Testimonial" />
                                <h3>Sophia Patel</h3>
                                <p>Overall, my experience at Blossom Nails exceeded all expectations. I left feeling rejuvenated, with nails that looked and felt amazing.</p>
                                <div className="rating">
                                    <FontAwesomeIcon icon="fa-solid fa-star" />
                                    <FontAwesomeIcon icon="fa-solid fa-star" />
                                    <FontAwesomeIcon icon="fa-solid fa-star" />
                                    <FontAwesomeIcon icon="fa-solid fa-star" />
                                    <FontAwesomeIcon icon="fa-regular fa-star" />
                                </div>
                            </div>
                        </div>
                        <div className="owl-item cloned active" style={{ width: "412px", marginRight: "30px" }}>
                            <div className="testimonial-item">
                                <img src="https://www.famousbirthdays.com/headshots/valeria-rodr--guez-5.jpg" />
                                <h3>Sarah Rodriguez</h3>
                                <p>I highly recommend Blossom Nails to anyone looking for top-notch nail services in a welcoming environment. Thank you to the entire team for the wonderful experience!</p>
                                <div className="rating">
                                    <FontAwesomeIcon icon="fa-solid fa-star" />
                                    <FontAwesomeIcon icon="fa-solid fa-star" />
                                    <FontAwesomeIcon icon="fa-solid fa-star" />
                                    <FontAwesomeIcon icon="fa-solid fa-star" />
                                    <FontAwesomeIcon icon="fa-regular fa-star-half-stroke" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedbackSection;