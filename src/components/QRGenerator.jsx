import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateQRDataURI, downloadImage } from '../utils/qrHelpers';
import './QRGenerator.css';

const QRGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [qrCodeURI, setQrCodeURI] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    setQrCodeURI(null);
    
    // Artificial delay for the premium loading animation feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const uri = await generateQRDataURI(inputText);
      setQrCodeURI(uri);
    } catch (error) {
      console.error("Failed to generate QR");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (qrCodeURI) {
      downloadImage(qrCodeURI, 'Qubic_QR.png');
    }
  };

  return (
    <motion.div
      className="qr-card"
      initial={{ scale: 0.9, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
    >
      <div className="input-container">
        <input 
          type="text" 
          className="qr-input"
          placeholder="Paste URL, text, or any data..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
      </div>

      <div className="button-group">
        <motion.button 
          className="btn btn-primary"
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,123,0,0.8)" }}
          whileTap={{ scale: 0.92 }}
          onClick={handleGenerate}
          disabled={!inputText.trim() || isGenerating}
        >
          {isGenerating ? 'Processing...' : 'Generate Magic QR'}
        </motion.button>
        
        <motion.button 
          className="btn btn-secondary"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          whileTap={{ scale: 0.92 }}
          onClick={handleDownload}
          disabled={!qrCodeURI || isGenerating}
        >
          Download Free
        </motion.button>
      </div>

      <div className="qr-result-container">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div 
              key="spinner"
              className="spinner"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          ) : qrCodeURI ? (
            <motion.img 
              key="qr"
              src={qrCodeURI} 
              alt="Generated QR Code" 
              className="qr-image"
              // Dramatic 3D Flip Entry
              initial={{ opacity: 0, rotateY: -180, scale: 0.5, z: -200 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
              transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
            />
          ) : (
            <motion.div 
              key="empty"
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>Your beautiful QR code will appear here</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QRGenerator;
