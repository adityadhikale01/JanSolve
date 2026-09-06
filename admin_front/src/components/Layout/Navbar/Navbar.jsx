import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Layers3,
  Building2,
  ClipboardList,
  FolderKanban,
  BarChart3,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./Navbar.css";

import { useAuth } from "../../../auth/useAuth.jsx";
import { logoutRequest } from "../../../utils/logoutRequest.jsx";

function Navbar({ collapsed, setCollapsed }) {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  // const [collapsed, setCollapsed] = useState(false);

  async function handleLogout() {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      logout();
      navigate("/login");
    }
  }

  
  const navigation = [
    {
      label: "Overview",
      items: [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: "Problem Management",
      items: [
        {
          name: "Reports",
          path: "/reports",
          icon: FileText,
        },
        {
          name: "Master Problems",
          path: "/master-problems",
          icon: Layers3,
        },
      ],
    },
    {
      label: "Innovation Network",
      items: [
        {
          name: "Universities",
          path: "/universities",
          icon: Building2,
        },
        {
          name: "Assignments",
          path: "/assignments",
          icon: ClipboardList,
        },
        {
          name: "Projects",
          path: "/projects",
          icon: FolderKanban,
        },
      ],
    },
    {
      label: "Insights",
      items: [
        {
          name: "Analytics",
          path: "/analytics",
          icon: BarChart3,
        },
      ],
    },
  ];

  const authNavigation = [
    {
      name: "Sign in",
      path: "/login",
      icon: LogIn,
    },
   
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="admin-navbar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        className="admin-mobile-menu-btn"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>

      <aside
        className={`admin-sidebar
          ${collapsed ? "admin-sidebar-collapsed" : ""}
          ${mobileOpen ? "admin-sidebar-mobile-open" : ""}
        `}
      >
        {/* Brand */}
        <div className="admin-sidebar-brand">
          <NavLink
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="admin-brand-link"
            onClick={() => setMobileOpen(false)}
          >
            <div className="admin-brand-mark">
              J
            </div>

            {!collapsed && (
              <div className="admin-brand-text">
                <span className="admin-brand-name">
                  JanSolve
                </span>

                <span className="admin-brand-role">
                  ADMIN PORTAL
                </span>
              </div>
            )}
          </NavLink>

          {/* Mobile close */}
          <button
            className="admin-mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="admin-navigation">
          {isAuthenticated ? (
            navigation.map((section) => (
              <div
                className="admin-nav-section"
                key={section.label}
              >
                {!collapsed && (
                  <div className="admin-nav-section-label">
                    {section.label}
                  </div>
                )}

                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end
                      className={({ isActive }) =>
                        `admin-nav-link ${
                          isActive ? "admin-nav-link-active" : ""
                        }`
                      }
                      onClick={() => setMobileOpen(false)}
                      title={collapsed ? item.name : ""}
                    >
                      <Icon
                        className="admin-nav-icon"
                        size={19}
                      />

                      {!collapsed && (
                        <span>{item.name}</span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="admin-nav-section">
              {!collapsed && (
                <div className="admin-nav-section-label">
                  Authentication
                </div>
              )}

              {authNavigation.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      `admin-nav-link ${
                        isActive ? "admin-nav-link-active" : ""
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? item.name : ""}
                  >
                    <Icon className="admin-nav-icon" size={19} />

                    {!collapsed && <span>{item.name}</span>}
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom section */}
        <div className="admin-sidebar-bottom">
          {isAuthenticated && (
            <>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `admin-nav-link ${
                    isActive ? "admin-nav-link-active" : ""
                  }`
                }
                onClick={() => setMobileOpen(false)}
                title={collapsed ? "Settings" : ""}
              >
                <Settings size={19} />

                {!collapsed && <span>Settings</span>}
              </NavLink>

              {/* Admin profile */}
              <div className="admin-profile">
                <div className="admin-profile-avatar">
                  {currentUser?.name
                    ? currentUser.name
                        .charAt(0)
                        .toUpperCase()
                    : "A"}
                </div>

                {!collapsed && (
                  <div className="admin-profile-info">
                    <span className="admin-profile-name">
                      {currentUser?.name || "Administrator"}
                    </span>

                    <span className="admin-profile-role">
                      {currentUser?.role || "System Administrator"}
                    </span>
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                className="admin-logout-btn"
                onClick={handleLogout}
                title={collapsed ? "Logout" : ""}
              >
                <LogOut size={19} />

                {!collapsed && <span>Logout</span>}
              </button>
            </>
          )}
        </div>

        {/* Collapse button */}
        <button
          className="admin-sidebar-collapse"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </aside>
    </>
  );
}

export default Navbar;
