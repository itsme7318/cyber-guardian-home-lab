
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Globe, AlertTriangle, Search, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThreatIntelligence() {
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
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                IoC Database
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Active Threats
              </Button>
              <Button variant="outline" className="w-full justify-start">
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
              <Button variant="outline" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Malware Database
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                Vulnerability Scanner
              </Button>
              <Button variant="outline" className="w-full justify-start">
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
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Block Threats
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Alert Rules
              </Button>
              <Button variant="outline" className="w-full justify-start">
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
