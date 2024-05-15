import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
library.add(faFacebookF, faTwitter, faLinkedin, faInstagram, faPhone, faLocationDot, faEnvelope, faPaperPlane);

const Footer = () => {
    return (
        <>
            <footer className="footer-area footer-bg">
                <div className="container pt-100 pb-70">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6">
                            <div className="footer-widget pe-5">
                                <div className="footer-logo">
                                    <a href="index.html">
                                        <img src="https://blossom-nails.web.app/static/media/logo3.c742be5ecb2e71b630f7.png" className="footer-logo" alt="Images" />
                                    </a>
                                </div>
                                <p>
                                    At Blossom Nails, we pride ourselves on delivering exceptional nail care experiences tailored to each client's unique preferences.
                                </p>
                                <ul className="social-link">
                                    <li>
                                        <a href="https://www.facebook.com/" target="_blank">
                                            <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/" target="_blank">
                                            <FontAwesomeIcon icon="fa-brands fa-twitter" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://instagram.com/" target="_blank">
                                            <FontAwesomeIcon icon="fa-brands fa-instagram" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/" target="_blank">
                                            <FontAwesomeIcon icon="fa-brands fa-linkedin" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-widget pe-2">
                                <h3>Our Newsletter</h3>
                                <form className="newsletter-form" data-toggle="validator" method="POST" noValidate={true}>
                                    <input type="email" className="form-control" placeholder="Enter Your Email Address" name="EMAIL" required="" autoComplete="off" />
                                    <button className="subscribe-btn disabled" type="submit" style={{ pointerEvents: "all", cursor: "pointer" }}>
                                        Subscribe Now <FontAwesomeIcon icon="fa-regular fa-paper-plane" />
                                    </button>
                                    <div id="validator-newsletter" className="form-result"></div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-6">
                            <div className="footer-widget ps-4">
                                <h3>Salon Hours</h3>
                                <ul className="salon-hours">
                                    <li>
                                        <div className="content">
                                            <h3>Monday - Saturday</h3>
                                            <span>09:00 AM - 06:00 PM </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="content">
                                            <h3>Sunday</h3>
                                            <span>closed </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-widget ps-3">
                                <h3>Get In Touch</h3>
                                <ul className="footer-contact">
                                    <li>
                                        <FontAwesomeIcon icon="fa-solid fa-phone" />
                                        <div className="content">
                                            <h4 className="m-0">Contact Us</h4>
                                            <span><a href="tel:+123456778" target="_blank">+44 23 8061 3526</a></span>
                                        </div>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon="fa-solid fa-envelope" />
                                        <div className="content">
                                            <h4 className="m-0">Email:</h4>
                                            <span><a href="mailto:hello@naon.com" target="_blank">blossom_nails2018@outlook.com</a></span>
                                        </div>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                                        <div className="content">
                                            <h4 className="m-0">Address</h4>
                                            <span>8c wells place SO50 5PP Eastleigh, UK</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="copyright-area">
                <div className="container">
                    <div className="copy-right-text text-center">
                        <p>Copyright @ 2024 <b>Blossom Nails</b> All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;