
import { Layout } from "@/components/layout/Layout";
import { Bug } from "lucide-react";

export default function Forensics() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Forensics Sandbox</h1>
        <p className="text-muted-foreground">
          Analyze suspicious files and conduct investigations safely
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[50vh] rounded-lg border p-8 text-center">
        <Bug className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Digital Forensics Platform</h2>
        <p className="text-muted-foreground max-w-md">
          Safely analyze suspicious files, conduct malware analysis, and perform digital forensics investigations in an isolated environment.
        </p>
      </div>
    </Layout>
  );
}
