import { useState, useRef, useEffect } from "react";
import "./Navbar.css";

import {
  Search,
  Bell,
  Menu,
  X,
  User,
  Home,
  Plus,
  FileText,
  Map,
  CircleHelp,
  LogOut,
} from "lucide-react";

import { NavLink, Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../auth/useAuth.jsx";
import { logoutRequest } from "../../../utils/logoutRequest.jsx";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  async function handleLogout() {
    console.log("Logging out...");

    try {
      await logoutRequest();
    } catch (err) {
      console.error(err);
    } finally {
      logout();
      navigate("/");
    }
  }

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

      {/* =========================
          BRAND
      ========================== */}
      <div className="navbar-brand-row">

        <Link to="/" className="logo">
          <div className="logo-mark">
            <Plus size={22} strokeWidth={3} />
          </div>

          <span className="logo-text">
            <strong>Jan</strong>Solve
          </span>
        </Link>

        {/* Mobile close button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>


      {/* =========================
          PROFILE
      ========================== */}

      {currentUser ? (
        <div className="sidebar-profile" ref={menuRef}>

          <button
            className="profile-card"
            onClick={() => setShowDropdown((prev) => !prev)}
          >

            <div className="profile-avatar">
              {currentUser.name
                ? currentUser.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div className="profile-info">
              <strong>
                {currentUser.name.toUpperCase() || "Citizen"}
              </strong>

              <span>My civic space</span>
            </div>

            <span className="profile-arrow">›</span>

          </button>


          {/* Profile dropdown */}
          {showDropdown && (
            <div className="profile-dropdown">

              <button
                onClick={() => {
                  navigate("/profile");
                  setShowDropdown(false);
                }}
              >
                <User size={17} />
                Profile
              </button>

              <button
                onClick={() => {
                  setShowDropdown(false);
                  handleLogout();
                }}
              >
                <LogOut size={17} />
                Logout
              </button>

            </div>
          )}

        </div>
      ) : (
        <button
          className="signin-sidebar"
          onClick={() => navigate("/login")}
        >
          <User size={18} />
          <span>Sign In</span>
        </button>
      )}


      {/* =========================
          NAVIGATION
      ========================== */}

      <nav className={`nav-links ${menuOpen ? "show" : ""}`}>

        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          <Home size={18} />
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/issues/new"
          onClick={() => setMenuOpen(false)}
        >
          <Plus size={19} />
          <span>Report a problem</span>
        </NavLink>

        <NavLink
          to="/my-reports"
          onClick={() => setMenuOpen(false)}
        >
          <FileText size={18} />
          <span>My reports</span>
        </NavLink>

        {/* Keeps existing routing logic */}
        <NavLink
          to="/nearbyissues"
          onClick={() => setMenuOpen(false)}
        >
          <Map size={18} />
          <span>Nearby issues</span>
        </NavLink>

      </nav>


      {/* =========================
          SIDEBAR BOTTOM
      ========================== */}

      <div className="sidebar-bottom">

        <button className="sidebar-bottom-item">
          <Bell size={17} />
          <span>Notifications</span>

          <span className="notification-badge">
            3
          </span>
        </button>

        <button className="sidebar-bottom-item">
          <CircleHelp size={17} />
          <span>Help & profile</span>
        </button>

      </div>


      {/* =========================
          DESKTOP TOP ACTIONS
      ========================== */}

      <div className="navbar-top-actions">

        <button className="top-icon-btn">
          <Search size={20} />
        </button>

        <button className="top-icon-btn notification-btn">
          <Bell size={20} />
          <span />
        </button>

        {currentUser && (
          <div className="top-avatar">
            {currentUser.username
              ? currentUser.username.charAt(0).toUpperCase()
              : "U"}
          </div>
        )}

      </div>


      {/* =========================
          MOBILE MENU
      ========================== */}

      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>

        <Link to="/" onClick={() => setMenuOpen(false)}>
          <Home size={18} />
          Home
        </Link>

        <Link
          to="/my-reports"
          onClick={() => setMenuOpen(false)}
        >
          <FileText size={18} />
          My reports
        </Link>

         <Link
          to="/nearbyissues"
          onClick={() => setMenuOpen(false)}
        >
          <Map size={18} />
          Nearby issues
        </Link>

        <Link
          to="/issues/new"
          onClick={() => setMenuOpen(false)}
        >
          <Plus size={18} />
          Report a problem
        </Link>

        <hr />

        {currentUser ? (
          <>
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
            >
              <User size={18} />
              Profile
            </Link>

            <button
              className="mobile-logout-btn"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <User size={18} />
              Sign In
            </Link>

            <Link to="/register">
              Create account
            </Link>
          </>
        )}

      </div>

    </header>
  );
}