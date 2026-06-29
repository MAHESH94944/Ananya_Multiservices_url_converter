// src/components/BottomNav.jsx
import { NavLink } from 'react-router-dom';
import { FiHome, FiClock, FiSettings } from 'react-icons/fi';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <FiHome />
        <span>Home</span>
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <FiClock />
        <span>History</span>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <FiSettings />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;