
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Globe, AlertTriangle, Search, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

export default function ThreatIntelligence() {
  const { userHasRole } = useAuth();
  
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
        <h1 className="text-3xl font-bold mb-2">Threat Intelligence</h1>
        <p className="text-muted-foreground">Analyze and track security threats</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Threat Feeds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("IoC Database")}
              >
                <Shield className="mr-2 h-4 w-4" />
                IoC Database
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Active Threats", "analyst")}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Active Threats
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Global Intel Map", "analyst")}
              >
                <Globe className="mr-2 h-4 w-4" />
                Global Intel Map
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Threat Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Malware Database")}
              >
                <Search className="mr-2 h-4 w-4" />
                Malware Database
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Vulnerability Scanner", "analyst")}
              >
                <Database className="mr-2 h-4 w-4" />
                Vulnerability Scanner
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Reputation Check")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Reputation Check
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Threat Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Block Threats", "admin")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Block Threats
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Alert Rules", "analyst")}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Alert Rules
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Export Intel")}
              >
                <Database className="mr-2 h-4 w-4" />
                Export Intel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
