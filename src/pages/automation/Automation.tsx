
import { Layout } from "@/components/layout/Layout";
import { Zap } from "lucide-react";

export default function Automation() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Automation</h1>
        <p className="text-muted-foreground">
          Create and manage automated security workflows
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[50vh] rounded-lg border p-8 text-center">
        <Zap className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Security Automation Engine</h2>
        <p className="text-muted-foreground max-w-md">
          Build, deploy, and manage automated security workflows to respond to incidents, perform routine tasks, and enhance your security posture.
        </p>
      </div>
    </Layout>
  );
}
