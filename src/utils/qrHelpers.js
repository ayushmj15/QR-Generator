import QRCodeStyling from 'qr-code-styling';

/**
 * Generates a Blob URL for a QR code from the given input text.
 * @param {string} text - The input data
 * @param {Object} options - Customization options
 * @returns {Promise<string>} The Blob URL (can be used as image source or download link)
 */
export const generateQRDataURI = async (text, options = {}) => {
  if (!text) return null;
  
  const {
    fgColor = '#ffffff',
    bgColor = '#00000000', // transparent
    qrStyle = 'square', // square, dots, rounded, extra-rounded
    logo = null
  } = options;

  try {
    const qrCode = new QRCodeStyling({
      width: 400,
      height: 400,
      data: text,
      image: logo,
      dotsOptions: {
        color: fgColor,
        type: qrStyle
      },
      backgroundOptions: {
        color: bgColor,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10
      },
      cornersSquareOptions: {
        type: qrStyle === 'dots' ? 'dot' : (qrStyle === 'square' ? 'square' : 'extra-rounded')
      },
      cornersDotOptions: {
        type: qrStyle === 'dots' ? 'dot' : 'square'
      }
    });

    const blob = await qrCode.getRawData("png");
    if (!blob) throw new Error("Failed to generate blob");
    
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
};

/**
 * Downloads a data URI or Blob URL as an image file.
 * @param {string} url - The URL to download
 * @param {string} filename - The desired filename
 */
export const downloadImage = (url, filename = 'qrcode.png') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
