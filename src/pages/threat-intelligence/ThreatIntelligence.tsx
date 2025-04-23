import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Globe, AlertTriangle, Search, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function ThreatIntelligence() {
  const handleToolClick = (tool: string) => {
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
              <Database className="h-5 w-5" />
              Threat Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Known Threats Database")}
              >
                <Database className="mr-2 h-4 w-4" />
                Known Threats Database
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Malware Repository")}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Malware Repository
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Attack Pattern Library")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Attack Pattern Library
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
                onClick={() => handleToolClick("Real-time Threat Scanner")}
              >
                <Search className="mr-2 h-4 w-4" />
                Real-time Threat Scanner
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Threat Correlation Engine", "analyst")}
              >
                <Globe className="mr-2 h-4 w-4" />
                Threat Correlation Engine
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Forensic Analysis", "analyst")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Forensic Analysis
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Response Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Automated Response", "admin")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Automated Response
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Incident Management", "analyst")}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Incident Management
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleToolClick("Mitigation Planning")}
              >
                <Database className="mr-2 h-4 w-4" />
                Mitigation Planning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
