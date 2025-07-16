import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, TrophyIcon, ClockIcon, UserPlusIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 shadow-lg font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-white text-xl font-bold flex items-center">
              <TrophyIcon className="h-6 w-6 mr-2" />
              PointsTracker
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" icon={<UserPlusIcon className="h-5 w-5 mr-1" />} text="Create & Claim" />
            <NavLink to="/history" icon={<ClockIcon className="h-5 w-5 mr-1" />} text="History" />
            <NavLink to="/leaderboard" icon={<TrophyIcon className="h-5 w-5 mr-1" />} text="Leaderboard" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-indigo-700 focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-indigo-600">
          <MobileNavLink to="/claim" icon={<UserPlusIcon className="h-5 w-5 mr-2" />} text="Create & Claim" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/history" icon={<ClockIcon className="h-5 w-5 mr-2" />} text="History" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/leaderboard" icon={<TrophyIcon className="h-5 w-5 mr-2" />} text="Leaderboard" onClick={() => setIsOpen(false)} />
        </div>
      </div>
    </nav>
  );
};

// Reusable component for desktop nav links
const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
  >
    {icon}
    {text}
  </Link>
);

// Reusable component for mobile nav links
const MobileNavLink = ({ to, icon, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700 transition-colors"
  >
    {icon}
    {text}
  </Link>
);

export default Navbar;