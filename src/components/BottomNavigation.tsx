import { Heart, Settings, Shuffle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'swiper', label: 'Swiper', icon: Shuffle, path: '/dashboard' },
    { id: 'matches', label: 'Matches', icon: Heart, path: '/matches' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex justify-around items-center py-2 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.path)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors",
                "min-w-[60px]",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;