import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { User, UserPlus, Shield, UserCheck, UserX, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Users() {
  const { user: currentUser, userHasRole } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_all_users_with_roles');

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Error loading users",
        description: "There was a problem loading the user data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddRole = async () => {
    if (!selectedUser || !selectedRole || !currentUser) return;
    
    try {
      const { error } = await supabase.rpc('add_user_role', {
        p_user_id: selectedUser.id,
        p_role: selectedRole,
        p_created_by: currentUser.id
      });
        
      if (error) throw error;
      
      toast({
        title: "Role added",
        description: `${selectedRole} role has been added to user.`,
      });
      
      fetchUsers();
      setDialogOpen(false);
    } catch (error: any) {
      console.error('Error adding role:', error);
      toast({
        title: "Error adding role",
        description: error.message || "There was a problem adding the role to this user.",
        variant: "destructive"
      });
    }
  };

  const removeRole = async (userId: string, role: string) => {
    try {
      const { error } = await supabase.rpc('remove_user_role', {
        p_user_id: userId,
        p_role: role
      });
        
      if (error) throw error;
      
      toast({
        title: "Role removed",
        description: `${role} role has been removed from user.`,
      });
      
      fetchUsers();
    } catch (error: any) {
      console.error('Error removing role:', error);
      toast({
        title: "Error removing role",
        description: error.message || "There was a problem removing the role.",
        variant: "destructive"
      });
    }
  };

  const openRoleDialog = (user: any) => {
    setSelectedUser(user);
    setSelectedRole("");
    setDialogOpen(true);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">User Directory</h1>
        <p className="text-muted-foreground">
          Manage users and their security permissions
        </p>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage user accounts and roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Search users..." 
                className="max-w-sm" 
              />
            </div>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite User
            </Button>
          </div>
          
          <Table>
            <TableCaption>List of system users and their roles</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead className="w-[150px]">Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-medium">{user.full_name || 'No name'}</div>
                      <div className="text-sm text-muted-foreground">{user.username || user.id.substring(0, 8)}</div>
                    </TableCell>
                    <TableCell>{user.username || 'Not set'}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.roles && user.roles.length > 0 ? (
                          user.roles.map((role: string) => (
                            <div 
                              key={role} 
                              className="inline-flex items-center space-x-1 text-xs rounded-full px-2 py-0.5 bg-primary/10 text-primary"
                            >
                              <Shield className="h-3 w-3" />
                              <span>{role}</span>
                              {currentUser?.id !== user.id && userHasRole('admin') && (
                                <button 
                                  onClick={() => removeRole(user.id, role)}
                                  className="ml-1 hover:text-destructive"
                                >
                                  <UserX className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">No roles</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openRoleDialog(user)}
                        disabled={currentUser?.id === user.id}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Manage Roles
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <div className="flex flex-col items-center justify-center py-8">
                      <AlertTriangle className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No users found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Role</DialogTitle>
            <DialogDescription>
              {selectedUser && (
                <p>
                  Assign a role to {selectedUser.full_name || selectedUser.username || 'this user'}
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="analyst">Security Analyst</SelectItem>
                <SelectItem value="user">Standard User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddRole}
              disabled={!selectedRole}
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Assign Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
