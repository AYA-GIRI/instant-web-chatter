import { useState } from "react";
import type { PracticumStep } from "@/hooks/usePracticum";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

type QuizStepProps = {
  step: PracticumStep;
  onComplete: () => void;
  isCompleted: boolean;
};

export function QuizStep({ step, onComplete, isCompleted }: QuizStepProps) {
  // When restoring from DB, set selected to correctIndex so UI shows green
  const correctIndex = step.quiz_correct_index ?? -1;
  const [selected, setSelected] = useState<number | null>(
    isCompleted ? correctIndex : null
  );
  const [answered, setAnswered] = useState(isCompleted);

  const options: string[] = Array.isArray(step.quiz_options)
    ? (step.quiz_options as string[])
    : [];

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === correctIndex) {
      onComplete();
    }
  };

  const handleRetry = () => {
    setSelected(null);
    setAnswered(false);
  };

  if (!step.quiz_question || options.length === 0) return null;

  return (
    <div className="my-6 p-6 bg-card border border-border rounded-xl">
      <p className="font-semibold text-foreground mb-4">{step.quiz_question}</p>
      <div className="space-y-2">
        {options.map((option, idx) => {
          let optionStyle = "bg-secondary/50 hover:bg-secondary border-border hover:border-primary/50";
          if (answered && idx === selected && selected === correctIndex) {
            optionStyle = "bg-green-500/10 border-green-500/50 text-green-700";
          } else if (answered && idx === selected && selected !== correctIndex) {
            optionStyle = "bg-red-500/10 border-red-500/50 text-red-700";
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${optionStyle}`}
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-medium">
                {answered && idx === selected && selected === correctIndex ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : answered && idx === selected && selected !== correctIndex ? (
                  <XCircle className="h-5 w-5 text-red-500" />
                ) : (
                  String.fromCharCode(65 + idx)
                )}
              </span>
              <span className="text-sm">{option}</span>
            </button>
          );
        })}
      </div>

      {answered && selected !== null && selected !== correctIndex && (
        <div className="mt-4 flex items-center gap-3">
          <p className="text-sm text-red-600">Неверно. Попробуйте ещё раз!</p>
          <Button variant="outline" size="sm" onClick={handleRetry}>
            Повторить
          </Button>
        </div>
      )}

      {answered && selected === correctIndex && (
        <p className="mt-4 text-sm text-green-600 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Правильно!
        </p>
      )}
    </div>
  );
}
