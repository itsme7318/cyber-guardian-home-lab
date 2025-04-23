
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Unauthorized() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
      <ShieldAlert className="h-20 w-20 text-destructive mb-6" />
      <h1 className="text-4xl font-bold tracking-tight">Unauthorized Access</h1>
      <p className="mt-4 mb-8 text-lg text-muted-foreground max-w-md">
        You don't have permission to access this resource. Please contact an administrator if you believe this is a mistake.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Link>
        </Button>
        {!user && (
          <Button variant="outline" asChild>
            <Link to="/auth">Login with a different account</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
