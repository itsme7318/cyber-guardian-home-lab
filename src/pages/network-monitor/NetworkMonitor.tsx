
import { Layout } from "@/components/layout/Layout";
import { Network } from "lucide-react";

export default function NetworkMonitor() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Network Monitor</h1>
        <p className="text-muted-foreground">
          Monitor network traffic and identify anomalies
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[50vh] rounded-lg border p-8 text-center">
        <Network className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Network Monitoring Dashboard</h2>
        <p className="text-muted-foreground max-w-md">
          Visualize network traffic patterns, detect anomalies, and identify potential security threats in your network.
        </p>
      </div>
    </Layout>
  );
}
