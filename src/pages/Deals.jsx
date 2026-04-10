import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

// High-quality premium food images from Unsplash
const extraDeals = [
  { 
    id: 1, 
    title: 'Family Feast', 
    description: '2 Large Pizzas + 4 Sides for $25', 
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800', 
    bg: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
    buttonText: 'Grab Family Feast' 
  },
  { 
    id: 2, 
    title: 'Burger Bonanza', 
    description: 'Buy 2 Burgers, Get 1 Free', 
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800', 
    bg: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
    buttonText: 'Get Burger Deal' 
  },
  { 
    id: 3, 
    title: 'Midnight Snack', 
    description: 'All items 20% off after 10 PM', 
    image: 'https://images.unsplash.com/photo-1594000191219-c45124183981?auto=format&fit=crop&q=80&w=800', 
    bg: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8))',
    buttonText: 'Order Late' 
  },
  { 
    id: 4, 
    title: 'Healthy Hour', 
    description: 'Salads & Smoothies 30% off', 
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800', 
    bg: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6))',
    buttonText: 'Go Healthy' 
  },
  { 
    id: 5, 
    title: 'Student Discount', 
    description: '15% off any order with ID', 
    image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800', 
    bg: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
    buttonText: 'Save Now' 
  },
  { 
    id: 6, 
    title: 'Weekend Combo', 
    description: 'Any 2 items 20% off', 
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800', 
    bg: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
    buttonText: 'Grab Deal' 
  }
];

const Deals = () => {
  return (
    <div className="container" style={{ padding: '20px', paddingBottom: '100px' }}>
      <h1 className="mb-3" style={{ fontSize: '2rem', fontWeight: '800', color: '#1a1a1a' }}>Hot Deals 🔥</h1>

      {/* Main Combo Offer Hero - Immersive Style */}
      <div className="promo-banner mb-4" style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #000000 100%)',
        borderRadius: '32px',
        padding: '35px',
        color: 'white',
        minHeight: '260px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '65%', position: 'relative', zIndex: 2 }}>
          <span className="badge" style={{ background: 'var(--secondary)', color: 'black' }}>Deal of the Day</span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', lineHeight: '1', fontWeight: '800' }}>The Elite<br/>Combo</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '24px', opacity: 0.8, fontWeight: '500' }}>Double Burger + XL Fries + Shakes</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
             <span style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary)' }}>$14.99</span>
             <button className="btn-white" style={{ padding: '14px 30px' }}>Claim Now</button>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1594000191219-c45124183981?auto=format&fit=crop&q=80&w=800" 
          alt="Combo" 
          className="promo-img"
          style={{ width: '300px', height: '300px', right: '-40px', top: '20px' }}
        />
      </div>

      {/* Deals Grid */}
      <div className="deals-grid" style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
        {extraDeals.map((deal) => (
          <div key={deal.id} className="promo-banner" style={{
            backgroundImage: `${deal.bg}, url("${deal.image}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '20px',
            padding: '20px',
            color: 'white',
            aspectRatio: '0.9',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{deal.title}</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: '12px', opacity: 0.9 }}>{deal.description}</p>
              <button style={{ 
                background: 'rgba(255,255,255,0.2)', 
                backdropFilter: 'blur(10px)',
                color: 'white', 
                padding: '8px 12px', 
                borderRadius: '8px', 
                fontWeight: '600',
                border: '1px solid rgba(255,255,255,0.3)',
                width: '100%',
                fontSize: '0.8rem'
              }}>{deal.buttonText}</button>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Items */}
      <div style={{ marginTop: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
           <h3 style={{ fontSize: '1.4rem' }}>For You</h3>
           <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>View All</span>
        </div>
        <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {products.slice(0, 4).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deals;

