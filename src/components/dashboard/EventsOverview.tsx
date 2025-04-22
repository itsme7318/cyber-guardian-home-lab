
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import { Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  todayLogs.forEach(l => {
    total++;
    const t = l.event_type || "Other";
    if (!byTypeMap[t]) byTypeMap[t] = { count: 0, change: 0, isIncrease: true };
    byTypeMap[t].count++;
  });
  // Dummy change data for illustration
  Object.values(byTypeMap).forEach((t) => {
    t.change = Math.round(Math.random() * 20 - 10);
    t.isIncrease = t.change >= 0;
  });
  return {
    today: total,
    yesterday: 0,
    percentChange: 0,
    isIncrease: true,
    byType: Object.entries(byTypeMap).map(([type, d]) => ({
      type,
      ...d,
    })),
  };
}

export function EventsOverview() {
  const [logs, setLogs] = useState<any[]>([]);

  // Fetch latest logs
  useEffect(() => {
    let active = true;
    supabase
      .from("logs")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(100)
      .then(({ data }) => {
        if (active && data) setLogs(data);
      });
    return () => { active = false; };
  }, []);

  // Subscribe to realtime logs
  useSupabaseRealtime<any>("logs", useCallback(({ eventType, new: newLog, old: oldLog }) => {
    setLogs(prev => {
      if (eventType === "INSERT" && newLog) {
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
  }, []));

  const metrics = computeEventMetrics(logs);

  return (
    <Card className="cyber-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Events Overview
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
              metrics.isIncrease ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {metrics.isIncrease ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {metrics.percentChange}% from yesterday
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
              {metrics.byType.length === 0 && (
                <span className="block text-xs text-muted-foreground">
                  No event data yet!
                </span>
              )}
            </div>
          </div>
          
          <div className="w-full h-24 bg-muted rounded-md flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Event timeline chart would appear here</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
