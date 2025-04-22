
import { useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type EventType = "INSERT" | "UPDATE" | "DELETE";
type Callback<T> = (payload: { eventType: EventType; new?: T | null; old?: T | null }) => void;

/**
 * Hook to subscribe to Supabase real-time updates for a specific table
 * @param table The table name to subscribe to
 * @param callback The callback function to execute when data changes
 */
export function useSupabaseRealtime<T extends Record<string, any>>(
  table: string,
  callback: Callback<T>,
) {
  // Use useCallback to memoize the subscription handler
  const handleSubscription = useCallback((payload: any) => {
    callback({
      eventType: payload.eventType as EventType,
      new: payload.new ? (payload.new as T) : null,
      old: payload.old ? (payload.old as T) : null,
    });
  }, [callback]);

  useEffect(() => {
    console.log(`Subscribing to real-time updates for table: ${table}`);
    const channel = supabase
      .channel(`realtime:${table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        handleSubscription
      )
      .subscribe();

    return () => {
      console.log(`Unsubscribing from real-time updates for table: ${table}`);
      supabase.removeChannel(channel);
    };
  }, [table, handleSubscription]);
}
