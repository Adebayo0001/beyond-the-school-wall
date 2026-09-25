'use client';

interface LogoProps {
  className?: string;
  textClassName?: string;
}

const Logo = ({ className = "h-8 w-auto", textClassName = "text-xl sm:text-2xl text-[#1e1e1e]" }: LogoProps) => {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F16736] flex items-center justify-center shadow-[0_2px_10px_rgba(241,103,54,0.35)] text-white font-black text-xs sm:text-sm tracking-tighter transition-transform hover:scale-105">
        BW
      </div>
      <span className={`${textClassName} font-extrabold tracking-tight flex items-center`}>
        BTSW<span className="text-[#F16736]">.</span>
      </span>
    </div>
  );
};

export default Logo;
