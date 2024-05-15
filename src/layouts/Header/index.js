import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import AuthService from "../../services/auth";
library.add(faCalendar, faMagnifyingGlass);

const Header = () => {
    const user = AuthService.getUser();
    const [showDropdown, setShowDropdown] = useState({});
    const [showNavbarMobile, setShowNavbarMobile] = useState(false);

    const handleMouseEnter = (menuId) => {
        const newShowDropdown = {};
        Object.keys(showDropdown).forEach(id => {
            newShowDropdown[id] = id === menuId;
        });
        setShowDropdown({ ...newShowDropdown, [menuId]: true });
    };

    const handleMouseLeave = () => {
        setShowDropdown({});
    };

    const handleLogout = async () => {
        await AuthService.logout();
    }

    return (
        <header className={`main-header position-sticky`}>
            <div className="header-upper">
                <div className="container-fluid clearfix">
                    <div className="header-inner d-flex align-items-center bg-white">
                        <div className="logo-outer">
                            <div className="logo"><a href="/"><img src="https://blossom-nails.web.app/static/media/logo3.c742be5ecb2e71b630f7.png" alt="Logo" title="Logo" /></a></div>
                        </div>

                        <div className="nav-outer clearfix">
                            <nav className="main-menu navbar-expand-lg">
                                <div className="navbar-header">
                                    <button
                                        type="button"
                                        className="navbar-toggle"
                                        data-toggle="collapse"
                                        data-target=".navbar-collapse"
                                        onClick={() => setShowNavbarMobile(!showNavbarMobile)}
                                    // onMouseLeave={() => setShowNavbarMobile(false)}
                                    >
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>

                                    <div className="mobile-logo p-15 m-auto">
                                        <a href="/">
                                            <img src="https://blossom-nails.web.app/static/media/logo3.c742be5ecb2e71b630f7.png" alt="Logo" title="Logo" />
                                        </a>
                                    </div>
                                </div>

                                <div className={`navbar-collapse collapse clearfix ${showNavbarMobile && 'show'}`}>
                                    <ul className="navigation clearfix m-0">
                                        <li className="dropdown">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="dropdown">
                                            <a href="/pricing">Pricing</a>
                                        </li>
                                        <li className="dropdown">
                                            <a href="/contact">Contact</a>
                                        </li>
                                        <li className="dropdown" onMouseEnter={() => handleMouseEnter("account")} onMouseLeave={() => handleMouseLeave("account")}>
                                            <a>account</a>
                                            <ul className={`p-0 ${showDropdown["account"] ? 'd-block' : 'd-none'}`}>
                                                {
                                                    user ?
                                                        <>
                                                            <li><a href="/auth">Profile</a></li>
                                                            <li><a href="#" onClick={handleLogout}>Logout</a></li>
                                                        </>
                                                        :
                                                        <>
                                                            <li><a href="/auth">Login</a></li>
                                                            <li><a href="/auth">Register</a></li>
                                                        </>
                                                }
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>

                        <div className="book-btn hero-btn wow fadeInUp delay-0-4s">
                            <a href={user ? '/booking' : '/error/login-require'} className="theme-btn">
                                <FontAwesomeIcon icon="fa-regular fa-calendar" />
                                Booking Now
                            </a>
                        </div>

                        <div className="mobile-book-btn hero-btn wow fadeInUp delay-0-4s">
                            <a href={user ? '/booking' : '/error/login-require'}>
                                <FontAwesomeIcon icon="fa-regular fa-calendar" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;