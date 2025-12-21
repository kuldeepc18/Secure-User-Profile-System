import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/auth.css";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        aadhaar: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/auth/register", formData);
            alert("Registration successful! Please login.");
            navigate("/");
        } catch {
            alert("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <h2>Create Account</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input 
                                name="name" 
                                placeholder="Enter your full name" 
                                onChange={handleChange}
                                value={formData.name}
                                required
                            />
                        </div>

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
                                placeholder="Create a password"
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Aadhaar Number</label>
                            <input 
                                name="aadhaar" 
                                placeholder="Enter your Aadhaar number" 
                                onChange={handleChange}
                                value={formData.aadhaar}
                                required
                            />
                        </div>

                        <button 
                            className="primary-btn" 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Register"}
                        </button>
                    </form>

                    <button
                        className="link-btn"
                        onClick={() => navigate("/")}
                    >
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;
