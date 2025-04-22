
import { Layout } from "@/components/layout/Layout";
import { AlertTriangle, Filter, MoreHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  source: string;
  status: "new" | "in-progress" | "resolved";
}

// In a real app, this would come from your SIEM system
const mockAlerts: Alert[] = [
  {
    id: "alert-001",
    title: "Multiple failed login attempts",
    description: "10 failed login attempts detected for user 'admin' from IP 192.168.1.105",
    timestamp: "2025-04-22 10:13:54",
    severity: "high",
    source: "authentication-service",
    status: "new"
  },
  {
    id: "alert-002",
    title: "Unusual file system activity",
    description: "Rapid file deletion detected in /var/log directory",
    timestamp: "2025-04-22 09:58:32",
    severity: "medium",
    source: "endpoint-monitor",
    status: "new"
  },
  {
    id: "alert-003",
    title: "New admin user created",
    description: "Admin user 'backdoor' created outside of change control window",
    timestamp: "2025-04-22 08:42:15",
    severity: "medium",
    source: "user-management",
    status: "in-progress"
  },
  {
    id: "alert-004",
    title: "Unusual outbound connection",
    description: "Endpoint 'workstation-05' established connection to IP 185.143.223.12 on port 4444",
    timestamp: "2025-04-22 07:31:09",
    severity: "critical",
    source: "network-monitor",
    status: "in-progress"
  },
  {
    id: "alert-005",
    title: "Software update available",
    description: "Critical security update available for endpoint agent",
    timestamp: "2025-04-21 23:15:47",
    severity: "low",
    source: "update-service",
    status: "resolved"
  },
  {
    id: "alert-006",
    title: "Malware detection",
    description: "Potential malware 'trojanus.exe' detected on 'workstation-12'",
    timestamp: "2025-04-21 17:22:35",
    severity: "high",
    source: "antivirus",
    status: "resolved"
  }
];

const getSeverityBadge = (severity: Alert["severity"]) => {
  const classes = {
    low: "alert-badge-low",
    medium: "alert-badge-medium",
    high: "alert-badge-high",
    critical: "alert-badge-critical"
  };

  return <span className={classes[severity]}>{severity}</span>;
};

const getStatusBadge = (status: Alert["status"]) => {
  const classes = {
    "new": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    "resolved": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${classes[status]}`}>
      {status === "in-progress" ? "in progress" : status}
    </span>
  );
};

export default function Alerts() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredAlerts = mockAlerts.filter(alert => 
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Security Alerts</h1>
        <p className="text-muted-foreground">
          View and manage security alerts from all monitored systems
        </p>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Severity</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Alert</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Source</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Time</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-sm font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">{getSeverityBadge(alert.severity)}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{alert.title}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{alert.description}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">{alert.source}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">{alert.timestamp}</td>
                  <td className="px-4 py-3">{getStatusBadge(alert.status)}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAlerts.length === 0 && (
          <div className="py-12 text-center">
            <AlertTriangle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium">No alerts found</h3>
            <p className="text-muted-foreground">
              No alerts match your search criteria
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
