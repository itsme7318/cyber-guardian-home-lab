
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  Activity, 
  PlayCircle, 
  AlertTriangle, 
  StopCircle, 
  TerminalSquare, 
  Download, 
  Clock, 
  Target, 
  Shield, 
  CheckCircle, 
  XCircle,
  Zap,
  Wifi,
  File,
  Database
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell
} from "recharts";

// Extended attack scenario type with more detailed information
interface AttackScenario {
  id: string;
  name: string;
  description: string;
  duration: string;
  tags: string[];
  mitreTactics: string[];
  mitreTechniques: string[];
  complexity: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
  detectionRate?: number;
  affectedSystems: string[];
  simulationSteps: string[];
  recommendedDetection: string[];
  icon: React.ReactNode;
}

// More detailed attack scenarios
const attackScenarios: AttackScenario[] = [
  {
    id: "attack-1",
    name: "Brute Force Authentication Attack",
    description: "Simulates repeated login attempts to crack user credentials on multiple services",
    duration: "5-10 minutes",
    tags: ["authentication", "credential-access", "password-spray"],
    mitreTactics: ["Initial Access", "Credential Access"],
    mitreTechniques: ["T1110.001 - Password Guessing", "T1110.003 - Password Spraying"],
    complexity: "low",
    impact: "low",
    detectionRate: 95,
    affectedSystems: ["SSH Server", "Web Application", "Windows Domain Controller"],
    simulationSteps: [
      "Generate list of common usernames",
      "Attempt login with common passwords",
      "Switch IP addresses to avoid lockouts",
      "Target multiple services simultaneously"
    ],
    recommendedDetection: [
      "Failed login attempt thresholds",
      "Account lockout policies",
      "IP-based rate limiting"
    ],
    icon: <Target className="h-10 w-10 text-blue-500" />
  },
  {
    id: "attack-2",
    name: "Data Exfiltration Scenario",
    description: "Simulates unauthorized data transfer to external destinations through multiple channels",
    duration: "15-20 minutes",
    tags: ["data-theft", "exfiltration", "encryption"],
    mitreTactics: ["Collection", "Exfiltration", "Command and Control"],
    mitreTechniques: ["T1020 - Automated Exfiltration", "T1048 - Exfiltration Over Alternative Protocol"],
    complexity: "medium",
    impact: "high",
    detectionRate: 78,
    affectedSystems: ["File Servers", "Databases", "Workstations"],
    simulationSteps: [
      "Identify sensitive data repositories",
      "Collect and compress target files",
      "Encrypt data with custom algorithm",
      "Exfiltrate via DNS tunneling",
      "Alternative channel: Split files across HTTPS requests"
    ],
    recommendedDetection: [
      "Network traffic anomaly detection",
      "DNS query monitoring",
      "Data Loss Prevention (DLP)",
      "Encrypted traffic analysis"
    ],
    icon: <Database className="h-10 w-10 text-red-500" />
  },
  {
    id: "attack-3",
    name: "Advanced Persistent Threat (APT) Campaign",
    description: "Simulates a sophisticated multi-stage attack with persistence and lateral movement",
    duration: "25-30 minutes",
    tags: ["apt", "persistence", "lateral-movement", "evasion"],
    mitreTactics: ["Initial Access", "Execution", "Persistence", "Privilege Escalation", "Defense Evasion", "Lateral Movement"],
    mitreTechniques: ["T1566 - Phishing", "T1053 - Scheduled Task/Job", "T1021 - Remote Services"],
    complexity: "high",
    impact: "high",
    detectionRate: 65,
    affectedSystems: ["Email Gateway", "Workstations", "Active Directory", "File Servers", "Internal Web Applications"],
    simulationSteps: [
      "Initial access via spear phishing email with malicious document",
      "Establish persistence with registry run keys and scheduled tasks",
      "Perform privilege escalation via unpatched vulnerability",
      "Internal reconnaissance for lateral movement targets",
      "Credential harvesting from memory and local caches",
      "Move laterally using stolen credentials and remote services",
      "Establish encrypted command and control channel"
    ],
    recommendedDetection: [
      "Email attachment analysis",
      "Registry and scheduled task monitoring",
      "Memory forensics",
      "Network lateral movement detection",
      "Encrypted traffic analysis",
      "Behavioral analytics for unusual account usage"
    ],
    icon: <Zap className="h-10 w-10 text-purple-500" />
  },
  {
    id: "attack-4",
    name: "Privilege Escalation Campaign",
    description: "Simulates elevation of privileges from standard user to administrator through multiple techniques",
    duration: "10-15 minutes",
    tags: ["lateral-movement", "privilege-escalation", "persistence"],
    mitreTactics: ["Privilege Escalation", "Persistence", "Defense Evasion"],
    mitreTechniques: ["T1068 - Exploitation for Privilege Escalation", "T1134 - Access Token Manipulation"],
    complexity: "high",
    impact: "high",
    detectionRate: 72,
    affectedSystems: ["Windows Servers", "Linux Servers", "Containers", "Cloud Instances"],
    simulationSteps: [
      "Identify vulnerable services with SUID/GUID permissions",
      "Exploit path traversal vulnerability in system utility",
      "Use token manipulation for privilege escalation",
      "Access kernel exploit for ring0 execution",
      "Bypass User Account Control (UAC)"
    ],
    recommendedDetection: [
      "Process creation monitoring",
      "File integrity monitoring",
      "Privilege usage auditing",
      "Kernel-level monitoring"
    ],
    icon: <Shield className="h-10 w-10 text-amber-500" />
  },
  {
    id: "attack-5",
    name: "Web Application Attack Campaign",
    description: "Simulates a complete attack chain targeting web applications, including SQLi, XSS, and RCE",
    duration: "15-20 minutes",
    tags: ["web", "injection", "rce", "authentication-bypass"],
    mitreTactics: ["Initial Access", "Execution", "Credential Access", "Collection"],
    mitreTechniques: ["T1190 - Exploit Public-Facing Application", "T1133 - External Remote Services"],
    complexity: "medium",
    impact: "medium",
    detectionRate: 85,
    affectedSystems: ["Web Servers", "Application Databases", "API Endpoints", "Content Management Systems"],
    simulationSteps: [
      "Reconnaissance of web application structure",
      "SQL injection to extract database schema",
      "Stored XSS payload injection",
      "Authentication bypass via insecure direct object references",
      "File upload bypass leading to webshell deployment",
      "Command execution and internal pivot"
    ],
    recommendedDetection: [
      "Web Application Firewall rules",
      "Database query monitoring",
      "Input validation verification",
      "File upload scanning",
      "Command execution detection"
    ],
    icon: <Wifi className="h-10 w-10 text-green-500" />
  },
  {
    id: "attack-6",
    name: "Ransomware Infection Simulation",
    description: "Simulates ransomware behavior including file encryption, communications, and persistence",
    duration: "10-12 minutes",
    tags: ["ransomware", "encryption", "extortion"],
    mitreTactics: ["Execution", "Impact", "Command and Control"],
    mitreTechniques: ["T1486 - Data Encrypted for Impact", "T1490 - Inhibit System Recovery"],
    complexity: "medium",
    impact: "high",
    detectionRate: 80,
    affectedSystems: ["File Servers", "Backup Systems", "User Workstations", "Network Shares"],
    simulationSteps: [
      "Initial execution via simulated dropper",
      "Security service termination attempts",
      "Shadow copy deletion commands",
      "File enumeration across local and network paths",
      "Test encryption of non-critical files with custom extension",
      "Simulated ransom note deployment",
      "Command and control for encryption key communication"
    ],
    recommendedDetection: [
      "Process monitoring for encryption behaviors",
      "File entropy analysis",
      "Backup tampering alerts",
      "Mass file modification detection",
      "PowerShell/WMI monitoring"
    ],
    icon: <File className="h-10 w-10 text-indigo-500" />
  }
];

// Fake detection data for visualization
const detectionEffectivenessData = [
  { name: "Brute Force", detected: 95, missed: 5, fill: "#4ade80" },
  { name: "Data Exfiltration", detected: 78, missed: 22, fill: "#fb923c" },
  { name: "APT Campaign", detected: 65, missed: 35, fill: "#f87171" },
  { name: "Privilege Escalation", detected: 72, missed: 28, fill: "#60a5fa" },
  { name: "Web Attacks", detected: 85, missed: 15, fill: "#a78bfa" },
  { name: "Ransomware", detected: 80, missed: 20, fill: "#e879f9" }
];

// Past simulation results
const simulationResults = [
  {
    id: "sim-1",
    scenario: "Brute Force Authentication Attack",
    date: "2025-04-21",
    duration: "8 minutes",
    detectionRate: 95,
    detectionLevel: "High",
    detectionColor: "text-green-500"
  },
  {
    id: "sim-2",
    scenario: "Advanced Persistent Threat (APT) Campaign",
    date: "2025-04-20",
    duration: "28 minutes",
    detectionRate: 65,
    detectionLevel: "Medium",
    detectionColor: "text-amber-500"
  },
  {
    id: "sim-3",
    scenario: "Web Application Attack Campaign",
    date: "2025-04-18",
    duration: "17 minutes",
    detectionRate: 85,
    detectionLevel: "High",
    detectionColor: "text-green-500"
  },
  {
    id: "sim-4",
    scenario: "Ransomware Infection Simulation",
    date: "2025-04-16",
    duration: "11 minutes",
    detectionRate: 80,
    detectionLevel: "High",
    detectionColor: "text-green-500"
  },
  {
    id: "sim-5",
    scenario: "Data Exfiltration Scenario",
    date: "2025-04-15",
    duration: "19 minutes",
    detectionRate: 78,
    detectionLevel: "Medium",
    detectionColor: "text-amber-500"
  }
];

// Timeline data for active simulation
const simulationTimelineData = [
  { timestamp: "00:00", events: 10, alerts: 2 },
  { timestamp: "00:30", events: 25, alerts: 5 },
  { timestamp: "01:00", events: 40, alerts: 8 },
  { timestamp: "01:30", events: 65, alerts: 15 },
  { timestamp: "02:00", events: 90, alerts: 22 },
  { timestamp: "02:30", events: 75, alerts: 18 },
  { timestamp: "03:00", events: 60, alerts: 12 },
  { timestamp: "03:30", events: 45, alerts: 9 }
];

const CHART_COLORS = {
  events: "#60a5fa",
  alerts: "#f87171"
};

export default function AttackSimulation() {
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [simulationProgress, setSimulationProgress] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [tab, setTab] = useState("scenarios");

  const startSimulation = (scenarioId: string) => {
    const scenario = attackScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;
    
    setActiveSimulation(scenarioId);
    setSimulationProgress(0);
    setCurrentStep(0);
    setSimulationLogs([
      `[+] Simulation started: ${scenario.name}`,
      `[+] Targeted systems: ${scenario.affectedSystems.join(", ")}`
    ]);
    setTab("running");
    
    // Simulate progress updates
    const totalSteps = scenario.simulationSteps.length;
    const simulationInterval = setInterval(() => {
      setSimulationProgress(prev => {
        const newProgress = prev + (100 / totalSteps);
        if (newProgress >= 100) {
          clearInterval(simulationInterval);
          return 100;
        }
        return newProgress;
      });
      
      setCurrentStep(prev => {
        const newStep = prev + 1;
        if (newStep < totalSteps) {
          setSimulationLogs(logs => [
            ...logs,
            `[+] Stage ${newStep + 1}: ${scenario.simulationSteps[newStep]}`
          ]);
        } else if (newStep === totalSteps) {
          setSimulationLogs(logs => [
            ...logs,
            `[+] Simulation completed successfully`,
            `[+] ${scenario.detectionRate}% of attacks were detected by your SIEM`
          ]);
          toast({
            title: "Simulation Complete",
            description: `${scenario.name} simulation finished with ${scenario.detectionRate}% detection rate`,
          });
        }
        return newStep < totalSteps ? newStep : prev;
      });
    }, 3000); // Update every 3 seconds
    
    toast({
      title: "Simulation Started",
      description: `${scenario.name} simulation is now running`,
    });
  };

  const stopSimulation = () => {
    setActiveSimulation(null);
    setSimulationLogs(logs => [
      ...logs,
      `[!] Simulation stopped manually by user`
    ]);
    toast({
      title: "Simulation Stopped",
      description: "Attack simulation was manually terminated",
      variant: "destructive"
    });
  };

  const currentScenario = activeSimulation 
    ? attackScenarios.find(s => s.id === activeSimulation) 
    : null;

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Attack Simulation</h1>
        <p className="text-muted-foreground">
          Simulate real-world attacks in a controlled environment to test detection capabilities
        </p>
      </div>
      
      <Tabs value={tab} onValueChange={setTab}>
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
                  <div className="flex justify-between">
                    <div className="rounded-md p-2 bg-card/80">
                      {scenario.icon}
                    </div>
                    <Badge variant={scenario.complexity === "high" ? "destructive" : 
                            scenario.complexity === "medium" ? "secondary" : "outline"}>
                      {scenario.complexity}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2">{scenario.name}</CardTitle>
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
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Affected Systems</div>
                      <div className="text-sm text-muted-foreground">
                        {scenario.affectedSystems.slice(0, 3).join(", ")}
                        {scenario.affectedSystems.length > 3 && "..."}
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
                  <Button 
                    className="w-full gap-2" 
                    onClick={() => startSimulation(scenario.id)}
                  >
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
          {activeSimulation ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="cyber-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary animate-pulse" />
                        Active Simulation
                      </CardTitle>
                      <Button variant="destructive" size="sm" className="gap-2" onClick={stopSimulation}>
                        <StopCircle className="h-4 w-4" />
                        Stop Simulation
                      </Button>
                    </div>
                    <CardDescription>
                      {currentScenario?.name} - Started {Math.floor(currentStep * 3 / 60)} minutes and {(currentStep * 3) % 60} seconds ago
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <h3 className="text-sm font-medium">Simulation Progress</h3>
                          <div className="text-sm text-muted-foreground">
                            {Math.floor(simulationProgress)}%
                          </div>
                        </div>
                        <Progress value={simulationProgress} className="h-2" />
                      </div>
                      
                      <div className="h-48 bg-muted/30 rounded-md overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={simulationTimelineData}
                            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="timestamp" />
                            <YAxis />
                            <Tooltip content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-background border border-border rounded-md p-2 shadow-md">
                                    <div className="text-sm">{payload[0].payload.timestamp}</div>
                                    <div className="text-xs text-blue-400">Events: {payload[0].value}</div>
                                    <div className="text-xs text-red-400">Alerts: {payload[1].value}</div>
                                  </div>
                                );
                              }
                              return null;
                            }} />
                            <Line type="monotone" dataKey="events" stroke={CHART_COLORS.events} name="Events" />
                            <Line type="monotone" dataKey="alerts" stroke={CHART_COLORS.alerts} name="Alerts" />
                            <Legend />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Simulation Progress</h3>
                        <div className="space-y-3">
                          {currentScenario?.simulationSteps.map((step, index) => (
                            <div key={index} className="flex justify-between">
                              <div className="flex items-center gap-2">
                                {index < currentStep ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : index === currentStep ? (
                                  <span className="h-4 w-4 rounded-full bg-blue-500 animate-pulse"></span>
                                ) : (
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className="text-sm">{step}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {index < currentStep ? "Completed" : index === currentStep ? "In progress" : "Pending"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="cyber-card">
                  <CardHeader>
                    <CardTitle className="text-base">Simulation Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Target Systems</div>
                      <div className="space-y-1">
                        {currentScenario?.affectedSystems.map((system, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                            {system}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">MITRE Techniques</div>
                      <div className="space-y-1">
                        {currentScenario?.mitreTechniques.map((technique, index) => (
                          <div key={index} className="text-sm">
                            {technique}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="cyber-terminal">
                      <div className="text-xs mb-1 text-muted-foreground">Simulation Log</div>
                      <div className="space-y-1 text-xs max-h-60 overflow-y-auto">
                        {simulationLogs.map((log, index) => (
                          <div key={index} className={index === simulationLogs.length - 1 ? "terminal-cursor" : ""}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg space-y-4">
              <AlertTriangle className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-medium">No Active Simulations</h3>
              <p className="text-center text-muted-foreground max-w-md">
                There are no attack simulations currently running. Go to the Attack Scenarios tab
                to start a new simulation.
              </p>
              <Button variant="default" onClick={() => setTab("scenarios")}>
                View Attack Scenarios
              </Button>
            </div>
          )}
          
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
                      {simulationResults.map((result) => (
                        <tr key={result.id} className="hover:bg-muted/50 transition-colors">
                          <td className="px-4 py-3">{result.scenario}</td>
                          <td className="px-4 py-3 text-sm">{result.date}</td>
                          <td className="px-4 py-3 text-sm">{result.duration}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{result.detectionRate}%</span>
                              <span className={`text-xs ${result.detectionColor}`}>
                                {result.detectionLevel}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Button variant="outline" size="sm">View Report</Button>
                          </td>
                        </tr>
                      ))}
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
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={detectionEffectivenessData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border border-border rounded-md p-2 shadow-md">
                              <div className="text-sm font-medium">{payload[0].payload.name}</div>
                              <div className="text-xs text-green-400">Detected: {payload[0].value}%</div>
                              <div className="text-xs text-red-400">Missed: {payload[0].payload.missed}%</div>
                            </div>
                          );
                        }
                        return null;
                      }} />
                      <Legend />
                      <Bar dataKey="detected" fill="#4ade80" name="Detection Rate">
                        {detectionEffectivenessData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
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
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" /> 
                      Improve APT Campaign Detection
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced Persistent Threat detection shows the lowest coverage (65%). Enhance endpoint 
                      monitoring and implement UEBA to detect suspicious lateral movement patterns.
                    </p>
                    <Separator />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-amber-500" />
                      Enhance Data Exfiltration Detection
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Current detection rate (78%) needs improvement. Enable DLP controls and enhance network 
                      monitoring to better detect unusual data transfers and DNS tunneling attempts.
                    </p>
                    <Separator />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Brute Force Detection Working Well
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Current detection rate is high (95%). Continue monitoring authentication sources 
                      and consider implementing multi-factor authentication for critical systems.
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
