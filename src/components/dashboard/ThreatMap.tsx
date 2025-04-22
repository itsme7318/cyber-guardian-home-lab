
import { useState, useEffect, useCallback } from "react";
import { Globe, AlertTriangle, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const REGION_MAP: { [k: string]: string } = {
  "north america": "North America",
  "europe": "Europe",
  "asia": "Asia",
  "south america": "South America",
  "africa": "Africa",
  "australia": "Australia",
  "other": "Other",
};

function guessRegion(event: any): string {
  // Enhanced region detection from IP addresses
  if (!event.event_data) return "Other";
  const { src_ip } = event.event_data;
  if (!src_ip) return "Other";
  
  // Sample IP mapping rules - these could be much more comprehensive
  if (src_ip.startsWith("192.") || src_ip.startsWith("10.")) return "North America";
  if (src_ip.startsWith("185.") || src_ip.startsWith("91.")) return "Europe";
  if (src_ip.startsWith("103.") || src_ip.startsWith("116.")) return "Asia";
  if (src_ip.startsWith("177.") || src_ip.startsWith("200.")) return "South America";
  if (src_ip.startsWith("41.") || src_ip.startsWith("105.")) return "Africa";
  if (src_ip.startsWith("1.") || src_ip.startsWith("14.")) return "Australia";
  return "Other";
}

export function ThreatMap() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const { toast } = useToast();

  // Initial load of events
  useEffect(() => {
    let active = true;
    setLoading(true);
    
    supabase
      .from("scenario_events")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (active) {
          if (error) {
            console.error("Error fetching events:", error);
            toast({
              title: "Error loading threat data",
              description: "Could not retrieve threat information. Please try again.",
              variant: "destructive",
            });
          } else if (data) {
            setEvents(data);
          }
          setLoading(false);
        }
      });
      
    return () => { active = false; };
  }, [toast]);

  // Handle real-time event updates
  const handleRealtimeUpdate = useCallback(({ eventType, new: newEvent, old: oldEvent }) => {
    setEvents(prev => {
      if (eventType === "INSERT" && newEvent) {
        toast({
          title: "New Threat Detected",
          description: `${newEvent.event_type} from ${guessRegion(newEvent)}`,
          variant: "destructive",
        });
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
  }, [toast]);

  // Real-time event subscription
  useSupabaseRealtime<any>("scenario_events", handleRealtimeUpdate);

  // Count threats by region
  const regionCounts = events.reduce((agg, ev) => {
    const region = guessRegion(ev).toLowerCase();
    if (!agg[region]) agg[region] = 0;
    agg[region]++;
    return agg;
  }, { 
    "north america": 0, 
    "europe": 0, 
    "asia": 0, 
    "south america": 0,
    "africa": 0,
    "australia": 0,
    "other": 0 
  } as Record<string, number>);

  // Get events for a specific region
  const getEventsForRegion = (region: string) => {
    return events.filter(ev => guessRegion(ev).toLowerCase() === region.toLowerCase());
  };

  return (
    <Card className="cyber-card col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Global Threat Map
          {loading && (
            <Badge variant="outline" className="ml-2 animate-pulse">
              Loading...
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeRegion ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Threats in {REGION_MAP[activeRegion.toLowerCase()]}
              </h3>
              <Badge 
                variant="outline" 
                className="cursor-pointer" 
                onClick={() => setActiveRegion(null)}
              >
                Back to Map
              </Badge>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getEventsForRegion(activeRegion).slice(0, 5).map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.event_type}</TableCell>
                      <TableCell>{new Date(event.timestamp).toLocaleTimeString()}</TableCell>
                      <TableCell>
                        <Badge variant={event.severity === "high" ? "destructive" : 
                                      event.severity === "medium" ? "default" : "outline"}>
                          {event.severity || "low"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {getEventsForRegion(activeRegion).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                        No events found for this region
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <>
            <div className="relative flex flex-col items-center justify-center p-4 h-80 bg-muted/50 rounded-md border border-dashed border-muted mb-4">
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <Activity className="h-24 w-24 text-muted-foreground opacity-10" />
              </div>
              
              <Globe className="h-16 w-16 text-muted-foreground mb-4 opacity-30" />
              <p className="text-sm text-muted-foreground text-center max-w-md">
                Live map of threat origins and attack vectors from around the world.
                <span className="block mt-2 text-xs font-medium">Click on a region below to see detailed threats</span>
              </p>
              
              {events.length === 0 && !loading && (
                <div className="mt-6 text-sm text-muted-foreground">
                  No threat data available. Waiting for events...
                </div>
              )}
              
              {events.length > 0 && (
                <div className="mt-4 text-xs">
                  <Badge variant="outline" className="animate-pulse">
                    <Activity className="h-3 w-3 mr-1" />
                    Live data
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {Object.entries(REGION_MAP).map(([key, label]) => (
                <div 
                  key={key} 
                  className="bg-muted p-3 rounded-md cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => setActiveRegion(key)}
                >
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className="text-lg font-medium flex items-center">
                    {regionCounts[key] || 0}
                    {regionCounts[key] > 0 && (
                      <span className="ml-2 w-2 h-2 rounded-full bg-destructive animate-pulse"></span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
