
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type EventType = "INSERT" | "UPDATE" | "DELETE";
type Callback<T> = (payload: { eventType: EventType; new?: T; old?: T }) => void;

export function useSupabaseRealtime<T>(
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
            eventType: payload.eventType,
            new: payload.new,
            old: payload.old,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, callback]);
}
