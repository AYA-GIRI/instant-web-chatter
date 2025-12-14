import { supabase } from "@/integrations/supabase/client";
import {
  BookOpen,
  Zap,
  Cpu,
  Network,
  Lightbulb,
  BarChart3,
  Code,
  Database,
  Layers,
  Target,
  TrendingUp,
  Brain,
  FileText,
  Key,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Map icon names to React components
const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Zap,
  Cpu,
  Network,
  Lightbulb,
  BarChart3,
  Code,
  Database,
  Layers,
  Target,
  TrendingUp,
  Brain,
  FileText,
  Key,
  Shield,
};

/**
 * Get icon component by name
 */
export function getIconByName(iconName: string): LucideIcon {
  return iconMap[iconName] || FileText;
}

/**
 * Get public URL for a method file from Storage
 */
export function getMethodFileUrl(filePath: string): string {
  if (!filePath) return "";
  
  // If already a full URL, return as is
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }
  
  // Get public URL from Supabase Storage
  const { data } = supabase.storage.from("methods").getPublicUrl(filePath);
  return data.publicUrl;
}

/**
 * Download a method file
 */
export async function downloadMethodFile(
  fileUrl: string,
  fileName: string
): Promise<void> {
  try {
    // If fileUrl is a full URL, fetch it directly
    if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "method.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      return;
    }

    // Otherwise, download from Supabase Storage
    const { data, error } = await supabase.storage
      .from("methods")
      .download(fileUrl);

    if (error) {
      throw error;
    }

    if (data) {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || fileUrl.split("/").pop() || "method.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
}

/**
 * Open a method file in a new tab
 */
export function openMethodFile(fileUrl: string): void {
  const publicUrl = getMethodFileUrl(fileUrl);
  if (publicUrl) {
    window.open(publicUrl, "_blank");
  }
}

