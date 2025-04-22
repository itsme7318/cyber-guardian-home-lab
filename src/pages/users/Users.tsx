
import { Layout } from "@/components/layout/Layout";
import { Users as UsersIcon } from "lucide-react";

export default function Users() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">User Directory</h1>
        <p className="text-muted-foreground">
          Manage users and their security permissions
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[50vh] rounded-lg border p-8 text-center">
        <UsersIcon className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">User Management Console</h2>
        <p className="text-muted-foreground max-w-md">
          Manage user accounts, roles, permissions, and security settings across your organization.
        </p>
      </div>
    </Layout>
  );
}
