
import { useState, useEffect, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { Database, Search, Filter, RefreshCw, ChevronDown, ArrowDownUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Log {
  id: string;
  event_type: string;
  message: string;
  source: string;
  severity: string | null;
  timestamp: string | null;
  ip_address: string | null;
}

const getSeverityBadge = (severity: string | null) => {
  const severityMap: Record<string, string> = {
    "low": "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
    "medium": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    "high": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    "critical": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  const className = severityMap[severity?.toLowerCase() || "low"] || severityMap["low"];
  
  return (
    <Badge className={className} variant="outline">
      {severity || "low"}
    </Badge>
  );
};

export default function LogExplorer() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof Log>("timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [eventTypeFilter, setEventTypeFilter] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const { toast } = useToast();

  // Function to refresh data
  const refreshData = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  // Initial load of logs
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
              title: "Error loading logs",
              description: "Could not retrieve log information",
              variant: "destructive",
            });
          } else if (data) {
            setLogs(data as Log[]);
            setFilteredLogs(data as Log[]);
          }
          setLoading(false);
        }
      });
      
    return () => { active = false; };
  }, [refreshKey, toast]);

  // Handle real-time log updates
  const handleRealtimeUpdate = useCallback(({ eventType, new: newLog, old: oldLog }) => {
    setLogs(prev => {
      let updatedLogs = [...prev];
      
      if (eventType === "INSERT" && newLog) {
        updatedLogs = [newLog as Log, ...prev].slice(0, 100);
        toast({
          title: "New Log Entry",
          description: `${newLog.event_type}: ${newLog.message?.substring(0, 30)}...`,
        });
      }
      if (eventType === "UPDATE" && newLog) {
        updatedLogs = prev.map(l => l.id === newLog.id ? newLog as Log : l);
      }
      if (eventType === "DELETE" && oldLog) {
        updatedLogs = prev.filter(l => l.id !== oldLog.id);
      }
      
      return updatedLogs;
    });
  }, [toast]);

  // Subscribe to real-time logs
  useSupabaseRealtime<Log>("logs", handleRealtimeUpdate);
  
  // Apply filters and sorting whenever logs, search, or filters change
  useEffect(() => {
    let result = [...logs];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(log => 
        log.message?.toLowerCase().includes(query) ||
        log.event_type?.toLowerCase().includes(query) ||
        log.source?.toLowerCase().includes(query) ||
        log.ip_address?.toLowerCase().includes(query)
      );
    }
    
    // Apply event type filter
    if (eventTypeFilter) {
      result = result.filter(log => log.event_type === eventTypeFilter);
    }
    
    // Apply source filter
    if (sourceFilter) {
      result = result.filter(log => log.source === sourceFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      // Handle null values
      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return 1;
      if (bValue === null) return -1;
      
      // Compare values
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
    
    setFilteredLogs(result);
  }, [logs, searchQuery, eventTypeFilter, sourceFilter, sortField, sortDirection]);
  
  // Get unique event types and sources for filters
  const eventTypes = Array.from(new Set(logs.map(log => log.event_type))).sort();
  const sources = Array.from(new Set(logs.map(log => log.source))).sort();
  
  // Handle sorting changes
  const handleSort = (field: keyof Log) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // Default to descending when changing fields
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Log Explorer</h1>
        <p className="text-muted-foreground">
          Search and analyze logs from all monitored systems
        </p>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs by message, type, source..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Event Type
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setEventTypeFilter(null)}>
              All Types
            </DropdownMenuItem>
            {eventTypes.map(type => (
              <DropdownMenuItem key={type} onClick={() => setEventTypeFilter(type)}>
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Source
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSourceFilter(null)}>
              All Sources
            </DropdownMenuItem>
            {sources.map(source => (
              <DropdownMenuItem key={source} onClick={() => setSourceFilter(source)}>
                {source}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="outline" onClick={refreshData} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      {/* Active filters */}
      {(eventTypeFilter || sourceFilter) && (
        <div className="mb-4 flex gap-2 flex-wrap">
          {eventTypeFilter && (
            <Badge variant="secondary" className="flex items-center gap-2">
              Type: {eventTypeFilter}
              <button onClick={() => setEventTypeFilter(null)} className="ml-1">×</button>
            </Badge>
          )}
          {sourceFilter && (
            <Badge variant="secondary" className="flex items-center gap-2">
              Source: {sourceFilter}
              <button onClick={() => setSourceFilter(null)} className="ml-1">×</button>
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={() => {
            setEventTypeFilter(null);
            setSourceFilter(null);
          }}>
            Clear all
          </Button>
        </div>
      )}
      
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('timestamp')}
                >
                  <div className="flex items-center">
                    Time
                    {sortField === 'timestamp' && (
                      <ArrowDownUp className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('event_type')}
                >
                  <div className="flex items-center">
                    Type
                    {sortField === 'event_type' && (
                      <ArrowDownUp className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead>Message</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('source')}
                >
                  <div className="flex items-center">
                    Source
                    {sortField === 'source' && (
                      <ArrowDownUp className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('severity')}
                >
                  <div className="flex items-center">
                    Severity
                    {sortField === 'severity' && (
                      <ArrowDownUp className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                      <span className="mt-2 text-sm text-muted-foreground">Loading logs...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-xs">
                      {log.timestamp ? new Date(log.timestamp).toLocaleString() : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.event_type}</Badge>
                    </TableCell>
                    <TableCell className="max-w-sm truncate">{log.message}</TableCell>
                    <TableCell>{log.source}</TableCell>
                    <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                    <TableCell className="font-mono text-xs">{log.ip_address || "-"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Database className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No logs found</h3>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </Layout>
  );
}
