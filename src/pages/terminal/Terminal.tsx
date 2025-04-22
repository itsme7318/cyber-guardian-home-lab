
import { Layout } from "@/components/layout/Layout";
import { Terminal as TerminalIcon } from "lucide-react";

export default function Terminal() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Live Terminal</h1>
        <p className="text-muted-foreground">
          Access a secure command-line interface for system management
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[50vh] rounded-lg border p-8 text-center">
        <TerminalIcon className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Secure Command Line Interface</h2>
        <p className="text-muted-foreground max-w-md">
          Access a secure terminal for executing commands, running scripts, and managing your systems in real-time.
        </p>
      </div>
    </Layout>
  );
}
