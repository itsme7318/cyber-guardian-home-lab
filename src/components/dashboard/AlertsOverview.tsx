
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import { AlertTriangle, ArrowRight, Bell } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  title: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  source: string;
}

const getSeverityBadge = (severity: Alert["severity"]) => {
  const classes = {
    low: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };

  return (
    <Badge className={`${classes[severity]} hover:${classes[severity]}`} variant="outline">
      {severity}
    </Badge>
  );
};

export function AlertsOverview() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Fetch existing alerts from Supabase table
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    supabase
      .from("alerts")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(5)
      .then(({ data, error }) => {
        if (isMounted) {
          if (error) {
            console.error("Error fetching alerts:", error);
            toast({
              title: "Error loading alerts",
              description: "Could not retrieve alert information",
              variant: "destructive",
            });
          } else if (data) {
            setAlerts(
              data.map((a: any) => ({
                id: a.id,
                title: a.notes || "Alert",
                timestamp: new Date(a.timestamp).toLocaleString(),
                severity: (a.severity || "low") as Alert["severity"],
                source: (a.status || "-"),
              }))
            );
          }
          setLoading(false);
        }
      });
      
    return () => { isMounted = false; };
  }, [toast]);

  // Handle real-time alert updates
  const handleRealtimeUpdate = useCallback(({ eventType, new: newAlert, old: oldAlert }) => {
    setAlerts((prev) => {
      if (eventType === "INSERT" && newAlert) {
        const formatted = {
          id: newAlert.id,
          title: newAlert.notes || "Alert",
          timestamp: new Date(newAlert.timestamp).toLocaleString(),
          severity: (newAlert.severity || "low") as Alert["severity"],
          source: (newAlert.status || "-"),
        };
        
        // Show toast notification for new alert
        if (newAlert.severity === "high" || newAlert.severity === "critical") {
          toast({
            title: `New ${formatted.severity} alert`,
            description: formatted.title,
            variant: "destructive",
          });
        }
        
        return [formatted, ...prev].slice(0, 5);
      }
      if (eventType === "UPDATE" && newAlert) {
        return prev.map(a => a.id === newAlert.id ? {
          id: newAlert.id,
          title: newAlert.notes || "Alert",
          timestamp: new Date(newAlert.timestamp).toLocaleString(),
          severity: (newAlert.severity || "low") as Alert["severity"],
          source: (newAlert.status || "-"),
        } : a);
      }
      if (eventType === "DELETE" && oldAlert) {
        return prev.filter(a => a.id !== oldAlert.id);
      }
      return prev;
    });
  }, [toast]);

  // Subscribe to real-time alerts
  useSupabaseRealtime<any>("alerts", handleRealtimeUpdate);

  return (
    <Card className="cyber-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Latest Alerts
          {loading && (
            <Badge variant="outline" className="ml-auto animate-pulse">
              Loading...
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium">{alert.title}</h3>
                {getSeverityBadge(alert.severity)}
              </div>
              <div className="text-sm text-muted-foreground flex justify-between">
                <span>Source: {alert.source}</span>
                <span>{alert.timestamp}</span>
              </div>
            </div>
          ))}
          {alerts.length === 0 && !loading && (
            <div className="py-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-30" />
              <p className="text-muted-foreground">No alerts yet!</p>
              <p className="text-xs text-muted-foreground mt-1">Alerts will appear here in real-time</p>
            </div>
          )}
          {alerts.length === 0 && loading && (
            <div className="p-6 text-center text-muted-foreground">Loading alerts...</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link to="/alerts" className="w-full">
          <Button variant="ghost" className="w-full justify-between">
            View all alerts
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
