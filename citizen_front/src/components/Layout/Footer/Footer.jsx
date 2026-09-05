import "./Footer.css";
import {
    MapPin,
    Mail,
    Phone,
} from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="container">

                <div className="footer-grid">

                    {/* Brand */}

                    <div className="footer-brand">

                        <h2>StayConnect</h2>

                        <p>
                            Discover unique stays, connect with trusted
                            hosts, and explore unforgettable destinations
                            across India.
                        </p>

                        <div className="social-links">

                            <a href="#">
                                <FaFacebookF size={20} />
                            </a>

                            <a href="#">
                                <FaInstagram size={20} />
                            </a>

                            <a href="#">
                                <FaTwitter size={20} />
                            </a>

                            <a href="#">
                                <FaLinkedinIn size={20} />
                            </a>

                        </div>

                    </div>

                    {/* Explore */}

                    <div className="footer-links">

                        <h3>Explore</h3>

                        <Link to="/">Home</Link>

                        <Link to="/listings">
                            Listings
                        </Link>

                        <Link to="/listings/new">
                            List Your Property
                        </Link>

                    </div>

                    {/* Company */}

                    <div className="footer-links">

                        <h3>Company</h3>

                        <Link to="/about">
                            About
                        </Link>

                        <Link to="/contact">
                            Contact
                        </Link>

                        <Link to="/privacy">
                            Privacy Policy
                        </Link>

                    </div>

                    {/* Contact */}

                    <div className="footer-contact">

                        <h3>Contact</h3>

                        <p>
                            <MapPin size={18} />
                            Pune, Maharashtra
                        </p>

                        <p>
                            <Mail size={18} />
                            support@stayconnect.com
                        </p>

                        <p>
                            <Phone size={18} />
                            +91 9876543210
                        </p>

                    </div>

                </div>

                <div className="footer-bottom">

                    © {new Date().getFullYear()} StayConnect • Built with MERN Stack

                </div>

            </div>
        </footer>
    );
}

export default Footer;