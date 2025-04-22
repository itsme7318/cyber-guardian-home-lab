
import { Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simulating data we would get from a real SIEM system
const eventMetrics = {
  today: 12842,
  yesterday: 11639,
  percentChange: 10.3,
  isIncrease: true,
  byType: [
    { type: "Authentication", count: 4321, change: 5.2, isIncrease: true },
    { type: "Network", count: 3567, change: 12.4, isIncrease: true },
    { type: "System", count: 2854, change: 7.6, isIncrease: true },
    { type: "Application", count: 1240, change: -3.1, isIncrease: false },
    { type: "Security", count: 860, change: 22.5, isIncrease: true }
  ]
};

export function EventsOverview() {
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
              <p className="text-3xl font-bold">{eventMetrics.today.toLocaleString()}</p>
            </div>
            <div className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              eventMetrics.isIncrease ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {eventMetrics.isIncrease ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {eventMetrics.percentChange}% from yesterday
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Events by Type</h3>
            <div className="space-y-2">
              {eventMetrics.byType.map((item) => (
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
