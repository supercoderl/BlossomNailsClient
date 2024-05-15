import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight, faCheck } from '@fortawesome/free-solid-svg-icons';
library.add(faLongArrowAltRight, faCheck);

const AboutSection = () => {
    return (
        <section className="about-section pt-100 rpt-100">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="about-left rmb-55 wow fadeInLeft delay-0-2s">
                            <img src={`https://static.vecteezy.com/system/resources/previews/021/565/209/original/but-first-nails-lettering-about-nails-illustration-for-nail-studio-manicure-master-and-beauty-salon-image-can-be-used-for-greeting-cards-and-posters-isolated-on-white-background-vector.jpg`} alt="About" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-content wow fadeInRight delay-0-2s">
                            <div className="section-title mb-30">
                                <span className="sub-title">Who We Are</span>
                                <h2>Quality & Natural Beauty Salon</h2>
                            </div>
                            <p>Sed ut persiciatis unde omnis iste natus error sit voluptate maccusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explic aboemo enim ipsa</p>
                            <ul className="list-style-one pt-20 pb-25 px-0">
                                <li>
                                    <div className="icon-bg">
                                        <FontAwesomeIcon icon="fa-solid fa-check" />
                                    </div>
                                    Natural Beauty Salon
                                </li>
                                <li>
                                    <div className="icon-bg">
                                        <FontAwesomeIcon icon="fa-solid fa-check" />
                                    </div>
                                    Professional Women Spa Service
                                </li>
                                <li>
                                    <div className="icon-bg">
                                        <FontAwesomeIcon icon="fa-solid fa-check" />
                                    </div>
                                    Experience Hair Treatments
                                </li>
                            </ul>
                            <a href="/" className="theme-btn style-two">read more <FontAwesomeIcon icon="fas fa-long-arrow-alt-right" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection;