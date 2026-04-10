import React, { useState } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = products.filter(p => activeCategory === "All" || p.category === activeCategory);

  return (
    <div className="container" style={{ paddingBottom: '100px' }}>
      <h2 className="mb-2" style={{ fontSize: '28px', fontWeight: '800', color: '#111111' }}>Our Menu</h2>
      <div className="category-list mb-3" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px' }}>
        {categories.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '12px 24px',
              borderRadius: '999px',
              backgroundColor: activeCategory === cat ? 'var(--primary)' : 'var(--surface)',
              color: activeCategory === cat ? 'white' : '#111111',
              fontWeight: '600',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              boxShadow: activeCategory === cat ? '0 4px 12px rgba(255, 71, 11, 0.2)' : '0 2px 8px rgba(0,0,0,0.03)',
              transition: 'all 0.2s'
            }}>
            {cat}
          </div>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <p className="text-secondary" style={{ textAlign: 'center', marginTop: '40px' }}>No items found for this category.</p>
      )}
    </div>
  );
};
export default Menu;
