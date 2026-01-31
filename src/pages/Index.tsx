import { motion } from "framer-motion";
import { Wind, Zap, Trash2, Leaf, Users, TreePine, Menu, X } from "lucide-react";
import { useState } from "react";
import { AirQualityMap } from "@/components/AirQualityMap";
import { ResourceTracker } from "@/components/ResourceTracker";
import { WasteGuide } from "@/components/WasteGuide";

type TabType = "air" | "resources" | "waste";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("air");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: "air" as const, label: "Air Quality", icon: Wind, description: "Monitor neighborhood pollution" },
    { id: "resources" as const, label: "Resources", icon: Zap, description: "Save energy & water" },
    { id: "waste" as const, label: "Waste Guide", icon: Trash2, description: "Smart segregation" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-primary-foreground/10"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-primary-foreground/10"
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 rounded-xl bg-primary-foreground/20 backdrop-blur">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary-foreground">EcoNeighbor</span>
            </motion.div>

            {/* Desktop Nav */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center gap-6 text-primary-foreground/80"
            >
              <a href="#" className="hover:text-primary-foreground transition-colors flex items-center gap-2">
                <Users className="h-4 w-4" />
                Community
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors flex items-center gap-2">
                <TreePine className="h-4 w-4" />
                About
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg bg-primary-foreground/20 text-primary-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 p-4 rounded-lg bg-primary-foreground/10 backdrop-blur text-primary-foreground"
            >
              <a href="#" className="block py-2 flex items-center gap-2">
                <Users className="h-4 w-4" /> Community
              </a>
              <a href="#" className="block py-2 flex items-center gap-2">
                <TreePine className="h-4 w-4" /> About
              </a>
            </motion.div>
          )}

          {/* Hero Content */}
          <div className="mt-12 mb-8 text-center text-primary-foreground">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Live Sustainably,
              <br />
              <span className="opacity-90">Impact Locally</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg opacity-80 max-w-2xl mx-auto"
            >
              Monitor air quality, save resources, and reduce waste—all from your neighborhood.
              Join the community making a difference.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8"
          >
            {[
              { value: "2.5K+", label: "Active Users" },
              { value: "15%", label: "Avg. Savings" },
              { value: "8", label: "Neighborhoods" },
            ].map((stat, index) => (
              <div key={index} className="text-center text-primary-foreground">
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "air" && <AirQualityMap />}
          {activeTab === "resources" && <ResourceTracker />}
          {activeTab === "waste" && <WasteGuide />}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-semibold">EcoNeighbor</span>
              <span className="text-sm text-muted-foreground">— Making sustainability local</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
