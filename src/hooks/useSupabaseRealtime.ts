
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type EventType = "INSERT" | "UPDATE" | "DELETE";
type Callback<T> = (payload: { eventType: EventType; new?: T | null; old?: T | null }) => void;

export function useSupabaseRealtime<T extends Record<string, any>>(
  table: string,
  callback: Callback<T>,
) {
  useEffect(() => {
    const channel = supabase
      .channel(`realtime:${table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        (payload) => {
          // Payload may include { eventType, new, old }
          callback({
            eventType: payload.eventType as EventType,
            new: payload.new as T | null,
            old: payload.old as T | null,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, callback]);
}
