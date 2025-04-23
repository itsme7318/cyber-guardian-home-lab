import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal as TerminalIcon, Command, Webhook, Server, Network, Shield, FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function Terminal() {
  const handleToolClick = (tool: string) => {
    toast({
      title: "Tool Activated",
      description: `${tool} is now active.`,
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Live Terminal</h1>
        <p className="text-muted-foreground">System management and monitoring tools</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TerminalIcon className="h-5 w-5" />
              System Commands
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("System Process Monitor")}
              >
                <Command className="mr-2 h-4 w-4" />
                System Process Monitor
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Log Analyzer")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Log Analyzer
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Service Manager")}
              >
                <Server className="mr-2 h-4 w-4" />
                Service Manager
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Network Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Network Traffic Monitor")}
              >
                <Network className="mr-2 h-4 w-4" />
                Network Traffic Monitor
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Network Security Scanner", "analyst")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Network Security Scanner
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Packet Analyzer", "analyst")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Packet Analyzer
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Firewall Manager", "admin")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Firewall Manager
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("System Hardening", "admin")}
              >
                <Lock className="mr-2 h-4 w-4" />
                System Hardening
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Security Logs", "analyst")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Security Logs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
