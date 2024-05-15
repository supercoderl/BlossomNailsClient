import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faClock } from "@fortawesome/free-regular-svg-icons";
library.add(faLongArrowAltRight, faClock, faCalendar);

const BookingSection = () => {
    return (
        <section className="booking-section pb-20">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="booking-item">
                            <div className="booking-image wow fadeInUp delay-0-2s" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1616427592814-195c30c24ea3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5haWwlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D")` }}></div>
                            <div className="booking-content wow fadeInUp delay-0-4s">
                                <h3>Working Hours</h3>
                                <p>Welcome to Blossom Nails, where beauty meets precision.</p>
                                <ul className="p-0">
                                    <li>
                                        <FontAwesomeIcon icon="far fa-clock" />
                                        <div className="booking-info">
                                            <p>Mon to Sat: 9:00 am — 6:00 pm <br />Sun: closed</p>
                                            <a href="/booking" className="theme-btn">
                                                <FontAwesomeIcon icon="fa-solid fa-calendar" />
                                                Booking Now
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="booking-item">
                            <div className="booking-image wow fadeInUp delay-0-6s" style={{ backgroundImage: `url("https://www.peacefuldumpling.com/wp-content/uploads/2016/11/How-to-do-your-nails-at-home-gel-manicure.jpg")` }}></div>
                            <div className="booking-content wow fadeInUp delay-0-8s">
                                <h3>Contact us</h3>
                                <p>Whether you have a question, feedback, or simply want to say hello, our 'Contact Us' page isn't just a formality - it's a gateway to building a stronger relationship with you.</p>
                                <ul className="p-0">
                                    <li>
                                        <FontAwesomeIcon icon="far fa-clock" />
                                        <div className="booking-info">
                                            <h5>Location</h5>
                                            <p>8c wells place SO50 5PP Eastleigh, UK</p>
                                        </div>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon="far fa-clock" />
                                        <div className="booking-info">
                                            <h5>Hotline</h5>
                                            <p>Call : +44 23 8061 3526</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookingSection;