import { useState } from 'react';
import { motion } from 'framer-motion';
import QRGenerator from './components/QRGenerator';
import './App.css';

function App() {
  return (
    <>
      <div className="bg-sphere sphere-1"></div>
      <div className="bg-sphere sphere-2"></div>
      
      <motion.div 
        className="app-container"
        initial={{ opacity: 0, y: 30, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <header className="hero">
          <motion.h1 
            className="glow-text"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            Infinite QR
          </motion.h1>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform any link, text, or data into a stunning, high-fidelity QR code instantly. Free forever.
          </motion.p>
        </header>

        <main className="main-content">
          <QRGenerator />
        </main>
      </motion.div>
    </>
  );
}

export default App;
