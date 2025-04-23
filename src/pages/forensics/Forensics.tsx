
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bug, FileSearch, FileTerminal, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Forensics() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Forensics Sandbox</h1>
        <p className="text-muted-foreground">Digital forensics investigation tools</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSearch className="h-5 w-5" />
              File Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileTerminal className="mr-2 h-4 w-4" />
                Binary Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileSearch className="mr-2 h-4 w-4" />
                String Extraction
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileSearch className="mr-2 h-4 w-4" />
                File Signatures
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5" />
              Malware Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Bug className="mr-2 h-4 w-4" />
                Static Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bug className="mr-2 h-4 w-4" />
                Behavioral Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bug className="mr-2 h-4 w-4" />
                Network Traffic
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Memory Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                Memory Dump
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                Process List
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                Network Connections
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
