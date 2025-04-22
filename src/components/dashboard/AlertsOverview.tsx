
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Alert {
  id: string;
  title: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  source: string;
}

const getSeverityBadge = (severity: Alert["severity"]) => {
  const classes = {
    low: "alert-badge-low",
    medium: "alert-badge-medium",
    high: "alert-badge-high",
    critical: "alert-badge-critical"
  };

  return <span className={classes[severity]}>{severity}</span>;
};

export function AlertsOverview() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  
  // Fetch existing alerts from Supabase table
  useEffect(() => {
    let isMounted = true;
    supabase
      .from("alerts")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(5)
      .then(({ data }) => {
        if (isMounted && data) {
          setAlerts(
            data.map((a: any) => ({
              id: a.id,
              title: a.notes || "Alert",
              timestamp: new Date(a.timestamp).toLocaleString(),
              severity: (a.severity || "low"),
              source: (a.status || "-"),
            }))
          );
        }
      });
    return () => { isMounted = false; };
  }, []);

  // Subscribe to real-time new/updated/deleted alerts
  useSupabaseRealtime<any>("alerts", useCallback(({ eventType, new: newAlert, old: oldAlert }) => {
    setAlerts((prev) => {
      if (eventType === "INSERT" && newAlert) {
        const formatted = {
          id: newAlert.id,
          title: newAlert.notes || "Alert",
          timestamp: new Date(newAlert.timestamp).toLocaleString(),
          severity: (newAlert.severity || "low"),
          source: (newAlert.status || "-"),
        };
        return [formatted, ...prev].slice(0, 5);
      }
      if (eventType === "UPDATE" && newAlert) {
        return prev.map(a => a.id === newAlert.id ? {
          id: newAlert.id,
          title: newAlert.notes || "Alert",
          timestamp: new Date(newAlert.timestamp).toLocaleString(),
          severity: (newAlert.severity || "low"),
          source: (newAlert.status || "-"),
        } : a);
      }
      if (eventType === "DELETE" && oldAlert) {
        return prev.filter(a => a.id !== oldAlert.id);
      }
      return prev;
    });
  }, []));

  return (
    <Card className="cyber-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Latest Alerts
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
          {alerts.length === 0 && (
            <div className="p-6 text-center text-muted-foreground">No live alerts yet!</div>
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
