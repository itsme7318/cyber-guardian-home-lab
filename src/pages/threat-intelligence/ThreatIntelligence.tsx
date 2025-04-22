
import { Layout } from "@/components/layout/Layout";
import { Shield } from "lucide-react";

export default function ThreatIntelligence() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Threat Intelligence</h1>
        <p className="text-muted-foreground">
          Access threat intelligence data and insights
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[50vh] rounded-lg border p-8 text-center">
        <Shield className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Threat Intelligence Platform</h2>
        <p className="text-muted-foreground max-w-md">
          Get real-time access to the latest threat intelligence data, indicators of compromise, and threat actor profiles.
        </p>
      </div>
    </Layout>
  );
}
