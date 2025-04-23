
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, Activity, Shield, AlertTriangle } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect, useCallback } from "react";
import { Json } from "@/integrations/supabase/types"; // Import Json type from Supabase types

interface NetworkEvent {
  id: string;
  source_ip: string;
  destination_ip: string;
  protocol: string;
  port: number;
  bytes: number;
  timestamp: string;
  event_type: string;
  severity: 'low' | 'medium' | 'high';
}

export default function NetworkMonitor() {
  const [networkEvents, setNetworkEvents] = useState<NetworkEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [networkStats, setNetworkStats] = useState({
    activeConnections: 0,
    bytesTransferred: 0,
    suspiciousActivities: 0,
    blockedAttempts: 0
  });

  // Load initial network events
  useEffect(() => {
    const loadNetworkEvents = async () => {
      const { data, error } = await supabase
        .from('scenario_events')
        .select('*')
        .eq('event_type', 'network_traffic')
        .order('timestamp', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error loading network events:', error);
      } else if (data) {
        const formattedEvents = data.map(event => {
          // Safely cast event_data to avoid TypeScript errors
          const eventData = event.event_data as Record<string, any>;
          
          return {
            id: event.id,
            source_ip: String(eventData.source_ip || 'unknown'),
            destination_ip: String(eventData.destination_ip || 'unknown'),
            protocol: String(eventData.protocol || 'TCP'),
            port: Number(eventData.port || 0),
            bytes: Number(eventData.bytes || 0),
            timestamp: event.timestamp,
            event_type: event.event_type,
            // Ensure severity is one of the allowed values
            severity: (event.severity === 'medium' || event.severity === 'high') 
              ? event.severity 
              : 'low' as 'low' | 'medium' | 'high'
          };
        });
        
        setNetworkEvents(formattedEvents);
        updateNetworkStats(formattedEvents);
      }
      setLoading(false);
    };

    loadNetworkEvents();
  }, []);

  // Handle real-time updates
  const handleRealtimeUpdate = useCallback(({ eventType, new: newEvent }) => {
    if (eventType === 'INSERT' && newEvent.event_type === 'network_traffic') {
      // Safely cast event_data to avoid TypeScript errors
      const eventData = newEvent.event_data as Record<string, any>;
      
      const formattedEvent: NetworkEvent = {
        id: newEvent.id,
        source_ip: String(eventData.source_ip || 'unknown'),
        destination_ip: String(eventData.destination_ip || 'unknown'),
        protocol: String(eventData.protocol || 'TCP'),
        port: Number(eventData.port || 0),
        bytes: Number(eventData.bytes || 0),
        timestamp: newEvent.timestamp,
        event_type: newEvent.event_type,
        // Ensure severity is one of the allowed values
        severity: (newEvent.severity === 'medium' || newEvent.severity === 'high') 
          ? newEvent.severity 
          : 'low' as 'low' | 'medium' | 'high'
      };

      setNetworkEvents(prev => {
        const updated = [formattedEvent, ...prev].slice(0, 20);
        updateNetworkStats(updated);
        return updated;
      });
    }
  }, []);

  // Subscribe to real-time events
  useSupabaseRealtime('scenario_events', handleRealtimeUpdate);

  const updateNetworkStats = (events: NetworkEvent[]) => {
    setNetworkStats({
      activeConnections: events.length,
      bytesTransferred: events.reduce((sum, event) => sum + event.bytes, 0),
      suspiciousActivities: events.filter(e => e.severity === 'medium').length,
      blockedAttempts: events.filter(e => e.severity === 'high').length
    });
  };

  const getSeverityBadge = (severity: NetworkEvent['severity']) => {
    const classes = {
      low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };

    return (
      <Badge className={classes[severity]} variant="outline">
        {severity}
      </Badge>
    );
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Network Monitor</h1>
        <p className="text-muted-foreground">
          Real-time network traffic analysis and threat detection
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Network className="h-4 w-4" />
              Active Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.activeConnections}</div>
            <Progress value={networkStats.activeConnections} max={100} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Data Transferred
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(networkStats.bytesTransferred / 1024 / 1024).toFixed(2)} MB</div>
            <Progress value={networkStats.bytesTransferred % 100} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Suspicious Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.suspiciousActivities}</div>
            <Progress value={networkStats.suspiciousActivities} max={20} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Blocked Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.blockedAttempts}</div>
            <Progress value={networkStats.blockedAttempts} max={10} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Network Traffic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Source IP</TableHead>
                  <TableHead>Destination IP</TableHead>
                  <TableHead>Protocol</TableHead>
                  <TableHead>Port</TableHead>
                  <TableHead>Bytes</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <Activity className="h-4 w-4 animate-spin mx-auto" />
                      <span className="text-sm text-muted-foreground">Loading network traffic...</span>
                    </TableCell>
                  </TableRow>
                ) : networkEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <Network className="h-8 w-8 mx-auto text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">No network traffic detected</span>
                    </TableCell>
                  </TableRow>
                ) : (
                  networkEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-mono text-xs">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{event.source_ip}</TableCell>
                      <TableCell className="font-mono text-xs">{event.destination_ip}</TableCell>
                      <TableCell>{event.protocol}</TableCell>
                      <TableCell>{event.port}</TableCell>
                      <TableCell>{(event.bytes / 1024).toFixed(2)} KB</TableCell>
                      <TableCell>{getSeverityBadge(event.severity)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
