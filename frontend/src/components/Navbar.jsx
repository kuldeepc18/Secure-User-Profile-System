import { useNavigate, useLocation } from "react-router-dom";
import { logout, isAuthenticated } from "../utils/auth";
import "../styles/navbar.css";

function Navbar({ theme, toggleTheme }) {
    const navigate = useNavigate();
    const location = useLocation();
    const authenticated = isAuthenticated();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand" onClick={() => navigate("/")}>
                    <span className="brand-icon">🔐</span>
                    <span className="brand-text">SecureProfile</span>
                </div>

                <div className="navbar-actions">
                    <button 
                        className="theme-toggle" 
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>

                    {authenticated && location.pathname === "/profile" && (
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
