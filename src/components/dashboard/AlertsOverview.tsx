
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

const mockAlerts: Alert[] = [
  {
    id: "alert-001",
    title: "Multiple failed login attempts",
    timestamp: "2 mins ago",
    severity: "high",
    source: "authentication-service"
  },
  {
    id: "alert-002",
    title: "Unusual file system activity",
    timestamp: "15 mins ago",
    severity: "medium",
    source: "endpoint-monitor"
  },
  {
    id: "alert-003",
    title: "New admin user created",
    timestamp: "2 hrs ago",
    severity: "medium",
    source: "user-management"
  },
  {
    id: "alert-004",
    title: "Unusual outbound connection",
    timestamp: "3 hrs ago",
    severity: "critical",
    source: "network-monitor"
  },
  {
    id: "alert-005",
    title: "Software update available",
    timestamp: "1 day ago",
    severity: "low",
    source: "update-service"
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

export function AlertsOverview() {
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
          {mockAlerts.map((alert) => (
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
