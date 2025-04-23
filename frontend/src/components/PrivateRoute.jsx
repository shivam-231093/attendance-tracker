import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SideBar from './SideBar';

export const PrivateRoute = () => {
    const { currentUser } = useAuth();

    // Redirect to login if not authenticated
    if (!currentUser) return <Navigate to="/login" />;

    // User is authenticated, render outlet
    return <Outlet />;
};

export const ProfileGuard = () => {
    const { profileCompleted } = useAuth();
    const location = useLocation();

    // If profile not completed and trying to access any route other than /profile
    if (!profileCompleted && location.pathname !== '/profile') {
        return <Navigate to="/profile" />;
    }

    return <Outlet />;
};

export const MainLayout = () => {
    const { profileCompleted } = useAuth();

    return (
        <div className='flex flex-row w-auto'>
        {/* Only show sidebar if profile is completed */}
        {profileCompleted && <SideBar />}
        <div className="flex-grow">
        <Outlet />
        </div>
        </div>
    );
};
