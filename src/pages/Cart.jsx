import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, MapPin, CreditCard, ChevronRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Cart = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Cart, 2: Address, 3: Success

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleWhatsAppOrder = async () => {
    const restaurantPhone = "923319068234";
    const message = `Hello Zaibi Elite Foods! 👋\n\nI would like to place an order now.\n\nItems:\n1x Classic Cheeseburger\n\nTotal: $10.99\n\nPlease confirm!`;
    const whatsappUrl = `https://wa.me/${restaurantPhone}?text=${encodeURIComponent(message)}`;
    
    try {
       const { data: { session } } = await supabase.auth.getSession();
       if (session && session.user) {
          await supabase.from('orders').insert([ 
            { user_id: session.user.id, total_amount: 10.99, delivery_address: 'Guest' } 
          ]);
       }
    } catch(e) { }
    
    window.open(whatsappUrl, '_blank');
    setStep(3);
  };

  return (
    <div className="container" style={{ paddingBottom: '100px', background: '#FFFFFF', minHeight: '100vh' }}>
      
      {/* Step Indicator */}
      <div className="flex-center mb-4" style={{ gap: '10px' }}>
         {[1, 2, 3].map(s => (
           <div key={s} style={{ 
             width: s === step ? '40px' : '10px', 
             height: '10px', 
             borderRadius: '10px', 
             background: s <= step ? 'var(--primary)' : '#EEE',
             transition: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)'
           }} />
         ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="mb-4" style={{ fontSize: '2.2rem', fontWeight: '900' }}>Your Order</h2>
            
            <motion.div whileHover={{ scale: 1.01 }} className="card mb-3 flex-between" style={{ padding: '16px', borderRadius: '24px' }}>
              <div className="flex-center gap-3">
                <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=100&q=80" alt="Burger" style={{ width: '80px', height: '80px', borderRadius: '20px', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontWeight: '800', marginBottom: '4px', fontSize: '1.1rem' }}>Classic Cheeseburger</h4>
                  <p style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--primary)' }}>$8.99</p>
                </div>
              </div>
              <div className="flex-center gap-2" style={{ background: '#F8F9FA', padding: '6px', borderRadius: '15px' }}>
                <motion.button whileTap={{ scale: 0.8 }} style={{ width: '30px', height: '30px', borderRadius: '10px', background: '#FFF', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>-</motion.button>
                <span style={{ fontWeight: '800', margin: '0 5px' }}>1</span>
                <motion.button whileTap={{ scale: 0.8 }} style={{ width: '30px', height: '30px', borderRadius: '10px', background: '#111', color: 'white' }}>+</motion.button>
              </div>
            </motion.div>

            <div className="card mt-4" style={{ padding: '24px', borderRadius: '24px', background: '#F8F9FA' }}>
                <div className="flex-between mb-3"><span style={{ color: '#777', fontWeight: '600' }}>Subtotal</span><span style={{ fontWeight: '800' }}>$8.99</span></div>
                <div className="flex-between mb-3"><span style={{ color: '#777', fontWeight: '600' }}>Delivery Fee</span><span style={{ fontWeight: '800' }}>$2.00</span></div>
                <hr style={{ border: 'none', borderTop: '2px dashed #DDD', margin: '20px 0' }} />
                <div className="flex-between mb-4"><span style={{ fontSize: '1.4rem', fontWeight: '900' }}>Total</span><span style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--primary)' }}>$10.99</span></div>
                
                <button className="btn-primary" onClick={() => setStep(2)} style={{ height: '60px', borderRadius: '20px' }}>
                   Proceed to Checkout
                </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="flex-center mb-4" style={{ justifyContent: 'flex-start', gap: '15px' }}>
               <motion.button whileTap={{ scale: 0.8 }} onClick={() => setStep(1)} style={{ background: '#F8F9FA', border: 'none', padding: '10px', borderRadius: '12px' }}><ChevronLeft /></motion.button>
               <h2 style={{ fontSize: '1.8rem', fontWeight: '900' }}>Delivery Detail</h2>
            </div>

            <div className="card mb-4" style={{ padding: '20px', borderRadius: '24px' }}>
                <div className="flex-between mb-4">
                   <div className="flex-center gap-3">
                      <div style={{ background: 'var(--primary-light)', padding: '12px', borderRadius: '14px' }}><MapPin color="var(--primary)" /></div>
                      <div><p style={{ fontWeight: '800' }}>Home Address</p><p style={{ color: '#888', fontSize: '0.9rem' }}>Jl. Soekarno Hatta 15A</p></div>
                   </div>
                   <ChevronRight color="#CCC" />
                </div>
            </div>

            <button 
               className="btn-primary" 
               style={{ backgroundColor: '#25D366', height: '60px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(37, 211, 102, 0.3)' }} 
               onClick={handleWhatsAppOrder}
            >
               Complete with WhatsApp
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', paddingTop: '60px' }}
          >
            <div style={{ color: '#10B981', marginBottom: '30px' }}>
               <motion.div 
                 initial={{ scale: 0, rotate: -20 }}
                 animate={{ scale: 1, rotate: 0 }}
                 transition={{ type: "spring", stiffness: 200, damping: 10 }}
               >
                 <CheckCircle size={100} strokeWidth={1.5} />
               </motion.div>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '15px' }}>Order Placed! 👋</h2>
            <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>We've sent your order to WhatsApp. Our team will contact you shortly to confirm.</p>
            <button className="btn-dark" onClick={() => navigate('/')} style={{ width: '200px', height: '56px', borderRadius: '20px' }}>
               Back to Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
