interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressBar = ({ currentStep, totalSteps, className = '' }: ProgressBarProps) => {
  return (
    <div className={`w-full max-w-sm mx-auto ${className}`}>
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              index < currentStep 
                ? 'bg-progress-fill' 
                : 'bg-progress-bg'
            }`}
          />
        ))}
      </div>
    </div>
  );
};