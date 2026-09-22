import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { generateQRDataURI, downloadImage } from '../utils/qrHelpers';
import './QRGenerator.css';

const QRGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [qrCodeURI, setQrCodeURI] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // 3D Tilt Effect Setup
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring physics for the tilt
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  // Map mouse position to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the card
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize to range [-0.5, 0.5]
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
      downloadImage(qrCodeURI, 'Infinite_QR.png');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="qr-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerate}
          disabled={!inputText.trim() || isGenerating}
        >
          {isGenerating ? 'Processing...' : 'Generate 3D QR'}
        </motion.button>
        
        <motion.button 
          className="btn btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={!qrCodeURI || isGenerating}
        >
          Download Free
        </motion.button>
      </div>

      <motion.div 
        className="qr-result-container"
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {isGenerating ? (
          <div className="spinner"></div>
        ) : qrCodeURI ? (
          <motion.img 
            src={qrCodeURI} 
            alt="Generated QR Code" 
            className="qr-image"
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
          />
        ) : (
          <div className="empty-state">
            <p>Your beautiful QR code will appear here</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default QRGenerator;
