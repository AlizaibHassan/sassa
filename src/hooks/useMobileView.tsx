import { useState, useEffect } from 'react';

// Custom hook to detect if the screen is mobile-sized
const useMobileView = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize); // Listen to resize events

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
    };
  }, []);

  return isMobile;
};

export default useMobileView;
