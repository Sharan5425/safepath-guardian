
import React, { useState, useEffect } from 'react';
import { Gauge, Shield, AlertTriangle, Clock, MapPin, Zap, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const ThreatAssessment = () => {
  const [threatLevel, setThreatLevel] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  useEffect(() => {
    // Simulate threat assessment
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setThreatLevel(Math.floor(Math.random() * 25)); // Low threat for demo
      setLastUpdated(new Date());
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getThreatColor = (level: number) => {
    if (level < 30) return 'text-green-500';
    if (level < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getThreatBg = (level: number) => {
    if (level < 30) return 'bg-green-500';
    if (level < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getThreatStatus = (level: number) => {
    if (level < 30) return 'Low Risk';
    if (level < 70) return 'Moderate Risk';
    return 'High Risk';
  };

  const riskFactors = [
    { 
      id: 'time', 
      icon: <Clock className="w-5 h-5" />, 
      label: 'Time of Day', 
      value: 'Daytime (Lower Risk)',
      score: 15
    },
    { 
      id: 'location', 
      icon: <MapPin className="w-5 h-5" />, 
      label: 'Location', 
      value: 'Residential Area',
      score: 25 
    },
    { 
      id: 'environment', 
      icon: <Activity className="w-5 h-5" />, 
      label: 'Environment', 
      value: 'Well-lit Area',
      score: 10
    },
  ];

  return (
    <div className="glass rounded-xl p-6 shadow-glass max-w-xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Shield className="w-5 h-5 mr-2 text-primary" />
          Threat Assessment
        </h2>
        <div className="text-sm text-muted-foreground">
          {lastUpdated ? (
            <>Last updated: {lastUpdated.toLocaleTimeString()}</>
          ) : (
            <span className="flex items-center">
              Analyzing
              <span className="loading-dot ml-1"></span>
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
            </span>
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 flex items-center justify-center">
              {isAnalyzing ? (
                <div className="w-16 h-16 border-4 border-t-primary border-primary/30 rounded-full animate-spin"></div>
              ) : (
                <div className={cn("text-3xl font-bold", getThreatColor(threatLevel))}>
                  {threatLevel}%
                </div>
              )}
            </div>
            {!isAnalyzing && (
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#eaeaea"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={threatLevel < 30 ? "#22c55e" : threatLevel < 70 ? "#f59e0b" : "#ef4444"}
                  strokeWidth="8"
                  strokeDasharray={`${threatLevel * 2.83} 283`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
            )}
          </div>
          <div className="mt-2 font-medium">
            {isAnalyzing ? 'Analyzing environment...' : getThreatStatus(threatLevel)}
          </div>
        </div>
        
        <div className="flex-1 w-full">
          <div className="grid gap-4">
            {riskFactors.map((factor) => (
              <div key={factor.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-secondary mr-3">
                    {factor.icon}
                  </div>
                  <div>
                    <div className="font-medium">{factor.label}</div>
                    <div className="text-sm text-muted-foreground">{factor.value}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium",
                    factor.score < 30 ? "bg-green-500" : 
                    factor.score < 70 ? "bg-yellow-500" : "bg-red-500"
                  )}>
                    {factor.score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-lg">
        <div className="flex items-start">
          <div className="mt-1">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div className="ml-3">
            <h4 className="font-medium">AI-Powered Recommendation</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Current threat assessment indicates a low-risk environment. Continue with normal activities but maintain awareness of your surroundings. Consider using the SafePath route planner for optimal safety.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-center">
        <button className="flex items-center space-x-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <AlertTriangle className="w-5 h-5" />
          <span>Trigger Emergency Alert</span>
        </button>
      </div>
    </div>
  );
};

export default ThreatAssessment;
