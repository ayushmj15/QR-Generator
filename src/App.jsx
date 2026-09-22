import { motion } from 'framer-motion';
import QRGenerator from './components/QRGenerator';
import InstallPrompt from './components/InstallPrompt';
import './App.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.9 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 }
  }
};

function App() {
  return (
    <>
      <div className="bg-sphere sphere-1"></div>
      <div className="bg-sphere sphere-2"></div>
      
      <InstallPrompt />

      <motion.div 
        className="app-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <header className="hero">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src="/icon.jpg" alt="Qubic Logo" className="hero-logo" />
          </motion.div>
          <motion.h1 
            className="glow-text"
            variants={itemVariants}
          >
            Qubic
          </motion.h1>
          <motion.p 
            className="subtitle"
            variants={itemVariants}
          >
            Transform any link or data into a stunning, high-fidelity QR code instantly. Free forever.
          </motion.p>
        </header>

        <motion.main className="main-content" variants={itemVariants}>
          <QRGenerator />
        </motion.main>
      </motion.div>
    </>
  );
}

export default App;
