
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getUserActivityLogs } from "@/lib/activity-logger";
import { useToast } from "@/hooks/use-toast";
import { User, Clock, Shield } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Profile() {
  const { user, profile, roles } = useAuth();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setFullName(profile.full_name || "");
    }
    
    // Load user activities
    if (user) {
      loadActivities();
    }
  }, [profile, user]);
  
  const loadActivities = async () => {
    if (!user) return;
    
    const logs = await getUserActivityLogs(user.id);
    setActivities(logs || []);
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          username,
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">User Profile</h1>
        <p className="text-muted-foreground">
          Manage your account and view account activity
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your account details and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url || ""} />
                <AvatarFallback className="text-lg">{getInitials(profile?.full_name || user.email || "")}</AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                value={user.email || ""} 
                disabled 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>User Roles</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <span 
                      key={role} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      {role}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm">No roles assigned</span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleUpdateProfile} 
              disabled={isLoading}
              className="ml-auto"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Account Activity</CardTitle>
            <CardDescription>Recent sign-in activity and system interactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your recent activities</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.length > 0 ? (
                  activities.slice(0, 5).map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">
                        {activity.activity_type}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatDate(activity.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                      No recent activity
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" onClick={loadActivities}>
              <Clock className="mr-2 h-4 w-4" />
              Refresh Activity
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
