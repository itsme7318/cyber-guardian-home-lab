
import { useState, useEffect, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { Zap, Plus, Play, Pause, Settings, Trash, Clock, AlertTriangle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import { useToast } from "@/hooks/use-toast";

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger_type: string;
  trigger_condition: string | null;
  action_type: string;
  action_target: string | null;
  enabled: boolean;
  created_at: string;
  last_run: string | null;
  run_count: number;
}

export default function Automation() {
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("all");
  const [showNewRuleForm, setShowNewRuleForm] = useState(false);
  const [newRule, setNewRule] = useState<Partial<AutomationRule>>({
    name: "",
    description: "",
    trigger_type: "alert",
    trigger_condition: "",
    action_type: "notify",
    action_target: "",
    enabled: true
  });
  const { toast } = useToast();

  // Fetch automation rules from Supabase
  useEffect(() => {
    async function fetchAutomationRules() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('automation_rules')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        setAutomationRules(data || []);
      } catch (error) {
        console.error('Error fetching automation rules:', error);
        toast({
          title: "Error Loading Rules",
          description: "Failed to load automation rules",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchAutomationRules();
  }, [toast]);

  // Handle real-time updates from Supabase
  const handleRealtimeUpdate = useCallback(({ eventType, new: newRule, old: oldRule }: any) => {
    setAutomationRules(prev => {
      if (eventType === "INSERT" && newRule) {
        toast({
          title: "New Automation Rule Created",
          description: newRule.name,
        });
        return [newRule as AutomationRule, ...prev];
      }
      if (eventType === "UPDATE" && newRule) {
        toast({
          title: "Automation Rule Updated",
          description: newRule.name,
        });
        return prev.map(rule => rule.id === newRule.id ? newRule as AutomationRule : rule);
      }
      if (eventType === "DELETE" && oldRule) {
        toast({
          title: "Automation Rule Deleted",
          description: oldRule.name,
        });
        return prev.filter(rule => rule.id !== oldRule.id);
      }
      return prev;
    });
  }, [toast]);

  // Subscribe to real-time updates
  useSupabaseRealtime<AutomationRule>("automation_rules", handleRealtimeUpdate);

  const handleToggleRule = async (id: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('automation_rules')
        .update({ enabled: !currentState })
        .eq('id', id);
        
      if (error) throw error;
      
      // We don't need to manually update the state as the real-time subscription will handle it
      
      // Show toast notification
      const rule = automationRules.find(r => r.id === id);
      if (rule) {
        toast({
          title: `Automation Rule ${currentState ? 'Disabled' : 'Enabled'}`,
          description: rule.name,
        });
      }
    } catch (error) {
      console.error('Error toggling rule:', error);
      toast({
        title: "Error",
        description: "Failed to update rule status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRule = async (id: string) => {
    try {
      const rule = automationRules.find(r => r.id === id);
      
      const { error } = await supabase
        .from('automation_rules')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // We don't need to manually update the state as the real-time subscription will handle it
      
      if (rule) {
        toast({
          title: "Automation Rule Deleted",
          description: rule.name,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting rule:', error);
      toast({
        title: "Error",
        description: "Failed to delete rule",
        variant: "destructive",
      });
    }
  };

  const handleRunRule = async (id: string) => {
    try {
      const rule = automationRules.find(r => r.id === id);
      if (!rule) return;
      
      const now = new Date().toISOString();
      const { error } = await supabase
        .from('automation_rules')
        .update({
          last_run: now,
          run_count: rule.run_count + 1
        })
        .eq('id', id);
        
      if (error) throw error;
      
      // We don't need to manually update the state as the real-time subscription will handle it
      
      toast({
        title: "Automation Rule Executed",
        description: `${rule.name} executed successfully`,
      });
    } catch (error) {
      console.error('Error running rule:', error);
      toast({
        title: "Error",
        description: "Failed to run automation rule",
        variant: "destructive",
      });
    }
  };

  const handleCreateRule = async () => {
    if (!newRule.name || !newRule.description) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('automation_rules')
        .insert([{
          name: newRule.name,
          description: newRule.description,
          trigger_type: newRule.trigger_type || "alert",
          trigger_condition: newRule.trigger_condition || null,
          action_type: newRule.action_type || "notify",
          action_target: newRule.action_target || null,
          enabled: newRule.enabled !== undefined ? newRule.enabled : true
        }]);
        
      if (error) throw error;
      
      // We don't need to manually update the state as the real-time subscription will handle it
      
      setShowNewRuleForm(false);
      setNewRule({
        name: "",
        description: "",
        trigger_type: "alert",
        trigger_condition: "",
        action_type: "notify",
        action_target: "",
        enabled: true
      });

      toast({
        title: "Automation Rule Created",
        description: newRule.name,
      });
    } catch (error) {
      console.error('Error creating rule:', error);
      toast({
        title: "Error",
        description: "Failed to create automation rule",
        variant: "destructive",
      });
    }
  };

  const filteredRules = automationRules.filter(rule => {
    if (selectedTab === "active") return rule.enabled;
    if (selectedTab === "inactive") return !rule.enabled;
    return true;
  });

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Automation</h1>
        <p className="text-muted-foreground">
          Create and manage automated security workflows
        </p>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Rules</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button 
          onClick={() => setShowNewRuleForm(true)} 
          className="w-full sm:w-auto gap-2"
          disabled={showNewRuleForm}
        >
          <Plus className="h-4 w-4" />
          Create Automation Rule
        </Button>
      </div>
      
      {showNewRuleForm && (
        <Card className="mb-6 border-dashed border-2">
          <CardHeader>
            <CardTitle>Create New Automation Rule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Rule Name*</label>
                <Input 
                  placeholder="Rule name" 
                  value={newRule.name} 
                  onChange={e => setNewRule({...newRule, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={newRule.enabled} 
                    onCheckedChange={checked => setNewRule({...newRule, enabled: checked})}
                  />
                  <span>{newRule.enabled ? "Enabled" : "Disabled"}</span>
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description*</label>
                <Input 
                  placeholder="Describe what this automation rule does" 
                  value={newRule.description} 
                  onChange={e => setNewRule({...newRule, description: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Trigger Type</label>
                <Select 
                  value={newRule.trigger_type} 
                  onValueChange={value => setNewRule({...newRule, trigger_type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alert">Alert</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                    <SelectItem value="login">Login Activity</SelectItem>
                    <SelectItem value="threshold">Threshold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Trigger Condition</label>
                <Input 
                  placeholder="e.g., severity = 'critical'" 
                  value={newRule.trigger_condition} 
                  onChange={e => setNewRule({...newRule, trigger_condition: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Action Type</label>
                <Select 
                  value={newRule.action_type} 
                  onValueChange={value => setNewRule({...newRule, action_type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select action type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notify">Send Notification</SelectItem>
                    <SelectItem value="isolate">Isolate System</SelectItem>
                    <SelectItem value="block">Block IP</SelectItem>
                    <SelectItem value="scan">Run Scan</SelectItem>
                    <SelectItem value="custom">Custom Action</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Action Target</label>
                <Input 
                  placeholder="e.g., security_team, affected_system" 
                  value={newRule.action_target} 
                  onChange={e => setNewRule({...newRule, action_target: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowNewRuleForm(false)}>Cancel</Button>
            <Button onClick={handleCreateRule}>Create Rule</Button>
          </CardFooter>
        </Card>
      )}
      
      {loading ? (
        <div className="flex justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredRules.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredRules.map((rule) => (
            <Card key={rule.id} className={`border-l-4 ${rule.enabled ? "border-l-green-500" : "border-l-slate-300"}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{rule.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                  </div>
                  <Switch 
                    checked={rule.enabled} 
                    onCheckedChange={() => handleToggleRule(rule.id, rule.enabled)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Trigger</p>
                    <div className="flex flex-col gap-1">
                      <Badge variant="outline" className="w-fit">
                        {rule.trigger_type}
                      </Badge>
                      <span>{rule.trigger_condition}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground mb-1">Action</p>
                    <div className="flex flex-col gap-1">
                      <Badge variant="outline" className="w-fit">
                        {rule.action_type}
                      </Badge>
                      <span>{rule.action_target}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground mb-1">Last Run</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {rule.last_run ? new Date(rule.last_run).toLocaleString() : "Never"}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground mb-1">Run Count</p>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      {rule.run_count} {rule.run_count === 1 ? "time" : "times"}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => handleRunRule(rule.id)}
                  disabled={!rule.enabled}
                >
                  <Play className="h-3.5 w-3.5" />
                  Run Now
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                >
                  <Settings className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => handleDeleteRule(rule.id)}
                >
                  <Trash className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh] rounded-lg border p-8 text-center">
          <Zap className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No {selectedTab} automation rules</h2>
          <p className="text-muted-foreground max-w-md mb-6">
            {selectedTab === "active" 
              ? "Enable existing rules or create new ones to automate your security tasks."
              : selectedTab === "inactive"
              ? "You don't have any disabled automation rules."
              : "Create automation rules to respond to incidents and enhance your security posture."}
          </p>
          <Button 
            onClick={() => setShowNewRuleForm(true)} 
            className="gap-2"
            disabled={showNewRuleForm}
          >
            <Plus className="h-4 w-4" />
            Create New Rule
          </Button>
        </div>
      )}
    </Layout>
  );
}
