import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { LogOut, User, Home } from 'lucide-react';

interface NavbarProps {
  userRole?: 'customer' | 'worker';
  userName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ userRole, userName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    navigate('/');
  };
  
  const handleHome = () => {
    if (userRole === 'customer') {
      navigate('/customer');
    } else if (userRole === 'worker') {
      navigate('/worker');
    } else {
      navigate('/');
    }
  };
  
  const isPublicRoute = ['/', '/login', '/register'].includes(location.pathname);
  
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleHome}>
            <Home className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CoopServices</span>
          </div>
          
          <div className="flex items-center gap-4">
            {userName && (
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-5 h-5" />
                <span className="font-medium">{userName}</span>
              </div>
            )}
            
            {!isPublicRoute && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
