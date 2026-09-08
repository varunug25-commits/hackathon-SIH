import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { LogOut, User, Home, Briefcase, IndianRupee, Users } from 'lucide-react';

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
  
  const isPublicRoute = ['/', '/login', '/register', '/worker-login', '/worker-register'].includes(location.pathname);
  
  const workerNavItems = [
    { path: '/worker', label: 'Dashboard', icon: Home },
    { path: '/worker/jobs', label: 'Available Jobs', icon: Briefcase },
    { path: '/worker/my-jobs', label: 'My Jobs', icon: Briefcase },
    { path: '/worker/earnings', label: 'Earnings', icon: IndianRupee },
    { path: '/worker/profile', label: 'Profile', icon: Users }
  ];
  
  const customerNavItems = [
    { path: '/customer', label: 'Dashboard', icon: Home },
    { path: '/customer/services', label: 'Services', icon: Briefcase },
    { path: '/customer/workers', label: 'Workers', icon: Users },
    { path: '/customer/bookings', label: 'Bookings', icon: Briefcase },
    { path: '/customer/profile', label: 'Profile', icon: Users }
  ];
  
  const navItems = userRole === 'worker' ? workerNavItems : customerNavItems;
  
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleHome}>
            <Home className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CoopServices</span>
          </div>
          
          {!isPublicRoute && userRole && (
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
          
          <div className="flex items-center gap-4">
            {userName && (
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-5 h-5" />
                <span className="font-medium hidden sm:block">{userName}</span>
              </div>
            )}
            
            {!isPublicRoute && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:block">Logout</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
