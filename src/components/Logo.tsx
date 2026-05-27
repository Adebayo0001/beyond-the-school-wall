import { useState } from 'react';

interface LogoProps {
  className?: string;
  textClassName?: string;
}

const Logo = ({ className = "h-10 w-auto", textClassName = "text-2xl text-[#1e1e1e]" }: LogoProps) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <span className={`${textClassName} font-extrabold tracking-tighter flex items-center gap-2`}>
        BTSW<span className="text-brand-orange">.</span>
      </span>
    );
  }

  return (
    <div className="flex items-center">
      <img 
        src="/logo.png" 
        alt="Beyond the School Wall Logo" 
        className={`${className} object-contain`}
        onError={() => setImageError(true)}
      />
    </div>
  );
};

export default Logo;
