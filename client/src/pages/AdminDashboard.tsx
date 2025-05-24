import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";
import { Link } from "wouter";
import AdminSidebar from "@/components/AdminSidebar";
import ContentManager from "@/components/ContentManager";
import PortfolioManager from "@/components/PortfolioManager";
import BlogManager from "@/components/BlogManager";
import TestimonialManager from "@/components/TestimonialManager";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-black text-gradient">Admin Dashboard</h1>
                <p className="text-gray-400 mt-2">Welcome back, {user?.firstName || 'Admin'}</p>
              </div>
              <div className="flex gap-4">
                <Link href="/">
                  <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                    <Home className="w-4 h-4 mr-2" />
                    View Site
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={() => window.location.href = '/api/logout'}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-[#1A1A1A] border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Total Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#00D4FF]">24</div>
                    <p className="text-xs text-gray-400">+2 from last month</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#1A1A1A] border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Blog Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#FF6B35]">12</div>
                    <p className="text-xs text-gray-400">+1 this week</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#1A1A1A] border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Testimonials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#8B5CF6]">8</div>
                    <p className="text-xs text-gray-400">Active reviews</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#1A1A1A] border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Contact Forms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">5</div>
                    <p className="text-xs text-gray-400">Unread messages</p>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-6">
              {activeTab === "content" && <ContentManager />}
              {activeTab === "portfolio" && <PortfolioManager />}
              {activeTab === "blog" && <BlogManager />}
              {activeTab === "testimonials" && <TestimonialManager />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
