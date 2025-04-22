
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

export function StatusCard({ 
  title, 
  icon, 
  children, 
  className, 
  variant = "default" 
}: StatusCardProps) {
  
  const variantClasses = {
    default: "",
    success: "border-cyber-success border-2",
    warning: "border-cyber-warning border-2",
    danger: "border-cyber-danger border-2",
    info: "border-cyber-info border-2"
  };

  return (
    <Card className={cn("cyber-card", variantClasses[variant], className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
