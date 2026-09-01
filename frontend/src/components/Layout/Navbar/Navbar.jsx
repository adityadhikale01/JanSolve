import { useState,useRef,useEffect } from "react";
import "./Navbar.css";
import {
  Globe,
  Heart,
  Menu,
  X,
  User,
  Form,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";


import { useAuth } from "../../../auth/useAuth.jsx";
import { logoutRequest } from "../../../utils/logoutRequest.jsx";
export default function Navbar() {
  const { currentUser, logout } = useAuth();
  

async function handleLogout() {
  console.log("Logging out...");
  try {
    await logoutRequest();
  } catch (err) {
    console.error(err);
  } finally {
    logout(); // Clear AuthContext
    navigate("/");
  }
}
  
  const [showDropdown, setShowDropdown] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  

  const menuRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          setShowDropdown(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-circle">S</div>
          <span>StayConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links" >
          
          <NavLink to="/">Home</NavLink>
          <NavLink to="/listings">Listings</NavLink>
          <NavLink to="/listings/new">Add Listing</NavLink>
          
        </nav>

        {/* Desktop Right */}
        <div className="navbar-right">
          {/* Icons */}
          <button className="icon-btn">
            <Globe size={20} />
          </button>

          <button className="icon-btn">
            <Heart size={20} />
          </button>

          {/* Profile Button */}
          {currentUser ? (
              <div className="profile-menu" ref={menuRef}>
                <button
                  className="profile-btn"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  <User size={18} />
                  <span>{currentUser.username || "Profile"}</span>
                </button>

                {showDropdown && (
                  <div className="profile-dropdown">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setShowDropdown(false);
                      }}
                    >
                      Profile
                    </button>

                    <button
                      onClick={() => {
                         // remove token & user from context
                        setShowDropdown(false);
                        handleLogout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="profile-btn"
                onClick={() => navigate("/login")}
              >
                <User size={18} />
                <span>Sign In</span>
              </button>
            )}


        

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}

      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
      
          <Link to="/">Home</Link>
          <Link to="/listings">Listings</Link>
          <Link to="/listings/new">Add Listing</Link>
          

        <hr />
                  
                  {currentUser ? (
            <>
              <Link to="/profile">Profile</Link>


               
              <button
                className="mobile-logout-btn"
                onClick={() => {
                 
                  handleLogout();
                  setMenuOpen(false);
                  
                }}
              >
                Logout
              </button>
             
            </>
          ) : (
            <>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
      </div>
    </header>
  );
}
