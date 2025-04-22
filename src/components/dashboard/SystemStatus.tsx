
import { Activity, Server, Wifi, Database, Laptop, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SystemComponent {
  name: string;
  status: "operational" | "degraded" | "outage";
  icon: React.ReactNode;
}

const systemComponents: SystemComponent[] = [
  { name: "Log Collection", status: "operational", icon: <Database className="h-4 w-4" /> },
  { name: "Analysis Engine", status: "operational", icon: <Activity className="h-4 w-4" /> },
  { name: "Network Monitoring", status: "operational", icon: <Wifi className="h-4 w-4" /> },
  { name: "Endpoint Agents", status: "degraded", icon: <Laptop className="h-4 w-4" /> },
  { name: "Storage System", status: "operational", icon: <Server className="h-4 w-4" /> }
];

const systemMetrics = {
  cpuUsage: 67,
  ramUsage: 45,
  diskUsage: 32,
  eventsPerSecond: 824
};

const getStatusIcon = (status: SystemComponent["status"]) => {
  switch (status) {
    case "operational":
      return <span className="h-2 w-2 rounded-full bg-cyber-success"></span>;
    case "degraded":
      return <span className="h-2 w-2 rounded-full bg-cyber-warning"></span>;
    case "outage":
      return <span className="h-2 w-2 rounded-full bg-cyber-danger"></span>;
    default:
      return null;
  }
};

export function SystemStatus() {
  return (
    <Card className="cyber-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Server className="h-5 w-5" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Components</h3>
            <div className="space-y-1">
              {systemComponents.map((component) => (
                <div key={component.name} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    {component.icon}
                    <span className="text-sm">{component.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(component.status)}
                    <span className="text-xs capitalize text-muted-foreground">
                      {component.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">System Resources</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>CPU Usage</span>
                  <span>{systemMetrics.cpuUsage}%</span>
                </div>
                <Progress value={systemMetrics.cpuUsage} className="h-1" />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>RAM Usage</span>
                  <span>{systemMetrics.ramUsage}%</span>
                </div>
                <Progress value={systemMetrics.ramUsage} className="h-1" />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Disk Usage</span>
                  <span>{systemMetrics.diskUsage}%</span>
                </div>
                <Progress value={systemMetrics.diskUsage} className="h-1" />
              </div>
            </div>
          </div>
          
          <div className="bg-muted rounded-md p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyber-accent" />
              <span className="text-sm font-medium">Events per second</span>
            </div>
            <span className="text-lg font-medium">{systemMetrics.eventsPerSecond}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
