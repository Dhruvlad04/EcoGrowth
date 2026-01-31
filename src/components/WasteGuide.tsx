import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Search, Leaf, Recycle, AlertTriangle, Package, Award, Star, Gift, ChevronRight, X } from "lucide-react";
import { useState, useMemo } from "react";

interface WasteItem {
  id: string;
  name: string;
  category: "organic" | "recyclable" | "hazardous" | "general";
  icon: string;
  tip: string;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  claimed: boolean;
}

const wasteItems: WasteItem[] = [
  { id: "1", name: "Vegetable Peels", category: "organic", icon: "🥕", tip: "Compost them to create nutrient-rich soil for gardening." },
  { id: "2", name: "Fruit Scraps", category: "organic", icon: "🍎", tip: "Can be used for composting or making natural fertilizers." },
  { id: "3", name: "Tea Leaves", category: "organic", icon: "🍵", tip: "Great for composting - rich in nitrogen!" },
  { id: "4", name: "Egg Shells", category: "organic", icon: "🥚", tip: "Crush and add to compost or directly to garden soil." },
  { id: "5", name: "Plastic Bottles", category: "recyclable", icon: "🧴", tip: "Rinse, remove cap, and flatten before recycling." },
  { id: "6", name: "Cardboard Boxes", category: "recyclable", icon: "📦", tip: "Break down flat and keep dry for recycling." },
  { id: "7", name: "Newspapers", category: "recyclable", icon: "📰", tip: "Bundle together - great for paper recycling!" },
  { id: "8", name: "Glass Jars", category: "recyclable", icon: "🫙", tip: "Rinse thoroughly, remove labels if possible." },
  { id: "9", name: "Aluminum Cans", category: "recyclable", icon: "🥫", tip: "Rinse and crush to save space." },
  { id: "10", name: "Batteries", category: "hazardous", icon: "🔋", tip: "Never throw in regular trash - drop at collection centers." },
  { id: "11", name: "Old Medicines", category: "hazardous", icon: "💊", tip: "Return to pharmacies for safe disposal." },
  { id: "12", name: "Paint Cans", category: "hazardous", icon: "🎨", tip: "Take to hazardous waste collection facility." },
  { id: "13", name: "Light Bulbs", category: "hazardous", icon: "💡", tip: "CFLs contain mercury - handle with care, special disposal needed." },
  { id: "14", name: "Broken Ceramics", category: "general", icon: "🏺", tip: "Wrap carefully in paper and dispose in general waste." },
  { id: "15", name: "Diapers", category: "general", icon: "👶", tip: "Wrap tightly and dispose in general waste bin." },
  { id: "16", name: "Styrofoam", category: "general", icon: "📋", tip: "Not recyclable in most areas - use sparingly." },
];

const categoryInfo = {
  organic: {
    label: "Organic Waste",
    color: "bg-waste-organic",
    textColor: "text-waste-organic",
    icon: Leaf,
    binColor: "Green Bin",
    description: "Biodegradable kitchen and garden waste",
  },
  recyclable: {
    label: "Recyclable",
    color: "bg-waste-recyclable",
    textColor: "text-waste-recyclable",
    icon: Recycle,
    binColor: "Blue Bin",
    description: "Paper, plastic, glass, and metal items",
  },
  hazardous: {
    label: "Hazardous",
    color: "bg-waste-hazardous",
    textColor: "text-waste-hazardous",
    icon: AlertTriangle,
    binColor: "Red Bin",
    description: "Items requiring special disposal",
  },
  general: {
    label: "General Waste",
    color: "bg-waste-general",
    textColor: "text-waste-general",
    icon: Package,
    binColor: "Black Bin",
    description: "Non-recyclable, non-hazardous waste",
  },
};

const initialRewards: Reward[] = [
  { id: "1", title: "Eco Starter", description: "Segregate waste for 7 days straight", points: 50, claimed: true },
  { id: "2", title: "Green Champion", description: "Complete 100 correct segregations", points: 150, claimed: false },
  { id: "3", title: "Zero Waste Hero", description: "Reach 500 eco points", points: 300, claimed: false },
  { id: "4", title: "Community Leader", description: "Share app with 5 friends", points: 100, claimed: false },
];

export function WasteGuide() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<WasteItem | null>(null);
  const [rewards, setRewards] = useState(initialRewards);
  const [userPoints, setUserPoints] = useState(175);
  const [streak, setStreak] = useState(12);

  const filteredItems = useMemo(() => {
    let items = wasteItems;
    
    if (searchQuery) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    return items;
  }, [searchQuery, selectedCategory]);

  const handleItemClick = (item: WasteItem) => {
    setSelectedItem(item);
    // Award points for checking
    setUserPoints(prev => prev + 2);
  };

  const claimReward = (id: string) => {
    setRewards(rewards.map(r => r.id === id ? { ...r, claimed: true } : r));
  };

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-primary rounded-xl p-6 text-primary-foreground shadow-glow"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary-foreground/20">
              <Star className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm opacity-80">Your Eco Points</p>
              <p className="text-3xl font-bold">{userPoints}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-6 shadow-card border border-border"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-accent/20">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
              <p className="text-3xl font-bold">{streak} 🔥</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-6 shadow-card border border-border"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary/20">
              <Gift className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rewards Earned</p>
              <p className="text-3xl font-bold">{rewards.filter(r => r.claimed).length}/{rewards.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Waste Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-lg shadow-card border border-border"
      >
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/20">
              <Trash2 className="h-4 w-4 text-primary" />
            </div>
            Smart Waste Guide
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Search for any item to learn how to dispose of it correctly</p>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for an item (e.g., plastic bottle, battery)..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                !selectedCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              All
            </button>
            {Object.entries(categoryInfo).map(([key, info]) => {
              const Icon = info.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === key
                      ? `${info.color} text-primary-foreground`
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {info.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Items Grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredItems.map((item, index) => {
              const info = categoryInfo[item.category];
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleItemClick(item)}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-sm font-medium text-center">{item.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${info.color} text-primary-foreground`}>
                    {info.binColor}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No items found. Try a different search term.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl shadow-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedItem.icon}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedItem.name}</h3>
                    <span className={`inline-flex items-center gap-1 text-sm ${categoryInfo[selectedItem.category].textColor}`}>
                      {(() => {
                        const Icon = categoryInfo[selectedItem.category].icon;
                        return <Icon className="h-4 w-4" />;
                      })()}
                      {categoryInfo[selectedItem.category].label}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className={`rounded-lg p-4 mb-4 ${categoryInfo[selectedItem.category].color} text-primary-foreground`}>
                <p className="font-medium">Dispose in: {categoryInfo[selectedItem.category].binColor}</p>
                <p className="text-sm opacity-90 mt-1">{categoryInfo[selectedItem.category].description}</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Leaf className="h-4 w-4 text-primary" />
                  Eco Tip
                </h4>
                <p className="text-sm text-muted-foreground">{selectedItem.tip}</p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">+2 points for checking!</span>
                <span className="text-sm font-medium text-primary">Total: {userPoints} pts</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rewards Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-lg shadow-card border border-border"
      >
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-accent/20">
              <Award className="h-4 w-4 text-accent" />
            </div>
            Rewards & Achievements
          </h3>
        </div>
        <div className="p-4 space-y-3">
          {rewards.map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                reward.claimed
                  ? "bg-primary/10 border-primary/30"
                  : userPoints >= reward.points
                  ? "bg-accent/10 border-accent/30"
                  : "bg-muted/30 border-border"
              }`}
            >
              <div className={`p-3 rounded-xl ${reward.claimed ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <Award className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{reward.title}</h4>
                <p className="text-sm text-muted-foreground">{reward.description}</p>
              </div>
              {reward.claimed ? (
                <span className="text-sm font-medium text-primary flex items-center gap-1">
                  ✓ Claimed
                </span>
              ) : userPoints >= reward.points ? (
                <button
                  onClick={() => claimReward(reward.id)}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Claim
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <span className="text-sm text-muted-foreground">{reward.points} pts</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
