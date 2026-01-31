import { motion } from "framer-motion";
import { Zap, Droplets, Leaf, TrendingDown, Check, Lightbulb, ThermometerSun, Tv } from "lucide-react";
import { useState } from "react";

interface Habit {
  id: string;
  label: string;
  points: number;
  category: "energy" | "water";
  icon: React.ElementType;
  completed: boolean;
}

const initialHabits: Habit[] = [
  { id: "1", label: "Turn off lights when leaving rooms", points: 5, category: "energy", icon: Lightbulb, completed: false },
  { id: "2", label: "Unplug devices when not in use", points: 8, category: "energy", icon: Zap, completed: false },
  { id: "3", label: "Use natural light during the day", points: 6, category: "energy", icon: ThermometerSun, completed: false },
  { id: "4", label: "Set AC to 24°C or higher", points: 10, category: "energy", icon: ThermometerSun, completed: false },
  { id: "5", label: "Turn off TV when not watching", points: 4, category: "energy", icon: Tv, completed: false },
  { id: "6", label: "Take shorter showers (< 5 mins)", points: 12, category: "water", icon: Droplets, completed: false },
  { id: "7", label: "Fix leaky faucets", points: 15, category: "water", icon: Droplets, completed: false },
  { id: "8", label: "Use a bucket instead of running water", points: 10, category: "water", icon: Droplets, completed: false },
  { id: "9", label: "Run washing machine with full loads only", points: 8, category: "water", icon: Droplets, completed: false },
  { id: "10", label: "Turn off tap while brushing teeth", points: 6, category: "water", icon: Droplets, completed: false },
];

const tips = [
  {
    title: "Smart Thermostat",
    description: "Installing a programmable thermostat can save up to 10% on heating and cooling costs.",
    savings: "~₹2,000/year",
    category: "energy",
  },
  {
    title: "LED Upgrade",
    description: "Replace incandescent bulbs with LEDs - they use 75% less energy and last 25x longer.",
    savings: "~₹1,500/year",
    category: "energy",
  },
  {
    title: "Rainwater Harvesting",
    description: "Collect rainwater for gardening - reduces water bill and helps the environment.",
    savings: "~₹1,000/year",
    category: "water",
  },
  {
    title: "Low-Flow Fixtures",
    description: "Install low-flow showerheads and faucet aerators to reduce water consumption by 50%.",
    savings: "~₹800/year",
    category: "water",
  },
];

export function ResourceTracker() {
  const [habits, setHabits] = useState(initialHabits);
  
  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const completedHabits = habits.filter(h => h.completed);
  const totalPoints = completedHabits.reduce((sum, h) => sum + h.points, 0);
  const maxPoints = habits.reduce((sum, h) => sum + h.points, 0);
  const ecoScore = Math.round((totalPoints / maxPoints) * 100);

  const energyHabits = habits.filter(h => h.category === "energy");
  const waterHabits = habits.filter(h => h.category === "water");

  const energyScore = Math.round(
    (energyHabits.filter(h => h.completed).reduce((sum, h) => sum + h.points, 0) /
      energyHabits.reduce((sum, h) => sum + h.points, 0)) * 100
  ) || 0;

  const waterScore = Math.round(
    (waterHabits.filter(h => h.completed).reduce((sum, h) => sum + h.points, 0) /
      waterHabits.reduce((sum, h) => sum + h.points, 0)) * 100
  ) || 0;

  return (
    <div className="space-y-6">
      {/* Eco Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-hero rounded-xl p-6 text-primary-foreground shadow-glow"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium opacity-90">Your Eco Score</h3>
            <p className="text-sm opacity-75 mt-1">Complete daily habits to boost your score</p>
          </div>
          <div className="relative">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="opacity-20"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "251.2", strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * ecoScore) / 100 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{ecoScore}%</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-primary-foreground/10 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Zap className="h-4 w-4" />
              Energy Score
            </div>
            <div className="text-2xl font-bold mt-1">{energyScore}%</div>
          </div>
          <div className="bg-primary-foreground/10 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Droplets className="h-4 w-4" />
              Water Score
            </div>
            <div className="text-2xl font-bold mt-1">{waterScore}%</div>
          </div>
        </div>
      </motion.div>

      {/* Daily Habits Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Habits */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-lg shadow-card border border-border"
        >
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-accent/20">
                <Zap className="h-4 w-4 text-accent" />
              </div>
              Energy Saving Habits
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {energyHabits.map((habit, index) => (
              <motion.button
                key={habit.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => toggleHabit(habit.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  habit.completed
                    ? "bg-primary/10 border-primary/30"
                    : "bg-muted/30 border-border hover:border-primary/50"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all ${
                    habit.completed
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground"
                  }`}
                >
                  {habit.completed && <Check className="h-4 w-4" />}
                </div>
                <span className={`flex-1 text-left text-sm ${habit.completed ? "line-through opacity-60" : ""}`}>
                  {habit.label}
                </span>
                <span className="text-xs font-medium text-primary">+{habit.points} pts</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Water Habits */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-lg shadow-card border border-border"
        >
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-secondary/20">
                <Droplets className="h-4 w-4 text-secondary" />
              </div>
              Water Saving Habits
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {waterHabits.map((habit, index) => (
              <motion.button
                key={habit.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => toggleHabit(habit.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  habit.completed
                    ? "bg-secondary/10 border-secondary/30"
                    : "bg-muted/30 border-border hover:border-secondary/50"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all ${
                    habit.completed
                      ? "bg-secondary border-secondary text-secondary-foreground"
                      : "border-muted-foreground"
                  }`}
                >
                  {habit.completed && <Check className="h-4 w-4" />}
                </div>
                <span className={`flex-1 text-left text-sm ${habit.completed ? "line-through opacity-60" : ""}`}>
                  {habit.label}
                </span>
                <span className="text-xs font-medium text-secondary">+{habit.points} pts</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Smart Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-lg shadow-card border border-border"
      >
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/20">
              <Leaf className="h-4 w-4 text-primary" />
            </div>
            Smart Saving Tips
          </h3>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">{tip.title}</h4>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  tip.category === "energy"
                    ? "bg-accent/20 text-accent"
                    : "bg-secondary/20 text-secondary"
                }`}>
                  {tip.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{tip.description}</p>
              <div className="flex items-center gap-1 text-primary">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm font-medium">Save {tip.savings}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
