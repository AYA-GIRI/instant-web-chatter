import type { PracticumStep } from "@/hooks/usePracticum";
import { MarkdownContent } from "./MarkdownContent";
import { Lightbulb, AlertTriangle, Info, Sparkles } from "lucide-react";

const STYLE_CONFIG: Record<string, {
  icon: typeof Info;
  bg: string;
  border: string;
  iconColor: string;
}> = {
  tip: {
    icon: Lightbulb,
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    iconColor: "text-yellow-600",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    iconColor: "text-red-600",
  },
  example: {
    icon: Sparkles,
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    iconColor: "text-purple-600",
  },
  note: {
    icon: Info,
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    iconColor: "text-blue-600",
  },
};

export function InfoStep({ step }: { step: PracticumStep }) {
  if (!step.content) return null;

  const style = STYLE_CONFIG[step.info_style || "note"] || STYLE_CONFIG.note;
  const Icon = style.icon;

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-4 my-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          {step.title && (
            <p className={`font-semibold ${style.iconColor} mb-1`}>{step.title}</p>
          )}
          <div className="text-sm">
            <MarkdownContent content={step.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
