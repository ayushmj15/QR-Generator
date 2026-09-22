import { motion } from 'framer-motion';
import QRGenerator from './components/QRGenerator';
import InstallPrompt from './components/InstallPrompt';
import './App.css';

function App() {
  return (
    <>
      <div className="bg-sphere sphere-1"></div>
      <div className="bg-sphere sphere-2"></div>
      
      <InstallPrompt />

      <motion.div 
        className="app-container"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      >
        <header className="hero">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          >
            <img src="/icon.jpg" alt="Qubic Logo" className="hero-logo" />
          </motion.div>
          <motion.h1 
            className="glow-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
          >
            Qubic
          </motion.h1>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Transform any link or data into a stunning, high-fidelity QR code instantly. Free forever.
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
