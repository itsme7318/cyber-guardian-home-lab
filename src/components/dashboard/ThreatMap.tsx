
import { Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ThreatMap() {
  return (
    <Card className="cyber-card col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Global Threat Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center p-4 h-80 bg-muted/50 rounded-md border border-dashed border-muted">
          <Globe className="h-16 w-16 text-muted-foreground mb-4 opacity-30" />
          <p className="text-sm text-muted-foreground">
            In a real SIEM system, this would display a live map of threat origins and attack vectors 
            from around the world, showing active attacks and threat intelligence data.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            This placeholder represents integration with threat intelligence data that would be 
            available in a production environment.
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-3 mt-4">
          {["North America", "Europe", "Asia", "Other"].map((region) => (
            <div key={region} className="bg-muted p-3 rounded-md">
              <p className="text-xs text-muted-foreground mb-1">{region}</p>
              <p className="text-lg font-medium">{Math.floor(Math.random() * 400)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
