
import { supabase } from "@/integrations/supabase/client";

// Since we can't directly use the user_activity_logs table until types are updated,
// we'll use a more generic approach
export const logUserActivity = async (
  userId: string,
  activityType: string,
  details: Record<string, any> = {}
) => {
  if (!userId) return null;
  
  try {
    // Use a direct SQL query to insert into user_activity_logs
    const { data, error } = await supabase.rpc('log_user_activity', {
      p_user_id: userId,
      p_activity_type: activityType,
      p_details: details,
      p_ip_address: '127.0.0.1' // In a production app, you would get this from a server
    });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to log user activity:', error);
    return null;
  }
};

export const getUserActivityLogs = async (userId: string) => {
  try {
    // Use a direct SQL query to get user activity logs
    const { data, error } = await supabase.rpc('get_user_activity_logs', {
      p_user_id: userId
    });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to get user activity logs:', error);
    return [];
  }
};
