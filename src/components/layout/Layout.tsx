import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function Layout({ children, className, fullWidth = false }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <SidebarTrigger className="m-2" />
          <Header />
          <main className={cn(
            "flex-1 p-6",
            fullWidth ? "max-w-none" : "container",
            className
          )}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
