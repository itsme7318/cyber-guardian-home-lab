
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ArchitectureDiagram() {
  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle>SIEM Architecture Overview</CardTitle>
        <CardDescription>
          Core components of the Cyber Guardian SIEM system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-6 bg-muted/50 rounded-md border border-dashed border-muted">
          <div className="text-center mb-8">
            <h3 className="font-medium text-lg mb-1">Cyber Guardian SIEM Platform</h3>
            <p className="text-sm text-muted-foreground">Comprehensive security monitoring and response</p>
          </div>
          
          <div className="relative w-full h-[500px] text-center">
            {/* Data Sources */}
            <div className="absolute top-0 left-0 right-0 flex justify-around">
              <div className="bg-background p-3 rounded-md border border-border w-[120px]">
                <div className="text-xs font-medium mb-1">Endpoints</div>
                <div className="text-xs text-muted-foreground">Windows, Linux, macOS</div>
              </div>
              
              <div className="bg-background p-3 rounded-md border border-border w-[120px]">
                <div className="text-xs font-medium mb-1">Network</div>
                <div className="text-xs text-muted-foreground">Firewalls, Routers</div>
              </div>
              
              <div className="bg-background p-3 rounded-md border border-border w-[120px]">
                <div className="text-xs font-medium mb-1">Cloud</div>
                <div className="text-xs text-muted-foreground">AWS, Azure, GCP</div>
              </div>
              
              <div className="bg-background p-3 rounded-md border border-border w-[120px]">
                <div className="text-xs font-medium mb-1">Applications</div>
                <div className="text-xs text-muted-foreground">Web, DB, Auth</div>
              </div>
            </div>
            
            {/* Flow Arrows from Sources */}
            <div className="absolute top-[60px] left-0 right-0 h-[50px] flex items-center justify-center">
              <div className="text-xs text-muted-foreground">Log Collection</div>
              <div className="absolute top-[10px] left-[80px] w-[1px] h-[40px] bg-border"></div>
              <div className="absolute top-[10px] left-[230px] w-[1px] h-[40px] bg-border"></div>
              <div className="absolute top-[10px] left-[380px] w-[1px] h-[40px] bg-border"></div>
              <div className="absolute top-[10px] left-[530px] w-[1px] h-[40px] bg-border"></div>
            </div>
            
            {/* Collection Layer */}
            <div className="absolute top-[120px] left-0 right-0 mx-auto bg-background p-4 rounded-md border border-border w-[80%]">
              <div className="text-sm font-medium mb-2">Data Collection Layer</div>
              <div className="flex justify-around">
                <div className="p-2 bg-muted/50 rounded w-[100px]">
                  <div className="text-xs">Agents</div>
                </div>
                <div className="p-2 bg-muted/50 rounded w-[100px]">
                  <div className="text-xs">Syslog</div>
                </div>
                <div className="p-2 bg-muted/50 rounded w-[100px]">
                  <div className="text-xs">APIs</div>
                </div>
                <div className="p-2 bg-muted/50 rounded w-[100px]">
                  <div className="text-xs">Collectors</div>
                </div>
              </div>
            </div>
            
            {/* Flow Arrow */}
            <div className="absolute top-[190px] left-0 right-0 h-[40px] flex items-center justify-center">
              <div className="w-[1px] h-[40px] bg-border"></div>
            </div>
            
            {/* Processing Layer */}
            <div className="absolute top-[240px] left-0 right-0 mx-auto bg-background p-4 rounded-md border border-border w-[80%]">
              <div className="text-sm font-medium mb-2">Data Processing Layer</div>
              <div className="flex justify-around">
                <div className="p-2 bg-muted/50 rounded w-[100px]">
                  <div className="text-xs">Parsing</div>
                </div>
                <div className="p-2 bg-muted/50 rounded w-[100px]">
                  <div className="text-xs">Normalization</div>
                </div>
                <div className="p-2 bg-muted/50 rounded w-[100px]">
                  <div className="text-xs">Enrichment</div>
                </div>
                <div className="p-2 bg-muted/50 rounded w-[100px]">
                  <div className="text-xs">Indexing</div>
                </div>
              </div>
            </div>
            
            {/* Flow Arrow */}
            <div className="absolute top-[310px] left-0 right-0 h-[40px] flex items-center justify-center">
              <div className="w-[1px] h-[40px] bg-border"></div>
            </div>
            
            {/* Analysis Layer */}
            <div className="absolute top-[360px] left-0 right-0 mx-auto bg-cyber-accent/20 p-4 rounded-md border border-cyber-accent w-[80%]">
              <div className="text-sm font-medium mb-2">Analysis & Detection Layer</div>
              <div className="flex justify-around">
                <div className="p-2 bg-cyber-accent/30 rounded w-[100px]">
                  <div className="text-xs">Correlation</div>
                </div>
                <div className="p-2 bg-cyber-accent/30 rounded w-[100px]">
                  <div className="text-xs">ML/AI</div>
                </div>
                <div className="p-2 bg-cyber-accent/30 rounded w-[100px]">
                  <div className="text-xs">UEBA</div>
                </div>
                <div className="p-2 bg-cyber-accent/30 rounded w-[100px]">
                  <div className="text-xs">Threat Intel</div>
                </div>
              </div>
            </div>
            
            {/* Output Flows */}
            <div className="absolute bottom-[50px] left-0 right-0 flex justify-around">
              <div className="flex flex-col items-center">
                <div className="w-[1px] h-[30px] bg-border"></div>
                <div className="bg-background p-3 rounded-md border border-border w-[120px]">
                  <div className="text-xs font-medium mb-1">Alerts</div>
                  <div className="text-xs text-muted-foreground">Real-time</div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-[1px] h-[30px] bg-border"></div>
                <div className="bg-background p-3 rounded-md border border-border w-[120px]">
                  <div className="text-xs font-medium mb-1">Reports</div>
                  <div className="text-xs text-muted-foreground">Compliance</div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-[1px] h-[30px] bg-border"></div>
                <div className="bg-background p-3 rounded-md border border-border w-[120px]">
                  <div className="text-xs font-medium mb-1">Dashboards</div>
                  <div className="text-xs text-muted-foreground">Analytics</div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-[1px] h-[30px] bg-border"></div>
                <div className="bg-background p-3 rounded-md border border-border w-[120px]">
                  <div className="text-xs font-medium mb-1">Integrations</div>
                  <div className="text-xs text-muted-foreground">SOAR, API</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
