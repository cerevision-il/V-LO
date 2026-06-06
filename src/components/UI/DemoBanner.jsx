import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AlertTriangle, X } from 'lucide-react';

export default function DemoBanner() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show modal on route change if they haven't dismissed it this session
    const dismissed = sessionStorage.getItem('velo_demo_dismissed');
    if (!dismissed) {
      setShowModal(true);
    }
  }, [location.pathname]);

  const dismissModal = () => {
    setShowModal(false);
    sessionStorage.setItem('velo_demo_dismissed', 'true');
  };

  return (
    <>
      {/* Persistent Top Banner */}
      <div style={{
        position: 'relative', zIndex: 9999,
        background: '#9a0002', color: '#fff', padding: '10px 16px',
        textAlign: 'center', fontSize: '13px', fontWeight: 600,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <AlertTriangle size={14} style={{ display:'inline', verticalAlign:'text-bottom', marginRight:6 }} />
        DEMO STORE: This is a portfolio simulation. Products are fake, no real data is saved, and no orders are processed.
      </div>

      {/* Pop-up Modal on initial load/navigation */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', p: 20
        }}>
          <div style={{
            background: '#fff', padding: '32px', borderRadius: '12px',
            maxWidth: '440px', width: '90%', position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <button
              onClick={dismissModal}
              style={{ position:'absolute', top:16, right:16, background:'none', border:'none', cursor:'pointer', color:'#666' }}
            >
              <X size={20} />
            </button>
            <div style={{ color:'#9a0002', marginBottom:16 }}>
              <AlertTriangle size={36} />
            </div>
            <h2 style={{ margin:'0 0 12px 0', fontSize:'22px' }}>Welcome to VÉLO &amp; VINTAGE</h2>
            <p style={{ margin:'0 0 16px 0', fontSize:'15px', lineHeight:1.5, color:'#444' }}>
              <strong>Notice:</strong> This website is a portfolio demonstration. 
              <br/><br/>
              All products, prices, and images are for simulation purposes only. The data you enter is not permanently saved or sent anywhere, and <strong>no real orders or shipments will be processed</strong>.
            </p>
            <button
              onClick={dismissModal}
              className="btn btn-primary"
              style={{ width:'100%', justifyContent:'center' }}
            >
              I Understand, Continue to Site
            </button>
          </div>
        </div>
      )}
    </>
  );
}
