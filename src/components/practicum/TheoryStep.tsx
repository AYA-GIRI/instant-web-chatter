import type { PracticumStep } from "@/hooks/usePracticum";
import { MarkdownContent } from "./MarkdownContent";

export function TheoryStep({ step }: { step: PracticumStep }) {
  if (!step.content) return null;

  return (
    <div className="py-2">
      <MarkdownContent content={step.content} />
    </div>
  );
}
