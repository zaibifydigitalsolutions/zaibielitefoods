import React, { useState, useEffect } from 'react';
import { Search, MapPin, ChevronDown, Star, Phone, Mail, Clock, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

const faqs = [
  { q: "What are your delivery hours?", a: "We deliver from 10:00 AM to 11:30 PM, 7 days a week." },
  { q: "Is delivery free?", a: "Delivery is free for orders over $30. Otherwise, a small $2 fee applies." },
  { q: "How long does delivery take?", a: "Our average time is 40-50 minutes, ensuring your food stays hot." }
];

const testimonials = [
  { name: "Sarah L.", text: "Best burgers in town! Lightning fast delivery.", rating: 5 },
  { name: "Mike T.", text: "The pizza is authentic and always arrives hot.", rating: 5 },
  { name: "Jessica R.", text: "I order the Truffle Fries weekly. Absolute perfection.", rating: 4 },
  { name: "Daniel K.", text: "Amazing vegan options, highly recommended.", rating: 5 },
  { name: "Emily C.", text: "Customer service is top notch and the food is great.", rating: 5 }
];

const doubledTestimonials = [...testimonials, ...testimonials];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const filteredProducts = products.filter(p => activeCategory === "All" || p.category === activeCategory);
  const [openFaq, setOpenFaq] = useState(null);
  const [currentBanner, setCurrentBanner] = useState(0);

  // Simulate Skeleton Loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide banners every 2.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Update scroll position when currentBanner changes
  useEffect(() => {
    const container = document.querySelector('.banners-container');
    if (container) {
      container.scrollTo({
        left: currentBanner * container.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentBanner]);

  return (
    <div className="container home-page" style={{ paddingBottom: '120px', overflowX: 'hidden' }}>
      
      {/* Premium Sticky Blur Header */}
      <div className="sticky-header flex-between" style={{ margin: '0 -24px 24px -24px', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase' }}>Deliver to</p>
          <div className="flex-center gap-1" style={{ cursor: 'pointer' }}>
            <span style={{ fontWeight: '800', fontSize: '1rem' }}>Jl. Soekarno Hatta 15A</span>
            <ChevronDown size={16} color="var(--primary)" />
          </div>
        </div>
        <motion.div 
          whileTap={{ scale: 0.9 }}
          className="glass-card" style={{ padding: '10px', borderRadius: '15px', background: 'var(--primary-light)' }}>
           <MapPin size={22} color="var(--primary)" />
        </motion.div>
      </div>

      {/* Dynamic Greeting */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h1 style={{ marginBottom: '0px', fontSize: '2.5rem', fontWeight: '900' }}>Fastest</h1>
        <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem', fontWeight: '900' }}>Delivery Food ⚡</h1>
      </motion.div>

      {/* Modern Search */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="search-bar mb-4" 
        style={{ background: '#F8F9FA', padding: '14px 20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #EEE' }}
      >
        <Search size={22} color="#9CA3AF" />
        <input type="text" placeholder="Search your favorite food..." style={{ background: 'none', border: 'none', width: '100%', fontSize: '1rem', outline: 'none', fontWeight: '500' }} />
      </motion.div>

      {/* Main Feature Banners - Immersive 3D Slider */}
      <div className="banners-container mb-4">
        {[
          { color: 'linear-gradient(135deg, #FF6B00 0%, #FF470B 100%)', badge: 'Special Offer', title: '30% Daily\nDiscount!', img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=800' },
          { color: 'linear-gradient(135deg, #FFB000 0%, #FF8A00 100%)', badge: 'Limited Time', title: 'Free Delivery\non Pizzas', img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800' },
          { color: 'linear-gradient(135deg, #111111 0%, #333333 100%)', badge: 'Gourmet', title: 'Premium\nFamily Feast', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800' }
        ].map((ban, i) => (
          <motion.div 
            key={i}
            whileTap={{ scale: 0.98 }}
            className="promo-banner" 
            style={{ background: ban.color, transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <div className="promo-content">
              <span className="badge">{ban.badge}</span>
              <h2 style={{color: 'white', marginBottom: '8px', fontSize: '2.2rem', fontWeight: '900', whiteSpace: 'pre-line'}}>{ban.title}</h2>
              <button className="btn-white">Order Now</button>
            </div>
            <img src={ban.img} alt="Promo" className="promo-img" />
          </motion.div>
        ))}
      </div>

      {/* Sophisticated Categories */}
      <div className="mb-4">
        <div className="flex-between mb-3">
          <h3 style={{ fontSize: '1.4rem', fontWeight: '900' }}>Categories</h3>
          <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' }}>See All</span>
        </div>
        <div className="category-list" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }}>
          {categories.map((cat, idx) => (
            <motion.button 
               key={idx} 
               whileTap={{ scale: 0.9 }}
               onClick={() => setActiveCategory(cat)}
               style={{
                 padding: '12px 24px',
                 borderRadius: '16px',
                 background: activeCategory === cat ? 'var(--primary)' : 'white',
                 color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                 fontWeight: '800',
                 boxShadow: activeCategory === cat ? '0 10px 20px rgba(255, 71, 11, 0.2)' : '0 2px 10px rgba(0,0,0,0.03)',
                 border: activeCategory === cat ? 'none' : '1px solid #F3F4F6',
                 whiteSpace: 'nowrap'
               }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Popular Items Showcase */}
      <div className="mb-4">
        <div className="flex-between mb-3">
          <h3 style={{ fontSize: '1.4rem', fontWeight: '900' }}>{activeCategory === "All" ? "Top 6 Favorites 🔥" : `${activeCategory} Selections`}</h3>
        </div>
        {isLoading ? (
          <div className="products-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: '260px', borderRadius: '24px' }}></div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.slice(0, 6).map((prod) => (
               <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <p className="text-secondary">No items found in this section.</p>
          </div>
        )}
      </div>

      {/* Classical Selection (6 Faws) */}
      <div className="mb-4">
          <div className="flex-between mb-3">
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900' }}>Classical Selection 🍷</h3>
              <span className="btn-see-all">Explore Menu</span>
          </div>
          <div className="products-grid">
              {products.filter(p => ["Main", "Pizza", "Pasta", "Entrees"].includes(p.category)).slice(0, 6).map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
              ))}
          </div>
      </div>

      {/* Elegant Contact Section */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="card mb-4" style={{ background: '#111111', color: 'white', borderRadius: '24px', padding: '24px' }}>
         <h3 className="mb-3" style={{ color: 'white', fontSize: '1.3rem', fontWeight: '900' }}>Need Help? 📞</h3>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '15px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '14px' }}>
                     <Phone size={20} color="var(--primary)" />
                  </div>
                  <div>
                      <p style={{ fontWeight: '800', fontSize: '1rem' }}>+92 331 9068234</p>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Available 24/7</p>
                  </div>
              </div>
         </div>
      </motion.div>

    </div>
  );
};

export default Home;
