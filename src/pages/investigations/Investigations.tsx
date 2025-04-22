
import { Layout } from "@/components/layout/Layout";
import { Search, Filter, Clock, AlertTriangle, Activity, Server } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Investigations() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Investigations</h1>
        <p className="text-muted-foreground">
          Investigate security events and perform detailed analysis
        </p>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search logs and events..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Clock className="h-4 w-4" />
            Time Range
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="event-search">
        <TabsList className="mb-6">
          <TabsTrigger value="event-search">Event Search</TabsTrigger>
          <TabsTrigger value="cases">Investigation Cases</TabsTrigger>
          <TabsTrigger value="hunting">Threat Hunting</TabsTrigger>
        </TabsList>
        
        <TabsContent value="event-search">
          <div className="mb-6">
            <div className="cyber-terminal mb-4">
              <div className="flex items-center text-xs text-muted-foreground mb-2">
                <span className="flex-1">Query Editor</span>
                <Button variant="ghost" size="sm" className="h-5 py-0 px-2 text-xs">
                  Save Query
                </Button>
              </div>
              <div className="font-mono text-sm p-2 bg-cyber-terminal rounded border border-border">
                <div className="terminal-cursor">
                  source="authentication-service" AND action="login" AND status="failure" | sort by timestamp desc | limit 100
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mb-4">
              <Button variant="outline" size="sm">
                Clear
              </Button>
              <Button size="sm">
                Search
              </Button>
            </div>
            
            <Card className="cyber-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Search Results</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Timestamp</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Source</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Event</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <tr key={i} className="hover:bg-muted/50 transition-colors">
                          <td className="px-4 py-2 text-xs whitespace-nowrap">
                            2025-04-22 {10-Math.floor(i/2)}:
                            {(i % 2 === 0 ? 13 : 42)}:
                            {10 + i * 3}
                          </td>
                          <td className="px-4 py-2 text-xs">
                            authentication-service
                          </td>
                          <td className="px-4 py-2 text-xs font-medium">
                            Login failure
                          </td>
                          <td className="px-4 py-2 text-xs">
                            User: admin, IP: 192.168.1.{100 + i}, Reason: Invalid password
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="py-2 justify-between">
                <div className="text-xs text-muted-foreground">
                  Showing 10 of 156 events
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="cyber-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Event Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-60 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    Event timeline visualization would appear here
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="cyber-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Related System Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-3 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">System Logins</span>
                      <span className="text-xs text-muted-foreground">Last 24 hours</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold">152</div>
                        <div className="text-xs text-muted-foreground">Successful</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-cyber-danger">24</div>
                        <div className="text-xs text-muted-foreground">Failed</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">IP Origins</span>
                      <span className="text-xs text-muted-foreground">Top 3</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>192.168.1.105</span>
                        <span className="font-medium">15 attempts</span>
                      </div>
                      <div className="flex justify-between">
                        <span>192.168.1.110</span>
                        <span className="font-medium">5 attempts</span>
                      </div>
                      <div className="flex justify-between">
                        <span>192.168.1.115</span>
                        <span className="font-medium">4 attempts</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-cyber-warning/10 p-3 rounded-md">
                    <div className="flex items-center gap-2 text-cyber-warning mb-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm font-medium">Related Alert</span>
                    </div>
                    <p className="text-sm">
                      Multiple failed login attempts detected for user 'admin'
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="cases">
          <div className="space-y-4">
            <Card className="cyber-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>Active Investigations</CardTitle>
                  <Button>New Case</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Case ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Title</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Severity</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Created</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 text-sm">CASE-001</td>
                        <td className="px-4 py-3 text-sm font-medium">Suspicious Login Activity</td>
                        <td className="px-4 py-3">
                          <span className="alert-badge-high">high</span>
                        </td>
                        <td className="px-4 py-3 text-sm">Open</td>
                        <td className="px-4 py-3 text-sm">2025-04-22</td>
                        <td className="px-4 py-3">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 text-sm">CASE-002</td>
                        <td className="px-4 py-3 text-sm font-medium">Unusual Network Traffic</td>
                        <td className="px-4 py-3">
                          <span className="alert-badge-medium">medium</span>
                        </td>
                        <td className="px-4 py-3 text-sm">In Progress</td>
                        <td className="px-4 py-3 text-sm">2025-04-21</td>
                        <td className="px-4 py-3">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 text-sm">CASE-003</td>
                        <td className="px-4 py-3 text-sm font-medium">Malware Detection</td>
                        <td className="px-4 py-3">
                          <span className="alert-badge-critical">critical</span>
                        </td>
                        <td className="px-4 py-3 text-sm">Pending Review</td>
                        <td className="px-4 py-3 text-sm">2025-04-20</td>
                        <td className="px-4 py-3">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="cyber-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Case Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted p-3 rounded-md text-center">
                        <div className="text-3xl font-bold">3</div>
                        <div className="text-xs text-muted-foreground">Open Cases</div>
                      </div>
                      <div className="bg-muted p-3 rounded-md text-center">
                        <div className="text-3xl font-bold">5</div>
                        <div className="text-xs text-muted-foreground">Resolved</div>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <div className="text-sm font-medium mb-2">Average Resolution Time</div>
                      <div className="text-2xl font-bold">4.5 hours</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="cyber-card col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {[
                      { action: "Case updated", case: "CASE-001", user: "admin", time: "10 mins ago" },
                      { action: "Evidence added", case: "CASE-002", user: "analyst", time: "45 mins ago" },
                      { action: "Case opened", case: "CASE-003", user: "system", time: "2 hours ago" },
                      { action: "Case resolved", case: "CASE-004", user: "admin", time: "1 day ago" },
                    ].map((activity, i) => (
                      <div key={i} className="p-3 hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm font-medium">{activity.action}</div>
                            <div className="text-xs text-muted-foreground">
                              {activity.case} by {activity.user}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="hunting">
          <div className="space-y-6">
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle>Threat Hunting Queries</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {[
                    {
                      name: "PowerShell Command Execution",
                      description: "Detects suspicious PowerShell commands that may indicate malicious activity",
                      query: "source=\"windows-powershell\" AND command_line CONTAINS \"encode\" OR command_line CONTAINS \"bypass\" | sort by timestamp desc",
                      tags: ["Windows", "PowerShell", "Execution"]
                    },
                    {
                      name: "Unusual Network Connections",
                      description: "Identifies outbound connections to uncommon ports or suspicious IPs",
                      query: "source=\"network-monitor\" AND destination_port NOT IN (80, 443, 22, 53) | stats count by destination_ip, destination_port | sort by count desc",
                      tags: ["Network", "Exfiltration", "C2"]
                    },
                    {
                      name: "Privileged Account Usage",
                      description: "Monitors usage of privileged accounts outside of normal patterns",
                      query: "source=\"authentication\" AND user_type=\"admin\" | stats count by source_ip, hour_of_day | where count > historical_avg * 2",
                      tags: ["Authentication", "Privilege", "Lateral Movement"]
                    }
                  ].map((query, i) => (
                    <div key={i} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{query.name}</h3>
                        <div className="flex gap-1">
                          {query.tags.map((tag, j) => (
                            <span key={j} className="text-xs bg-muted px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {query.description}
                      </p>
                      <div className="bg-cyber-terminal p-2 rounded text-xs font-mono">
                        {query.query}
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">
                          Run Query
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create New Hunting Query</Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="cyber-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">MITRE ATT&CK Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-60 bg-muted rounded-md flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">
                      MITRE ATT&CK coverage heatmap would appear here
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="cyber-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Hunting Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-muted p-3 rounded-md">
                      <div className="text-sm font-medium mb-1">Top Hunting Findings</div>
                      <div className="space-y-2 text-sm">
                        {[
                          { name: "Unusual Admin Actions", count: 12, severity: "high" },
                          { name: "PowerShell Obfuscation", count: 8, severity: "medium" },
                          { name: "Suspicious Outbound Traffic", count: 5, severity: "medium" }
                        ].map((finding, i) => (
                          <div key={i} className="flex justify-between">
                            <span>{finding.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{finding.count}</span>
                              <span className={`w-2 h-2 rounded-full ${
                                finding.severity === "high" ? "bg-alert-high" : 
                                finding.severity === "medium" ? "bg-alert-medium" : 
                                "bg-alert-low"
                              }`}></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <div className="text-sm font-medium mb-1">Recently Executed Queries</div>
                      <div className="space-y-2 text-sm">
                        {[
                          { name: "PowerShell Command Execution", time: "35 mins ago", results: 24 },
                          { name: "Unusual Network Connections", time: "2 hours ago", results: 7 },
                          { name: "File Integrity Monitoring", time: "1 day ago", results: 15 }
                        ].map((query, i) => (
                          <div key={i} className="flex justify-between">
                            <span>{query.name}</span>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{query.results} results</span>
                              <span>•</span>
                              <span>{query.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
