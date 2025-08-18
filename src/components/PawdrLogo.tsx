import pawdrLogo from '@/assets/pawdr-logo.png';

interface PawdrLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PawdrLogo = ({ size = 'md', className = '' }: PawdrLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <img 
        src={pawdrLogo} 
        alt="Pawdr" 
        className={`${sizeClasses[size]} object-contain`}
      />
      <h1 className="text-4xl font-bold text-primary tracking-tight">Pawdr</h1>
    </div>
  );
};