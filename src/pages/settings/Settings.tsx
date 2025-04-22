
import { Layout } from "@/components/layout/Layout";
import { Settings as SettingsIcon, Save, Server, Database, Lock, Bell, Users, Network, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Settings() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure your SIEM environment and preferences
        </p>
      </div>
      
      <Tabs defaultValue="system">
        <div className="flex overflow-auto">
          <TabsList className="mb-6">
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="accounts">User Accounts</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    System Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure core SIEM system settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="system-name">System Name</Label>
                    <Input id="system-name" defaultValue="Cyber Guardian SIEM" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="retention-period">Data Retention Period (days)</Label>
                    <Input id="retention-period" type="number" defaultValue="90" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-eps">Maximum Events Per Second</Label>
                    <Input id="max-eps" type="number" defaultValue="5000" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-update">Automatic Updates</Label>
                      <Switch id="auto-update" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically update system components when new versions are available
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ai-analysis">AI-Powered Analysis</Label>
                      <Switch id="ai-analysis" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enable machine learning for anomaly detection and threat analysis
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="threat-intel">Threat Intelligence Integration</Label>
                      <Switch id="threat-intel" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Integrate with external threat intelligence feeds
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Storage Management
                  </CardTitle>
                  <CardDescription>
                    Manage SIEM data storage settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Storage Usage</span>
                      <span>45.8 GB of 100 GB (45.8%)</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "45.8%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storage-path">Storage Location</Label>
                    <Input id="storage-path" defaultValue="/var/lib/cyber-guardian" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="archiving-enabled">Archiving Enabled</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="archiving-enabled" defaultChecked />
                        <Label htmlFor="archiving-enabled">Enabled</Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="compression-level">Compression Level</Label>
                      <Input id="compression-level" defaultValue="Medium" />
                    </div>
                  </div>
                  
                  <div className="pt-2 flex justify-between">
                    <Button variant="outline">Clean Old Data</Button>
                    <Button variant="outline">Backup Configuration</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-cyber-info h-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span className="font-medium">48%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-cyber-info h-full" style={{ width: "48%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Storage Usage</span>
                      <span className="font-medium">45.8%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-cyber-info h-full" style={{ width: "45.8%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Network Usage</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-cyber-info h-full" style={{ width: "32%" }}></div>
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-2 divide-y divide-border">
                    <div className="flex justify-between py-2">
                      <span className="text-sm">Current Events/sec</span>
                      <span className="font-medium">842</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm">Uptime</span>
                      <span className="font-medium">15d 7h 32m</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm">Last Update</span>
                      <span className="font-medium">2025-04-15</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm">Version</span>
                      <span className="font-medium">1.0.0</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Detailed Status
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle>Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    <Button variant="ghost" className="justify-start w-full p-4 h-auto">
                      Restart Services
                    </Button>
                    <Button variant="ghost" className="justify-start w-full p-4 h-auto">
                      Rebuild Indexes
                    </Button>
                    <Button variant="ghost" className="justify-start w-full p-4 h-auto">
                      Clear Cache
                    </Button>
                    <Button variant="ghost" className="justify-start w-full p-4 h-auto text-destructive hover:text-destructive">
                      Reset to Factory Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="data-sources">
          <Card className="cyber-card mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Connected Data Sources</CardTitle>
                  <CardDescription>
                    Manage systems sending logs to your SIEM
                  </CardDescription>
                </div>
                <Button>Add Data Source</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Events/min</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Event</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { name: "Windows Domain Controller", type: "Windows Event Log", status: "Connected", eventsPerMin: 124, lastEvent: "2 mins ago" },
                      { name: "Linux Web Server", type: "Syslog", status: "Connected", eventsPerMin: 87, lastEvent: "1 min ago" },
                      { name: "Firewall", type: "Syslog", status: "Connected", eventsPerMin: 156, lastEvent: "30 secs ago" },
                      { name: "Database Server", type: "Database Audit", status: "Connected", eventsPerMin: 42, lastEvent: "5 mins ago" },
                      { name: "AWS CloudTrail", type: "Cloud API", status: "Connected", eventsPerMin: 36, lastEvent: "3 mins ago" },
                      { name: "Endpoint Agents", type: "Agent", status: "Partial Connection", eventsPerMin: 215, lastEvent: "1 min ago" }
                    ].map((source, i) => (
                      <tr key={i} className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 font-medium">{source.name}</td>
                        <td className="px-4 py-3">{source.type}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${
                              source.status === "Connected" ? "bg-green-500" : 
                              source.status === "Partial Connection" ? "bg-amber-500" : 
                              "bg-red-500"
                            }`}></div>
                            <span>{source.status}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">{source.eventsPerMin}</td>
                        <td className="px-4 py-3">{source.lastEvent}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Test</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Collector Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="collector-ip">Collector IP Address</Label>
                  <Input id="collector-ip" defaultValue="192.168.1.10" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="syslog-port">Syslog Port</Label>
                    <Input id="syslog-port" defaultValue="514" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agent-port">Agent Port</Label>
                    <Input id="agent-port" defaultValue="9997" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="encryption-enabled">Encryption</Label>
                    <Switch id="encryption-enabled" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enable TLS encryption for data in transit
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compression-enabled">Compression</Label>
                    <Switch id="compression-enabled" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enable data compression for log collection
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="buffer-size">Buffer Size (MB)</Label>
                  <Input id="buffer-size" defaultValue="512" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle>Agent Deployment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Download Agents</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">Windows Agent</Button>
                    <Button variant="outline" className="justify-start">Linux Agent</Button>
                    <Button variant="outline" className="justify-start">macOS Agent</Button>
                    <Button variant="outline" className="justify-start">Configuration File</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Deployment Instructions</h3>
                  <div className="cyber-terminal text-xs">
                    <div>1. Download the appropriate agent</div>
                    <div>2. Install on target system:</div>
                    <div className="mt-1">Windows: agent-installer.exe --config=config.json</div>
                    <div>Linux: ./agent-installer.sh --config=config.json</div>
                    <div>macOS: ./agent-installer.pkg --config=config.json</div>
                    <div className="mt-1">3. Verify connection in the dashboard</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Agent Status</Label>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Deployed Agents</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Connected</span>
                      <span className="font-medium">22</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Disconnected</span>
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Agents
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how and when you receive security alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Alert Channels</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <Label htmlFor="email-notifications" className="text-base">Email</Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              Send alert notifications to email addresses
                            </p>
                          </div>
                          <Switch id="email-notifications" defaultChecked />
                        </div>
                        
                        <div className="pl-6 space-y-2">
                          <Label htmlFor="email-addresses">Email Addresses</Label>
                          <Input id="email-addresses" defaultValue="admin@example.com, security@example.com" />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-start justify-between">
                        <div>
                          <Label htmlFor="webhook-notifications" className="text-base">Webhook</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Send alerts to external systems via webhook
                          </p>
                        </div>
                        <Switch id="webhook-notifications" defaultChecked />
                      </div>
                      
                      <div className="pl-6 space-y-2">
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input id="webhook-url" defaultValue="https://example.com/security-webhook" />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-start justify-between">
                        <div>
                          <Label htmlFor="sms-notifications" className="text-base">SMS</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Send critical alerts via SMS
                          </p>
                        </div>
                        <Switch id="sms-notifications" />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-start justify-between">
                        <div>
                          <Label htmlFor="slack-notifications" className="text-base">Slack</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Send alerts to Slack channels
                          </p>
                        </div>
                        <Switch id="slack-notifications" defaultChecked />
                      </div>
                      
                      <div className="pl-6 space-y-2">
                        <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                        <Input id="slack-webhook" defaultValue="https://hooks.slack.com/services/..." />
                        
                        <Label htmlFor="slack-channel" className="mt-2">Channel</Label>
                        <Input id="slack-channel" defaultValue="#security-alerts" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle>Alert Severities</CardTitle>
                  <CardDescription>
                    Configure which alert levels trigger notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-alert-critical"></div>
                      <Label htmlFor="critical-alerts">Critical</Label>
                    </div>
                    <Switch id="critical-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-alert-high"></div>
                      <Label htmlFor="high-alerts">High</Label>
                    </div>
                    <Switch id="high-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-alert-medium"></div>
                      <Label htmlFor="medium-alerts">Medium</Label>
                    </div>
                    <Switch id="medium-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-alert-low"></div>
                      <Label htmlFor="low-alerts">Low</Label>
                    </div>
                    <Switch id="low-alerts" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle>Alert Scheduling</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="daily-digest">Daily Digest</Label>
                      <Switch id="daily-digest" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Send a daily summary of all alerts
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="digest-time">Digest Time</Label>
                    <Input id="digest-time" defaultValue="08:00" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="quiet-hours">Quiet Hours</Label>
                      <Switch id="quiet-hours" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Only send critical alerts during specified hours
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quiet-from">From</Label>
                      <Input id="quiet-from" defaultValue="22:00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quiet-to">To</Label>
                      <Input id="quiet-to" defaultValue="07:00" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2">
                    <Save className="h-4 w-4" />
                    Save Schedule
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="accounts">
          <Card className="cyber-card mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>
                    Manage user accounts and access permissions
                  </CardDescription>
                </div>
                <Button>Add User</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Username</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Login</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { username: "admin", email: "admin@example.com", role: "Administrator", lastLogin: "10 mins ago", status: "Active" },
                      { username: "john.smith", email: "john.smith@example.com", role: "Security Analyst", lastLogin: "1 hour ago", status: "Active" },
                      { username: "jane.doe", email: "jane.doe@example.com", role: "Security Analyst", lastLogin: "2 days ago", status: "Active" },
                      { username: "bob.johnson", email: "bob.johnson@example.com", role: "Read Only", lastLogin: "5 days ago", status: "Inactive" }
                    ].map((user, i) => (
                      <tr key={i} className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 font-medium">{user.username}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">{user.role}</td>
                        <td className="px-4 py-3">{user.lastLogin}</td>
                        <td className="px-4 py-3">
                          <span className={user.status === "Active" ? "text-green-500" : "text-muted-foreground"}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Reset Pass</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>
                  Configure access levels for different user roles
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {[
                    { role: "Administrator", description: "Full system access and configuration" },
                    { role: "Security Analyst", description: "View all data and respond to alerts" },
                    { role: "Read Only", description: "View dashboards and reports only" }
                  ].map((role, i) => (
                    <div key={i} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{role.role}</h3>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {role.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(role.role === "Administrator" ? [
                          "View", "Edit", "Delete", "Configure", "Admin"
                        ] : role.role === "Security Analyst" ? [
                          "View", "Edit", "Respond"
                        ] : [
                          "View"
                        ]).map((perm, j) => (
                          <span key={j} className="text-xs bg-muted px-2 py-0.5 rounded">
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Add Custom Role
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Authentication Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mfa-required">Multi-Factor Authentication</Label>
                    <Switch id="mfa-required" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Require MFA for all user accounts
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input id="password-expiry" defaultValue="90" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="min-password-length">Minimum Password Length</Label>
                  <Input id="min-password-length" defaultValue="12" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-complexity">Password Complexity</Label>
                    <Switch id="password-complexity" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Require numbers, special characters, mixed case
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="account-lockout">Account Lockout</Label>
                    <Switch id="account-lockout" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Lock account after 5 failed login attempts
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" className="w-20" defaultValue="30" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Security Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure security settings for your SIEM environment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Network Security</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="tls-required">Require TLS 1.2+</Label>
                        <Switch id="tls-required" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Enforce TLS 1.2 or later for all communications
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
                      <Input id="allowed-ips" defaultValue="192.168.1.0/24, 10.0.0.0/24" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Comma-separated list of IP addresses or CIDR ranges
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Data Protection</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="encrypt-data">Data Encryption</Label>
                        <Switch id="encrypt-data" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Encrypt sensitive data at rest
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="data-masking">Data Masking</Label>
                        <Switch id="data-masking" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Mask sensitive information in logs (e.g., PII, passwords)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="backup-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Access Control</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="audit-logging">Audit Logging</Label>
                        <Switch id="audit-logging" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Log all user actions within the system
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="api-access">API Access Control</Label>
                        <Switch id="api-access" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Enforce API key authentication and rate limiting
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle>Security Audit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Last Security Audit</span>
                      <span className="text-sm font-medium">2025-04-10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Security Score</span>
                      <span className="text-sm font-medium">92/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Critical Issues</span>
                      <span className="text-sm font-medium">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Warnings</span>
                      <span className="text-sm font-medium">3</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Run Security Audit
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle>Security Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                          !
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">Enable Multi-Factor Authentication</h3>
                          <p className="text-xs text-muted-foreground">
                            MFA is currently optional. Enable required MFA for all users.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                          !
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">Reduce Session Timeout</h3>
                          <p className="text-xs text-muted-foreground">
                            Current session timeout (30 min) exceeds recommended (15 min).
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                          !
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">Update SSL Certificates</h3>
                          <p className="text-xs text-muted-foreground">
                            SSL certificate expires in 30 days.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Apply All Recommendations
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="about">
          <div className="max-w-3xl mx-auto">
            <Card className="cyber-card mb-6">
              <CardHeader className="text-center">
                <div className="h-16 w-16 rounded bg-cyber-accent flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">CG</span>
                </div>
                <CardTitle className="text-2xl">Cyber Guardian SIEM</CardTitle>
                <CardDescription>
                  Home Security Information and Event Management System
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-sm">Version 1.0.0</div>
                  <div className="text-xs text-muted-foreground">Release Date: April 22, 2025</div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-base font-medium">About This Project</h3>
                  <p className="text-sm text-muted-foreground">
                    Cyber Guardian is a comprehensive Security Information and Event Management (SIEM) system 
                    designed for home labs and small environments. It provides real-time monitoring, threat detection, 
                    attack simulation, and educational resources in a single platform.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-base font-medium">Core Features</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Real-time log collection and analysis</li>
                    <li>Advanced threat detection with machine learning</li>
                    <li>Interactive attack simulation environment</li>
                    <li>Comprehensive security dashboards</li>
                    <li>Integrated learning resources</li>
                    <li>Compliance reporting and monitoring</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-base font-medium">System Requirements</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>CPU</span>
                      <span>4+ cores recommended</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory</span>
                      <span>16+ GB RAM recommended</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage</span>
                      <span>500+ GB SSD recommended</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Network</span>
                      <span>1 Gbps Ethernet</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-center space-x-4">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Documentation
                  </Button>
                  
                  <Button variant="outline" className="gap-2">
                    <SettingsIcon className="h-4 w-4" />
                    Check for Updates
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Cyber Guardian is an open-source project. Built with ❤️ for the security community.
              </p>
              <p className="mt-1">
                © 2025 Cyber Guardian Project.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
