import React from 'react';
import { Plus, Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
      className="product-card" 
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-image-container">
        <motion.img 
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          src={product.image} 
          alt={product.name} 
        />
        <div className="delivery-badge" style={{ backdropFilter: 'blur(5px)' }}>
             <MapPin size={10} color="var(--primary)" /> 40-50min
        </div>
      </div>
      <div className="product-info">
        <h4 className="product-name" style={{ fontSize: '1.1rem', fontWeight: '800' }}>{product.name}</h4>
        <div className="flex-center mt-1" style={{ justifyContent: 'flex-start', gap: '6px' }}>
             <Star size={12} color="#FFB000" fill="#FFB000" />
             <span style={{ fontSize: '12px', fontWeight: '700' }}>{product.rating}</span>
             <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>(2.4k)</span>
        </div>
        <div className="flex-between m-t-1">
          <span className="product-price" style={{ fontSize: '1.2rem', fontWeight: '900' }}>${product.price.toFixed(2)}</span>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="add-btn" 
            onClick={(e) => { e.stopPropagation(); navigate('/cart'); }}
            style={{ borderRadius: '12px', background: 'var(--primary-gradient)' }}
          >
            <Plus size={18} color="white" strokeWidth={3} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
