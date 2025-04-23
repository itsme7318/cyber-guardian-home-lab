
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal as TerminalIcon, Command, Webhook, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Terminal() {
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
              <Button variant="outline" className="w-full justify-start">
                <Command className="mr-2 h-4 w-4" />
                Command Shell
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Server className="mr-2 h-4 w-4" />
                System Status
              </Button>
              <Button variant="outline" className="w-full justify-start">
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
              <Button variant="outline" className="w-full justify-start">
                <Terminal className="mr-2 h-4 w-4" />
                Port Scanner
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Terminal className="mr-2 h-4 w-4" />
                Network Monitor
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Terminal className="mr-2 h-4 w-4" />
                DNS Tools
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Command className="h-5 w-5" />
              Security Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Terminal className="mr-2 h-4 w-4" />
                Security Audit
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Terminal className="mr-2 h-4 w-4" />
                Firewall Rules
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Terminal className="mr-2 h-4 w-4" />
                Access Control
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
