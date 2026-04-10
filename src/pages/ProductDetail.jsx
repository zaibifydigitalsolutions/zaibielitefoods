import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, Heart, Clock, Star, Share2, ShieldCheck, Flame, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) return <div className="flex-center" style={{ height: '100vh' }}><h2>Product Not Found</h2></div>;

  const handleAddToCart = (e) => {
    setIsAdding(true);
    
    // Create fly-to-cart effect
    const img = document.querySelector('.product-hero-img');
    const cart = document.querySelector('.cart-icon-nav'); // We'll add this class to BottomNav
    
    if (img && cart) {
      const imgRect = img.getBoundingClientRect();
      const cartRect = cart.getBoundingClientRect();
      
      const flyer = img.cloneNode();
      flyer.style.position = 'fixed';
      flyer.style.top = `${imgRect.top}px`;
      flyer.style.left = `${imgRect.left}px`;
      flyer.style.width = `${imgRect.width}px`;
      flyer.style.height = `${imgRect.height}px`;
      flyer.style.zIndex = '10000';
      flyer.style.borderRadius = '50%';
      flyer.style.transition = 'all 0.8s cubic-bezier(0.1, 0.5, 0.5, 1)';
      document.body.appendChild(flyer);

      setTimeout(() => {
        flyer.style.top = `${cartRect.top}px`;
        flyer.style.left = `${cartRect.left}px`;
        flyer.style.width = '20px';
        flyer.style.height = '20px';
        flyer.style.opacity = '0';
      }, 50);

      setTimeout(() => {
        document.body.removeChild(flyer);
        setIsAdding(false);
        setShowSuccess(true);
      }, 850);
    } else {
      setIsAdding(false);
      setShowSuccess(true);
    }
  };

  return (
    <div style={{ paddingBottom: '120px', backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      
      {/* Immersive Header Image with Parallax & Zoom */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '420px', 
        overflow: 'hidden',
        background: '#111'
      }}>
        <motion.div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            y: scrollY * 0.4,
            scale: 1 + scrollY * 0.0005
          }}
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-hero-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
          />
          <div style={{ position: 'absolute', bottom: 0, left:0, right: 0, height: '150px', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}></div>
        </motion.div>

        {/* Top Navigation */}
        <div className="flex-between" style={{ position: 'fixed', top: '20px', left: '20px', right: '20px', zIndex: 1000 }}>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)} 
            className="flex-center"
            style={{ width: '45px', height: '45px', borderRadius: '15px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}
          >
              <ChevronLeft size={22} color="white" />
          </motion.button>
          <div className="flex-center" style={{ gap: '12px' }}>
            <motion.button whileTap={{ scale: 0.9 }} className="flex-center" style={{ width: '45px', height: '45px', borderRadius: '15px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}>
                <Share2 size={20} color="white" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} className="flex-center" style={{ width: '45px', height: '45px', borderRadius: '15px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}>
                <Heart size={20} color="white" />
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Product Content Container */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ 
          marginTop: '-50px', 
          position: 'relative', 
          background: '#FFFFFF', 
          borderTopLeftRadius: '40px', 
          borderTopRightRadius: '40px', 
          paddingTop: '35px', 
          paddingBottom: '40px', 
          paddingLeft: '24px', 
          paddingRight: '24px', 
          boxShadow: '0 -20px 60px rgba(0,0,0,0.1)' 
        }}
      >
        
        <div className="flex-between mb-2">
            <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{product.category} Selection</span>
            <div className="flex-center" style={{ background: '#FFF0ED', color: 'var(--primary)', padding: '4px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '800', gap: '4px' }}>
                <Flame size={14} /> Popular Item
            </div>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#111', lineHeight: '1.1', marginBottom: '16px' }}>{product.name}</h1>
        
        <div className="flex-center mb-4" style={{ justifyContent: 'flex-start', gap: '20px' }}>
          <div className="flex-center" style={{ gap: '6px' }}>
             <Star size={18} fill="#FFB000" color="#FFB000" /> 
             <span style={{ fontWeight: '800', fontSize: '1rem' }}>{product.rating}</span>
             <span style={{ color: '#999', fontSize: '0.9rem', marginLeft: '2px' }}>(2.4k+ Reviews)</span>
          </div>
          <div className="flex-center" style={{ gap: '6px', paddingLeft: '20px', borderLeft: '1px solid #EEE' }}>
             <Clock size={16} color="var(--primary)" />
             <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>20-30 min</span>
          </div>
        </div>

        <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '30px' }}>
            {product.description} Crafted with premium ingredients and our secret house spices. Experience culinary excellence in every bite.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
            <div style={{ padding: '15px', background: '#F9F9F9', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} color="#10B981" />
                <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Quality Assured</span>
            </div>
            <div style={{ padding: '15px', background: '#F9F9F9', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Flame size={20} color="#FF470B" />
                <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Freshly Cooked</span>
            </div>
        </div>
      </motion.div>

      {/* Sticky Bottom Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        style={{ 
          position: 'fixed', 
          bottom: '24px', 
          left: '20px', 
          right: '20px', 
          padding: '16px', 
          background: '#111', 
          borderRadius: '24px', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)', 
          zIndex: 1000, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}
      >
          <div className="flex-center" style={{ gap: '15px', marginLeft: '10px' }}>
             <motion.button 
                whileTap={{ scale: 0.8 }}
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
                <Minus size={18} />
             </motion.button>
             <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'white', minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
             <motion.button 
                whileTap={{ scale: 0.8 }}
                onClick={() => setQuantity(q => q + 1)}
                style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
                <Plus size={18} />
             </motion.button>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            disabled={isAdding}
            onClick={handleAddToCart}
            style={{ 
              background: 'var(--primary-gradient)', 
              color: 'white', 
              padding: '0 25px', 
              height: '56px', 
              borderRadius: '18px', 
              fontWeight: '800', 
              fontSize: '1rem',
              gap: '12px',
              border: 'none',
              boxShadow: '0 10px 20px rgba(255, 71, 11, 0.3)',
              cursor: 'pointer',
              opacity: isAdding ? 0.7 : 1
            }}>
             <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
             <span style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.3)' }}></span>
             <span>${(product.price * quantity).toFixed(2)}</span>
          </motion.button>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="success-overlay"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div 
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="success-card"
              onClick={e => e.stopPropagation()}
            >
              <div style={{ color: '#10B981', marginBottom: '20px' }}>
                <CheckCircle size={80} strokeWidth={1.5} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '10px' }}>Added to Cart!</h2>
              <p style={{ color: '#666', marginBottom: '25px' }}>Your delicious {product.name} is ready for checkout.</p>
              <button 
                className="btn-primary" 
                onClick={() => navigate('/cart')}
                style={{ width: '100%' }}
              >
                Go to Cart
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProductDetail;
