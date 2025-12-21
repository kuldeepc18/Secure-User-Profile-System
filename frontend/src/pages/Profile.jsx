import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/auth.css";

function Profile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await api.get("/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProfile(res.data);
            } catch {
                alert("Failed to fetch profile");
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return (
            <div className="loading-container">
                <p className="loading-text">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="profile-card">
                    <h2>User Profile</h2>

                    <div className="profile-info">
                        <div className="profile-item">
                            <strong>Full Name</strong>
                            <span>{profile.name}</span>
                        </div>

                        <div className="profile-item">
                            <strong>Email Address</strong>
                            <span>{profile.email}</span>
                        </div>

                        <div className="profile-item">
                            <strong>Aadhaar Number</strong>
                            <span>{profile.aadhaar}</span>
                        </div>

                        <div className="profile-item">
                            <strong>Member Since</strong>
                            <span>{new Date(profile.createdAt).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
