import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-app-card/50 backdrop-blur-sm border-t border-app-border text-center transition-colors duration-300">
      <p className="text-app-muted text-sm font-semibold tracking-wide">
        © 2024-2026 MatricPulse SA • 100% Free • 100% Legal • Made for South African Youth
      </p>
      <p className="text-xs text-app-muted/70 mt-2 font-bold tracking-widest">
        MADE WITH ❤️ BY RAMA
      </p>
    </footer>
  );
};

export default Footer;