import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Menu as MenuIcon, ShoppingCart, DownloadCloud, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import './BottomNav.css';

const BottomNav = ({ onInstall }) => {
  return (
    <div className="bottom-nav">
      <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
        <motion.div whileTap={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
          <Home size={24} />
        </motion.div>
        <span>Home</span>
      </NavLink>
      <NavLink to="/menu" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
        <motion.div whileTap={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
          <MenuIcon size={24} />
        </motion.div>
        <span>Menu</span>
      </NavLink>
      <NavLink to="/deals" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
        <motion.div whileTap={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
          <Tag size={24} />
        </motion.div>
        <span>Deals</span>
      </NavLink>
      <NavLink to="/cart" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
        <motion.div className="cart-icon-nav" whileTap={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
          <ShoppingCart size={24} />
        </motion.div>
        <span>Cart</span>
      </NavLink>
      <button 
        onClick={onInstall} 
        className="nav-item" 
        style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
      >
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <DownloadCloud size={24} color="var(--primary)" />
        </motion.div>
        <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Install</span>
      </button>
    </div>
  );
};

export default BottomNav;
