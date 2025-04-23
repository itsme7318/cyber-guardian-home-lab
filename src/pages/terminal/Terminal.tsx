
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal as TerminalIcon, Command, Webhook, Server, Network, Shield, FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

export default function Terminal() {
  const { userHasRole } = useAuth();
  const navigate = useNavigate();
  
  const handleToolClick = (tool: string, requiredRole?: 'admin' | 'analyst') => {
    if (requiredRole && !userHasRole(requiredRole)) {
      toast({
        title: "Access Denied",
        description: `You need ${requiredRole} privileges to use this tool.`,
        variant: "destructive",
      });
      return;
    }
    
    // Here you would handle the actual tool functionality
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
                onClick={() => handleToolClick("Command Shell", "admin")}
              >
                <Command className="mr-2 h-4 w-4" />
                Command Shell
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("System Status")}
              >
                <Server className="mr-2 h-4 w-4" />
                System Status
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Service Control", "admin")}
              >
                <Webhook className="mr-2 h-4 w-4" />
                Service Control
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Network Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Port Scanner", "analyst")}
              >
                <Network className="mr-2 h-4 w-4" />
                Port Scanner
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Network Monitor")}
              >
                <Network className="mr-2 h-4 w-4" />
                Network Monitor
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("DNS Tools", "analyst")}
              >
                <Server className="mr-2 h-4 w-4" />
                DNS Tools
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Security Audit", "admin")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Security Audit
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Firewall Rules", "admin")}
              >
                <Lock className="mr-2 h-4 w-4" />
                Firewall Rules
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Access Control", "analyst")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Access Control
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
