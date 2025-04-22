
import { Layout } from "@/components/layout/Layout";
import { Activity, PlayCircle, AlertTriangle, StopCircle, TerminalSquare, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AttackScenario {
  id: string;
  name: string;
  description: string;
  duration: string;
  tags: string[];
  mitreTactics: string[];
  complexity: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
}

const attackScenarios: AttackScenario[] = [
  {
    id: "attack-1",
    name: "Brute Force Authentication Attack",
    description: "Simulates repeated login attempts to crack user credentials",
    duration: "5-10 minutes",
    tags: ["authentication", "credential-access"],
    mitreTactics: ["Initial Access", "Credential Access"],
    complexity: "low",
    impact: "low"
  },
  {
    id: "attack-2",
    name: "Data Exfiltration Scenario",
    description: "Simulates unauthorized data transfer to external destinations",
    duration: "15-20 minutes",
    tags: ["data-theft", "exfiltration"],
    mitreTactics: ["Collection", "Exfiltration"],
    complexity: "medium",
    impact: "high"
  },
  {
    id: "attack-3",
    name: "Malware Infection Chain",
    description: "Simulates common malware infection and execution patterns",
    duration: "10-15 minutes",
    tags: ["malware", "execution"],
    mitreTactics: ["Execution", "Defense Evasion", "Discovery"],
    complexity: "medium",
    impact: "medium"
  },
  {
    id: "attack-4",
    name: "Privilege Escalation",
    description: "Simulates elevation of privileges from standard user to administrator",
    duration: "10-15 minutes",
    tags: ["lateral-movement", "privilege-escalation"],
    mitreTactics: ["Privilege Escalation", "Persistence"],
    complexity: "high",
    impact: "high"
  },
  {
    id: "attack-5",
    name: "Web Application Attack",
    description: "Simulates SQL injection and XSS attacks against a web server",
    duration: "5-10 minutes",
    tags: ["web", "injection"],
    mitreTactics: ["Initial Access", "Execution"],
    complexity: "medium",
    impact: "medium"
  }
];

export default function AttackSimulation() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Attack Simulation</h1>
        <p className="text-muted-foreground">
          Simulate real-world attacks in a controlled environment to test detection capabilities
        </p>
      </div>
      
      <Tabs defaultValue="scenarios">
        <TabsList className="mb-6">
          <TabsTrigger value="scenarios">Attack Scenarios</TabsTrigger>
          <TabsTrigger value="running">Running Simulations</TabsTrigger>
          <TabsTrigger value="results">Previous Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scenarios">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attackScenarios.map((scenario) => (
              <Card key={scenario.id} className="cyber-card">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{scenario.name}</span>
                    <Badge variant={scenario.complexity === "high" ? "destructive" : 
                            scenario.complexity === "medium" ? "secondary" : "outline"}>
                      {scenario.complexity}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-1">MITRE ATT&CK™ Tactics</div>
                      <div className="flex flex-wrap gap-2">
                        {scenario.mitreTactics.map((tactic, i) => (
                          <Badge key={i} variant="outline">{tactic}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">Duration:</span> {scenario.duration}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Impact:</span> {scenario.impact}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2">
                    <PlayCircle className="h-4 w-4" />
                    Run Simulation
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="cyber-card border-dashed">
              <CardHeader>
                <CardTitle>Create Custom Scenario</CardTitle>
                <CardDescription>Build your own custom attack simulation</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <TerminalSquare className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Configure custom attack parameters, targets, and techniques
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Create New Scenario</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="running">
          <Card className="cyber-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Active Simulation</CardTitle>
                <Button variant="destructive" size="sm" className="gap-2">
                  <StopCircle className="h-4 w-4" />
                  Stop Simulation
                </Button>
              </div>
              <CardDescription>
                Data Exfiltration Scenario - Started 2 minutes ago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="w-full h-24 bg-muted rounded-md flex items-center justify-center">
                  <Activity className="h-8 w-8 text-primary animate-pulse" />
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Simulation Progress</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="text-sm">Initial Access</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Completed</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="text-sm">Discovery</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Completed</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-sm">Collection</span>
                      </div>
                      <span className="text-xs text-muted-foreground">In progress</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
                        <span className="text-sm">Exfiltration</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Pending</span>
                    </div>
                  </div>
                </div>
                
                <div className="cyber-terminal">
                  <div className="text-xs mb-1 text-muted-foreground">Simulation Log</div>
                  <div className="space-y-1 text-xs">
                    <div>
                      [+] Simulation started: Data Exfiltration Scenario
                    </div>
                    <div>
                      [+] Stage 1: Initial access via compromised credentials
                    </div>
                    <div>
                      [+] Stage 2: Discovery of sensitive data locations
                    </div>
                    <div className="terminal-cursor">
                      [+] Stage 3: Collection of target files in progress...
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 p-8 border border-dashed rounded-lg flex flex-col items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">Simulation Warning</h3>
            <p className="text-center text-sm text-muted-foreground max-w-md">
              Attack simulations generate real security events and may trigger alerts in your environment.
              These are controlled tests but should be used with caution.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="results">
          <Card className="cyber-card mb-6">
            <CardHeader>
              <CardTitle>Past Simulation Results</CardTitle>
              <CardDescription>Review detection effectiveness from previous simulations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Scenario</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Duration</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Detection Rate</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3">Brute Force Authentication Attack</td>
                        <td className="px-4 py-3 text-sm">2025-04-21</td>
                        <td className="px-4 py-3 text-sm">8 minutes</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">95%</span>
                            <span className="text-xs text-green-500">High</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="outline" size="sm">View Report</Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3">Malware Infection Chain</td>
                        <td className="px-4 py-3 text-sm">2025-04-20</td>
                        <td className="px-4 py-3 text-sm">11 minutes</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">78%</span>
                            <span className="text-xs text-amber-500">Medium</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="outline" size="sm">View Report</Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3">Web Application Attack</td>
                        <td className="px-4 py-3 text-sm">2025-04-18</td>
                        <td className="px-4 py-3 text-sm">7 minutes</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">85%</span>
                            <span className="text-xs text-green-500">High</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="outline" size="sm">View Report</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle>Detection Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    Detection effectiveness chart would appear here
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Filter Data
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Improve Data Exfiltration Detection</h3>
                    <p className="text-sm text-muted-foreground">
                      Enable DLP controls and enhance network monitoring to better detect unusual
                      data transfers.
                    </p>
                    <Separator />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Enhance Authentication Monitoring</h3>
                    <p className="text-sm text-muted-foreground">
                      Implement additional alerts for failed login attempts and unusual login
                      patterns.
                    </p>
                    <Separator />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Update Web Application Firewall Rules</h3>
                    <p className="text-sm text-muted-foreground">
                      Add rules to detect and block common SQL injection and XSS attack patterns.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Apply Recommendations</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
