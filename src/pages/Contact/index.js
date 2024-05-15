import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLocation, faEnvelope, faPhone, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axiosInstance from "../../configs/axios";
import { toast } from "react-toastify";
library.add(faFacebookF, faTwitter, faLinkedinIn, faInstagram, faLocation, faEnvelope, faPhone, faSpinner);

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState({
        fullname: "",
        phone: "",
        email: "",
        notes: "",
        status: "new"
    });

    const clearContact = () => {
        setContact({
            fullname: "",
            phone: "",
            email: "",
            notes: "",
            status: "new"
        });
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axiosInstance.post("Contact/create-contact", contact).then((response) => {
            const result = response.data;
            if (!result) return;
            else if (result.success) {
                toast.success(result.message);
                clearContact();
            }
            else toast.error(result.message);
        }).catch((error) => toast.error(error)).finally(() => setTimeout(() => setLoading(false), 300));
    }

    return (
        <div className="contact-container">
            <span className="big-circle"></span>
            <div className="info-form">
                <div className="contact-info">
                    <h3 className="title">Let's get in touch</h3>
                    <p className="text">
                    Please fill out the form below with your contact information and any specific requests or questions you may have.
                    </p>

                    <div className="info">
                        <div className="information">
                            <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                            <p className="m-0">8c wells place SO50 5PP Eastleigh, UK</p>
                        </div>
                        <div className="information">
                            <FontAwesomeIcon icon="fa-solid fa-envelope" />
                            <p className="m-0">blossom_nails2018@outlook.com</p>
                        </div>
                        <div className="information">
                            <FontAwesomeIcon icon="fa-solid fa-phone" />
                            <p className="m-0">+44 23 8061 3526</p>
                        </div>
                    </div>

                    <div className="social-media">
                        <p>Connect with us :</p>
                        <div className="social-icons">
                            <a href="https://facebook.com/">
                                <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
                            </a>
                            <a href="https://twitter.com/">
                                <FontAwesomeIcon icon="fa-brands fa-twitter" />
                            </a>
                            <a href="https://instagram.com/">
                                <FontAwesomeIcon icon="fa-brands fa-instagram" />
                            </a>
                            <a href="https://linkedin.com/">
                                <FontAwesomeIcon icon="fa-brands fa-linkedin-in" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="contact-form">
                    <span className="circle one"></span>
                    <span className="circle two"></span>

                    <form onSubmit={sendMessage}>
                        <h3 className="title">Contact us</h3>
                        <div className="input-container">
                            <input
                                type="text"
                                name="name"
                                className="input"
                                placeholder="Name"
                                value={contact.fullname}
                                onChange={e => setContact({ ...contact, fullname: e.target.value })}
                                required={!contact.fullname || contact.fullname.length <= 0}
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="email"
                                name="email"
                                className="input"
                                placeholder="Email"
                                value={contact.email}
                                onChange={e => setContact({ ...contact, email: e.target.value })}
                                required={!contact.email || contact.email.length <= 0}
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="tel"
                                name="phone"
                                className="input"
                                placeholder="Phone"
                                value={contact.phone}
                                onChange={e => setContact({ ...contact, phone: e.target.value })}
                                required={!contact.phone || contact.phone.length <= 0 || contact.phone.length > 15}
                            />
                        </div>
                        <div className="input-container textarea">
                            <textarea
                                name="message"
                                className="input"
                                placeholder="Message"
                                value={contact.notes}
                                onChange={e => setContact({ ...contact, notes: e.target.value })}
                                required={!contact.notes || contact.notes.length <= 0}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn">
                            {
                                loading ?
                                    <FontAwesomeIcon icon="fa-solid fa-spinner" />
                                    :
                                    "Send"
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact;