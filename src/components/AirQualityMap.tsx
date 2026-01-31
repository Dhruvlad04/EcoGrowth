import { motion } from "framer-motion";
import { Wind, AlertTriangle, CheckCircle, Info, MapPin } from "lucide-react";
import { useState } from "react";

interface Neighborhood {
  id: string;
  name: string;
  aqi: number;
  lat: number;
  lng: number;
}

const neighborhoods: Neighborhood[] = [
  { id: "1", name: "Downtown", aqi: 42, lat: 30, lng: 25 },
  { id: "2", name: "Riverside", aqi: 28, lat: 50, lng: 60 },
  { id: "3", name: "Industrial Zone", aqi: 125, lat: 70, lng: 30 },
  { id: "4", name: "Green Park", aqi: 18, lat: 25, lng: 70 },
  { id: "5", name: "Harbor District", aqi: 85, lat: 60, lng: 75 },
  { id: "6", name: "University Area", aqi: 35, lat: 40, lng: 45 },
  { id: "7", name: "Suburb Heights", aqi: 22, lat: 15, lng: 40 },
  { id: "8", name: "Market Square", aqi: 68, lat: 55, lng: 20 },
];

const getAqiStatus = (aqi: number) => {
  if (aqi <= 50) return { label: "Good", color: "bg-aqi-good", textColor: "text-aqi-good", icon: CheckCircle };
  if (aqi <= 100) return { label: "Moderate", color: "bg-aqi-moderate", textColor: "text-aqi-moderate", icon: Info };
  if (aqi <= 150) return { label: "Unhealthy", color: "bg-aqi-unhealthy", textColor: "text-aqi-unhealthy", icon: AlertTriangle };
  return { label: "Hazardous", color: "bg-aqi-hazardous", textColor: "text-aqi-hazardous", icon: AlertTriangle };
};

const getHealthRecommendation = (aqi: number) => {
  if (aqi <= 50) return "Air quality is excellent! Perfect for outdoor activities.";
  if (aqi <= 100) return "Acceptable air quality. Sensitive individuals should limit prolonged outdoor exertion.";
  if (aqi <= 150) return "Unhealthy for sensitive groups. Consider wearing a mask outdoors.";
  return "Health alert! Avoid outdoor activities and keep windows closed.";
};

export function AirQualityMap() {
  const [selectedArea, setSelectedArea] = useState<Neighborhood | null>(neighborhoods[0]);
  const averageAqi = Math.round(neighborhoods.reduce((sum, n) => sum + n.aqi, 0) / neighborhoods.length);
  const avgStatus = getAqiStatus(averageAqi);
  const StatusIcon = avgStatus.icon;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg p-6 shadow-card border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${avgStatus.color}`}>
              <Wind className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">City Average AQI</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{averageAqi}</span>
            <span className={`text-sm font-medium ${avgStatus.textColor}`}>{avgStatus.label}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-lg p-6 shadow-card border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-aqi-good">
              <CheckCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Cleanest Area</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">Green Park</span>
            <span className="text-sm text-aqi-good">AQI 18</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-lg p-6 shadow-card border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-aqi-unhealthy">
              <AlertTriangle className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Active Alerts</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">2</span>
            <span className="text-sm text-muted-foreground">areas need attention</span>
          </div>
        </motion.div>
      </div>

      {/* Interactive Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-lg shadow-card border border-border overflow-hidden"
      >
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Neighborhood Air Quality Map
          </h3>
        </div>
        
        <div className="relative h-[400px] bg-gradient-to-br from-muted/30 to-muted/60 p-4">
          {/* Map Grid Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Neighborhood Markers */}
          {neighborhoods.map((neighborhood, index) => {
            const status = getAqiStatus(neighborhood.aqi);
            const isSelected = selectedArea?.id === neighborhood.id;
            
            return (
              <motion.button
                key={neighborhood.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                onClick={() => setSelectedArea(neighborhood)}
                style={{
                  left: `${neighborhood.lng}%`,
                  top: `${neighborhood.lat}%`,
                }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  isSelected ? "z-20 scale-125" : "z-10 hover:scale-110"
                }`}
              >
                <div className="relative">
                  {/* Pulse effect for alerts */}
                  {neighborhood.aqi > 100 && (
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 rounded-full ${status.color}`}
                    />
                  )}
                  
                  <div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-full ${status.color} text-primary-foreground shadow-lg ${
                      isSelected ? "ring-4 ring-primary/30" : ""
                    }`}
                  >
                    <span className="text-sm font-bold">{neighborhood.aqi}</span>
                  </div>
                  
                  {/* Label */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-xs font-medium bg-card px-2 py-1 rounded shadow-sm border border-border ${
                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  } transition-opacity`}>
                    {neighborhood.name}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Area Details */}
        {selectedArea && (
          <motion.div
            key={selectedArea.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border-t border-border bg-muted/30"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-semibold text-lg">{selectedArea.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getAqiStatus(selectedArea.aqi).color} text-primary-foreground`}>
                    <StatusIcon className="h-3 w-3" />
                    {getAqiStatus(selectedArea.aqi).label}
                  </span>
                  <span className="text-sm text-muted-foreground">AQI: {selectedArea.aqi}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground max-w-xs">
                  {getHealthRecommendation(selectedArea.aqi)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* AQI Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-aqi-good" />
          <span>Good (0-50)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-aqi-moderate" />
          <span>Moderate (51-100)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-aqi-unhealthy" />
          <span>Unhealthy (101-150)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-aqi-hazardous" />
          <span>Hazardous (150+)</span>
        </div>
      </div>
    </div>
  );
}
