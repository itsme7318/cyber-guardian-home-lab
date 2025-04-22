
import { useState, useEffect, useCallback } from "react";
import { Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";

const REGION_MAP: { [k: string]: string } = {
  "north america": "North America",
  "europe": "Europe",
  "asia": "Asia",
  "other": "Other",
};

function guessRegion(event: any): string {
  // Guess region from event data—adjust logic as needed for your setup
  if (!event.event_data) return "Other";
  const { src_ip } = event.event_data;
  if (!src_ip) return "Other";
  if (src_ip.startsWith("192.")) return "North America";
  if (src_ip.startsWith("185.")) return "Europe";
  if (src_ip.startsWith("103.")) return "Asia";
  return "Other";
}

export function ThreatMap() {
  const [events, setEvents] = useState<any[]>([]);

  // Initial load of events
  useEffect(() => {
    let active = true;
    supabase
      .from("scenario_events")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (active && data) setEvents(data);
      });
    return () => { active = false; };
  }, []);

  // Real-time event updates
  useSupabaseRealtime<any>("scenario_events", useCallback(({ eventType, new: newEvent, old: oldEvent }) => {
    setEvents(prev => {
      if (eventType === "INSERT" && newEvent) {
        return [newEvent, ...prev].slice(0, 50);
      }
      if (eventType === "UPDATE" && newEvent) {
        return prev.map(ev => ev.id === newEvent.id ? newEvent : ev);
      }
      if (eventType === "DELETE" && oldEvent) {
        return prev.filter(ev => ev.id !== oldEvent.id);
      }
      return prev;
    });
  }, []));

  // Count by region
  const regionCounts = events.reduce((agg, ev) => {
    const region = guessRegion(ev).toLowerCase();
    if (!agg[region]) agg[region] = 0;
    agg[region]++;
    return agg;
  }, { "north america": 0, "europe": 0, "asia": 0, "other": 0 } as Record<string, number>);

  return (
    <Card className="cyber-card col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Global Threat Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center p-4 h-80 bg-muted/50 rounded-md border border-dashed border-muted">
          <Globe className="h-16 w-16 text-muted-foreground mb-4 opacity-30" />
          <p className="text-sm text-muted-foreground">
            Live map of threat origins and attack vectors from around the world.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            This now updates in real-time with incoming scenario events.
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-3 mt-4">
          {["North America", "Europe", "Asia", "Other"].map(region => (
            <div key={region} className="bg-muted p-3 rounded-md">
              <p className="text-xs text-muted-foreground mb-1">{region}</p>
              <p className="text-lg font-medium">
                {regionCounts[region.toLowerCase()] || 0}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
