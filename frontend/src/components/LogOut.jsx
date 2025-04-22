import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await logout();
                toast.success("Logged out successfully");
                navigate('/login');
            } catch (error) {
                toast.error("Error logging out");
                navigate('/');
            }
        };

        performLogout();
    }, [logout, navigate]);

    return null; // No rendering needed
};

export default Logout;
