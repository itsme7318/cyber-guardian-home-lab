
import { Layout } from "@/components/layout/Layout";
import { Database } from "lucide-react";

export default function LogExplorer() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Log Explorer</h1>
        <p className="text-muted-foreground">
          Search and analyze logs from all monitored systems
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[50vh] rounded-lg border p-8 text-center">
        <Database className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Log Explorer Tool</h2>
        <p className="text-muted-foreground max-w-md">
          This tool allows you to search, filter, and analyze logs from all monitored systems in real-time.
        </p>
      </div>
    </Layout>
  );
}
