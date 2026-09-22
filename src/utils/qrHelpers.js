import QRCode from 'qrcode';

/**
 * Generates a Data URI for a QR code from the given input text.
 * @param {string} text - The input data
 * @returns {Promise<string>} The Data URI (base64 image)
 */
export const generateQRDataURI = async (text) => {
  if (!text) return null;
  
  try {
    const dataUri = await QRCode.toDataURL(text, {
      width: 400,
      margin: 2,
      color: {
        dark: '#ffffff',
        light: '#05050800' // transparent background
      },
      errorCorrectionLevel: 'H' // High error correction for aesthetics
    });
    return dataUri;
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
};

/**
 * Downloads a data URI as an image file.
 * @param {string} dataUri - The Data URI
 * @param {string} filename - The desired filename
 */
export const downloadImage = (dataUri, filename = 'qrcode.png') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
