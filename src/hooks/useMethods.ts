import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Method = {
  id: string;
  title: string;
  description: string | null;
  tags: string[];
  level: "beginner" | "intermediate" | "advanced";
  direction: "ai" | "ml" | "neural" | "prompting";
  file_url: string | null;
  file_name: string | null;
  file_size: number | null;
  icon_name: string;
  format: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
};

export function useMethods() {
  const [methods, setMethods] = useState<Method[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMethods() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("methods")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        setMethods(data || []);
      } catch (err) {
        console.error("Error fetching methods:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    }

    fetchMethods();
  }, []);

  return { methods, loading, error };
}

