import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  PenTool, 
  MessageSquare, 
  Settings 
} from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "content", label: "Content", icon: FileText },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    { id: "blog", label: "Blog", icon: PenTool },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-[#1A1A1A] border-r border-gray-800 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 cinematic-gradient rounded-lg flex items-center justify-center">
            <i className="fas fa-play text-white text-sm"></i>
          </div>
          <span className="text-lg font-bold text-white">Admin Panel</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start text-left ${
                  activeTab === item.id 
                    ? "bg-[#00D4FF] text-white" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
