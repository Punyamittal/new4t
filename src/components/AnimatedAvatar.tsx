import React from 'react';

interface AnimatedAvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
  isOpen?: boolean;
}

const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({ 
  src, 
  alt = "Avatar", 
  className = "",
  onClick,
  isOpen = false
}) => {
  return (
    <div 
      className={`animated-avatar w-16 h-16 rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 ${isOpen ? 'ring-4 ring-primary/30' : ''} ${className}`}
      onClick={onClick}
    >
      <img 
        src={src || "https://i.ibb.co/7bzcppC/pngwing-com-removebg-preview.png"} 
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default AnimatedAvatar;