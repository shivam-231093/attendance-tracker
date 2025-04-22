// PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const PrivateRoute = () => {
    const { currentUser } = useAuth();
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export const SettingsRoute = () => {
    const { profileCompleted } = useAuth();
    return profileCompleted ? <Outlet /> : <Navigate to="/profile" />;
};
