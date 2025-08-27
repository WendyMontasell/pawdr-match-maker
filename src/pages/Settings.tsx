import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Bell, Shield, HelpCircle, LogOut } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { Logo } from "@/components/Logo";

const Settings = () => {
  const settingsOptions = [
    {
      icon: User,
      title: "Profile",
      description: "Manage your account information",
      onClick: () => console.log("Profile clicked"),
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Control your notification preferences",
      onClick: () => console.log("Notifications clicked"),
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Manage your privacy settings",
      onClick: () => console.log("Privacy clicked"),
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "Get help and contact support",
      onClick: () => console.log("Help clicked"),
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex h-16 items-center justify-between px-4">
          <Logo size={32} color="#3B82F6" />
          <h1 className="text-xl font-semibold">Settings</h1>
          <div className="w-8" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <main className="container px-4 py-6 space-y-6">
        {/* Settings Options */}
        <div className="space-y-3">
          {settingsOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card key={option.title} className="shadow-md">
                <CardContent className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full h-auto p-4 justify-start"
                    onClick={option.onClick}
                  >
                    <Icon className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div className="text-left">
                      <div className="font-medium">{option.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Sign Out */}
        <Card className="shadow-md">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full h-auto p-4 justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => console.log("Sign out clicked")}
            >
              <LogOut className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Sign Out</div>
                <div className="text-sm opacity-80">
                  Sign out of your account
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Settings;