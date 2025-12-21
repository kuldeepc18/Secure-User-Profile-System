import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/auth.css";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            navigate("/profile");
        } catch {
            alert("Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <h2>Welcome Back</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                        </div>

                        <button 
                            className="primary-btn" 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <button
                        className="link-btn"
                        onClick={() => navigate("/register")}
                    >
                        Don't have an account? Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
