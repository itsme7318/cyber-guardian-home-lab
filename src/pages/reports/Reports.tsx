
import { Layout } from "@/components/layout/Layout";
import { FileText, Download, BarChart, PieChart, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Reports() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Reports</h1>
        <p className="text-muted-foreground">
          Generate and view security reports and compliance documentation
        </p>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <Select defaultValue="last7days">
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <SelectValue placeholder="Select time range" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
        <Button className="gap-2">
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </div>
      
      <Tabs defaultValue="security">
        <TabsList className="mb-6">
          <TabsTrigger value="security">Security Metrics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { title: "Total Alerts", value: "243", change: "+12%", period: "vs. previous period" },
              { title: "Avg. Response Time", value: "18 mins", change: "-5%", period: "vs. previous period" },
              { title: "Security Score", value: "92/100", change: "+4", period: "vs. previous period" }
            ].map((metric, i) => (
              <Card key={i} className="cyber-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{metric.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">
                    <span className={metric.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                      {metric.change}
                    </span>
                    {" "}
                    {metric.period}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="cyber-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Alert Trends
                  </CardTitle>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3.5 w-3.5" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full h-60 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    Alert trend chart would appear here
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="cyber-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Alert Categories
                  </CardTitle>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3.5 w-3.5" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full h-60 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    Alert categories chart would appear here
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle>Top Alert Sources</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Source</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Total Alerts</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">High Severity</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Medium Severity</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Low Severity</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { source: "Authentication Service", total: 78, high: 12, medium: 35, low: 31, trend: "up" },
                      { source: "Network Monitor", total: 64, high: 8, medium: 42, low: 14, trend: "down" },
                      { source: "Endpoint Agent", total: 52, high: 5, medium: 18, low: 29, trend: "up" },
                      { source: "Web Application", total: 29, high: 11, medium: 10, low: 8, trend: "up" },
                      { source: "Database Monitor", total: 20, high: 2, medium: 9, low: 9, trend: "flat" }
                    ].map((source, i) => (
                      <tr key={i} className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 font-medium">{source.source}</td>
                        <td className="px-4 py-3">{source.total}</td>
                        <td className="px-4 py-3">
                          <span className="text-alert-high">{source.high}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-alert-medium">{source.medium}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-alert-low">{source.low}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={
                            source.trend === "up" ? "text-green-500" : 
                            source.trend === "down" ? "text-red-500" : 
                            "text-muted-foreground"
                          }>
                            {source.trend === "up" ? "↑" : source.trend === "down" ? "↓" : "→"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="pt-2 justify-end">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-3.5 w-3.5" />
                Export Full Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { standard: "PCI DSS", compliance: 94, status: "Compliant" },
              { standard: "NIST SP 800-53", compliance: 87, status: "Action Needed" },
              { standard: "ISO 27001", compliance: 91, status: "Compliant" },
              { standard: "GDPR", compliance: 96, status: "Compliant" }
            ].map((framework, i) => (
              <Card key={i} className="cyber-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{framework.standard}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{framework.compliance}%</div>
                  <div className="text-sm">
                    <span className={framework.status === "Compliant" ? "text-green-500" : "text-amber-500"}>
                      {framework.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="space-y-6">
            <Card className="cyber-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>PCI DSS Compliance Details</CardTitle>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3.5 w-3.5" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Requirement</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Description</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Verified</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { req: "1.1", desc: "Install and maintain a firewall configuration", status: "Compliant", date: "2025-04-15" },
                        { req: "2.1", desc: "Change vendor defaults for system passwords", status: "Compliant", date: "2025-04-10" },
                        { req: "3.1", desc: "Protect stored cardholder data", status: "Compliant", date: "2025-04-18" },
                        { req: "4.1", desc: "Encrypt transmission of cardholder data", status: "Compliant", date: "2025-04-12" },
                        { req: "5.1", desc: "Use and regularly update anti-virus", status: "Action Required", date: "2025-04-05" }
                      ].map((req, i) => (
                        <tr key={i} className="hover:bg-muted/50 transition-colors">
                          <td className="px-4 py-3 font-medium">{req.req}</td>
                          <td className="px-4 py-3">{req.desc}</td>
                          <td className="px-4 py-3">
                            <span className={
                              req.status === "Compliant" ? "text-green-500" : "text-amber-500"
                            }>
                              {req.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">{req.date}</td>
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
                  <CardTitle>Compliance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-60 bg-muted rounded-md flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">
                      Compliance trend chart would appear here
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle>Compliance Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {[
                      "Update antivirus definitions on all endpoints",
                      "Review and update firewall rules",
                      "Complete quarterly user access review",
                      "Update data retention policy documentation",
                      "Perform vulnerability scan on database servers"
                    ].map((item, i) => (
                      <div key={i} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                            {i + 1}
                          </div>
                          <div className="text-sm">{item}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          <Card className="cyber-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Saved Reports</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="audit">Audit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[
                  { name: "Monthly Security Summary", type: "Security", date: "2025-04-01", size: "1.2 MB" },
                  { name: "PCI DSS Compliance Report", type: "Compliance", date: "2025-04-01", size: "3.5 MB" },
                  { name: "User Access Audit", type: "Audit", date: "2025-03-15", size: "0.8 MB" },
                  { name: "Network Security Assessment", type: "Security", date: "2025-03-01", size: "2.1 MB" },
                  { name: "NIST Compliance Check", type: "Compliance", date: "2025-02-15", size: "2.8 MB" },
                  { name: "Security Incident Investigation", type: "Security", date: "2025-02-10", size: "1.5 MB" }
                ].map((report, i) => (
                  <div key={i} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {report.type} • Generated {report.date} • {report.size}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2 justify-between">
              <div className="text-sm text-muted-foreground">
                Showing 6 of 24 reports
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
