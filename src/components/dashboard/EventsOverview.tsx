
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import { Activity, ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Parse event type and count from logs
function computeEventMetrics(logs: any[]) {
  const todayLogs = logs.filter(log => {
    const d = new Date(log.timestamp);
    const today = new Date();
    return d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();
  });
  
  const byTypeMap: Record<string, { count: number; change: number; isIncrease: boolean }> = {};
  let total = 0;
  let yesterday = Math.floor(Math.random() * 100) + 50; // Simulated yesterday data
  
  todayLogs.forEach(l => {
    total++;
    const t = l.event_type || "Other";
    if (!byTypeMap[t]) byTypeMap[t] = { count: 0, change: 0, isIncrease: true };
    byTypeMap[t].count++;
  });
  
  // Calculate percentages and changes
  Object.values(byTypeMap).forEach((t) => {
    t.change = Math.round(Math.random() * 20); // Simulated change
    t.isIncrease = Math.random() > 0.3; // 70% chance of increase
    if (!t.isIncrease) t.change = -t.change;
  });
  
  // Calculate total percent change
  const percentChange = yesterday > 0 ? Math.round((total - yesterday) / yesterday * 100) : 0;
  
  return {
    today: total,
    yesterday,
    percentChange,
    isIncrease: percentChange >= 0,
    byType: Object.entries(byTypeMap)
      .map(([type, d]) => ({
        type,
        ...d,
      }))
      .sort((a, b) => b.count - a.count) // Sort by count, descending
  };
}

export function EventsOverview() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch latest logs
  useEffect(() => {
    let active = true;
    setLoading(true);
    
    supabase
      .from("logs")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(100)
      .then(({ data, error }) => {
        if (active) {
          if (error) {
            console.error("Error fetching logs:", error);
            toast({
              title: "Error loading events",
              description: "Could not retrieve event information",
              variant: "destructive",
            });
          } else if (data) {
            setLogs(data);
          }
          setLoading(false);
        }
      });
      
    return () => { active = false; };
  }, [toast]);

  // Handle real-time log updates
  const handleRealtimeUpdate = useCallback(({ eventType, new: newLog, old: oldLog }) => {
    setLogs(prev => {
      if (eventType === "INSERT" && newLog) {
        // Toast only for important events - adjust as needed
        if (newLog.severity === "high" || newLog.severity === "critical") {
          toast({
            title: `New ${newLog.severity} event`,
            description: newLog.message?.substring(0, 60) || "New event detected",
            variant: "default",
          });
        }
        return [newLog, ...prev].slice(0, 100);
      }
      if (eventType === "UPDATE" && newLog) {
        return prev.map(l => l.id === newLog.id ? newLog : l);
      }
      if (eventType === "DELETE" && oldLog) {
        return prev.filter(l => l.id !== oldLog.id);
      }
      return prev;
    });
  }, [toast]);

  // Subscribe to real-time logs
  useSupabaseRealtime<any>("logs", handleRealtimeUpdate);

  const metrics = computeEventMetrics(logs);

  return (
    <Card className="cyber-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Events Overview
          {loading && (
            <Badge variant="outline" className="ml-auto animate-pulse">
              Loading...
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Events Today</p>
              <p className="text-3xl font-bold">{metrics.today.toLocaleString()}</p>
            </div>
            <div className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              metrics.isIncrease ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            }`}>
              {metrics.isIncrease ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {Math.abs(metrics.percentChange)}% from yesterday
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Events by Type</h3>
            <div className="space-y-2">
              {metrics.byType.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span className="text-sm">{item.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.count.toLocaleString()}</span>
                    <span className={`flex items-center text-xs ${
                      item.isIncrease ? "text-green-500" : "text-red-500"
                    }`}>
                      {item.isIncrease ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(item.change)}%
                    </span>
                  </div>
                </div>
              ))}
              {metrics.byType.length === 0 && !loading && (
                <div className="py-8 text-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-30" />
                  <span className="block text-xs text-muted-foreground">
                    No event data yet
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full h-24 bg-muted rounded-md flex items-center justify-center">
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground">Event timeline chart</span>
              {logs.length > 0 && (
                <div className="mt-2 flex items-center space-x-1">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i}
                      className="bg-primary/60 w-3" 
                      style={{ 
                        height: `${Math.max(4, Math.random() * 20)}px`,
                        opacity: i === 19 ? "1" : (0.3 + (i / 30)),
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
