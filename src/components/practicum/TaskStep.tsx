import { useState, useRef, useEffect } from "react";
import type { PracticumStep } from "@/hooks/usePracticum";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  Copy,
  Check,
  Sparkles,
  Loader2,
  Send,
  MessageSquare,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { streamChat, type MentorContext } from "@/utils/chatStream";
import { useAiProvider } from "@/hooks/useAiProvider";
import { MarkdownContent } from "./MarkdownContent";

type DialogMessage = {
  role: "user" | "assistant";
  content: string;
};

type VerificationResult = {
  passed: boolean;
  feedback: string;
  suggestions: string[];
};

type TaskStepProps = {
  step: PracticumStep;
  onComplete: (notes: string) => void;
  isCompleted: boolean;
  savedNotes: string;
};

function parseVerificationResult(response: string): VerificationResult {
  const passPatterns = [
    /\[VERDICT:\s*PASS\]/i,
    /\[ЗАЧТЕНО\]/i,
    /ВЕРДИКТ:\s*ЗАЧТЕНО/i,
    /---\s*ЗАЧТЕНО\s*---/i,
  ];
  const failPatterns = [
    /\[VERDICT:\s*FAIL\]/i,
    /\[НЕ ЗАЧТЕНО\]/i,
    /ВЕРДИКТ:\s*НЕ ЗАЧТЕНО/i,
    /---\s*НЕ ЗАЧТЕНО\s*---/i,
  ];

  const passed = passPatterns.some((p) => p.test(response));
  const failed = failPatterns.some((p) => p.test(response));

  const suggestions: string[] = [];
  const matches = response.match(/^[-*]\s+.+$/gm);
  if (matches) {
    suggestions.push(
      ...matches.slice(0, 3).map((s) => s.replace(/^[-*]\s+/, ""))
    );
  }

  const feedback = response
    .replace(/\[VERDICT:\s*(PASS|FAIL)\]/gi, "")
    .replace(/\[(ЗАЧТЕНО|НЕ ЗАЧТЕНО)\]/gi, "")
    .replace(/ВЕРДИКТ:\s*(ЗАЧТЕНО|НЕ ЗАЧТЕНО)/gi, "")
    .replace(/---\s*(ЗАЧТЕНО|НЕ ЗАЧТЕНО)\s*---/gi, "")
    .trim();

  return { passed: passed && !failed, feedback, suggestions };
}

function getDifficultyColor(d: string) {
  switch (d) {
    case "easy":
      return "bg-green-500/10 text-green-600 border-green-500/30";
    case "medium":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30";
    case "hard":
      return "bg-red-500/10 text-red-600 border-red-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getDifficultyLabel(d: string) {
  switch (d) {
    case "easy":
      return "Легко";
    case "medium":
      return "Средне";
    case "hard":
      return "Сложно";
    default:
      return d;
  }
}

export function TaskStep({ step, onComplete, isCompleted, savedNotes }: TaskStepProps) {
  const { toast } = useToast();
  const { provider } = useAiProvider();
  const [userPrompt, setUserPrompt] = useState(savedNotes || "");
  const [showHint, setShowHint] = useState(false);
  const [copiedExample, setCopiedExample] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);

  // Verification state
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  // Discussion state
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [discussionMessages, setDiscussionMessages] = useState<DialogMessage[]>([]);
  const [discussionInput, setDiscussionInput] = useState("");
  const [isDiscussionLoading, setIsDiscussionLoading] = useState(false);
  const discussionEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    discussionEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [discussionMessages]);

  const handleCopyExample = () => {
    if (step.task_example) {
      navigator.clipboard.writeText(step.task_example);
      setCopiedExample(true);
      setTimeout(() => setCopiedExample(false), 2000);
    }
  };

  const handleSubmitForVerification = async () => {
    if (userPrompt.trim().length < 20) {
      toast({
        title: "Промпт слишком короткий",
        description: "Минимум 20 символов",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    setAiResponse("");
    setVerificationResult(null);
    setShowResultDialog(true);

    const mentorContext: MentorContext = {
      mode: "verify",
      taskTitle: step.title || "Задание",
      taskDescription: step.task_description || "",
      taskDifficulty: (step.task_difficulty as "easy" | "medium" | "hard") || "medium",
      userAnswer: userPrompt,
      successCriteria: step.task_success_criteria || [],
    };

    let fullResponse = "";

    try {
      await streamChat({
        messages: [
          { role: "user", content: "Проверь мой промпт на соответствие заданию и критериям." },
        ],
        context: mentorContext,
        provider,
        onDelta: (chunk) => {
          fullResponse += chunk;
          setAiResponse(fullResponse);
        },
        onDone: () => {
          setIsVerifying(false);
          const result = parseVerificationResult(fullResponse);
          setVerificationResult(result);
          if (result.passed) {
            setCompleted(true);
            onComplete(userPrompt);
          }
        },
        onError: (error) => {
          console.error("Verification error:", error);
          setIsVerifying(false);
          toast({
            title: "Ошибка проверки",
            description: "Попробуйте ещё раз",
            variant: "destructive",
          });
          setShowResultDialog(false);
        },
      });
    } catch (error) {
      console.error(error);
      setIsVerifying(false);
      setShowResultDialog(false);
    }
  };

  const handleStartDiscussion = () => {
    const initialMessages: DialogMessage[] = [
      {
        role: "user",
        content: `Контекст для обсуждения:\n\nЗАДАНИЕ: ${step.title}\nОПИСАНИЕ: ${step.task_description}\n\nМОЙ ОТВЕТ:\n${userPrompt}\n\nРЕЗУЛЬТАТ ПРОВЕРКИ:\n${aiResponse}\n\n---\nЯ хочу обсудить задание и свой ответ.`,
      },
      {
        role: "assistant",
        content:
          "Я готов обсудить ваш ответ. Что именно вас интересует? Могу объяснить замечания подробнее, предложить альтернативные варианты или помочь улучшить промпт.",
      },
    ];
    setDiscussionMessages(initialMessages);
    setShowDiscussion(true);
  };

  const handleSendDiscussionMessage = async () => {
    if (!discussionInput.trim() || isDiscussionLoading) return;

    const userMessage = discussionInput.trim();
    setDiscussionInput("");

    const newMessages: DialogMessage[] = [
      ...discussionMessages,
      { role: "user", content: userMessage },
    ];
    setDiscussionMessages(newMessages);
    setIsDiscussionLoading(true);

    let assistantContent = "";

    try {
      const discussContext: MentorContext = {
        mode: "discuss",
        taskTitle: step.title || "Задание",
        taskDescription: step.task_description || "",
        taskDifficulty: (step.task_difficulty as "easy" | "medium" | "hard") || "medium",
        userAnswer: userPrompt,
        previousFeedback: aiResponse,
      };

      await streamChat({
        messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        context: discussContext,
        provider,
        onDelta: (chunk) => {
          assistantContent += chunk;
          setDiscussionMessages([
            ...newMessages,
            { role: "assistant", content: assistantContent },
          ]);
        },
        onDone: () => setIsDiscussionLoading(false),
        onError: (error) => {
          console.error("Discussion error:", error);
          setIsDiscussionLoading(false);
          toast({
            title: "Ошибка",
            description: "Не удалось отправить сообщение",
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error(error);
      setIsDiscussionLoading(false);
    }
  };

  const handleDiscussionKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendDiscussionMessage();
    }
  };

  const handleCloseDialog = () => {
    setShowResultDialog(false);
    setShowDiscussion(false);
    setDiscussionMessages([]);
    setDiscussionInput("");
  };

  return (
    <div className="my-6 p-6 bg-card border border-border rounded-xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-accent" />
            <h3 className="font-semibold text-foreground">
              {step.title || "Задание"}
            </h3>
            {completed && <CheckCircle2 className="h-5 w-5 text-green-500" />}
          </div>
          {step.task_difficulty && (
            <Badge className={getDifficultyColor(step.task_difficulty)}>
              {getDifficultyLabel(step.task_difficulty)}
            </Badge>
          )}
        </div>
      </div>

      {/* Description with glossary support */}
      {step.task_description && (
        <div className="mb-4 text-foreground">
          <MarkdownContent content={step.task_description} />
        </div>
      )}

      {/* Example */}
      {step.task_example && (
        <div className="bg-secondary/50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Пример структуры:</span>
            <Button variant="ghost" size="sm" onClick={handleCopyExample} className="h-8 px-2">
              {copiedExample ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <code className="text-sm text-muted-foreground whitespace-pre-wrap">
            {step.task_example}
          </code>
        </div>
      )}

      {/* Hint */}
      {showHint && step.task_hint && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4 animate-in fade-in">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-700 dark:text-yellow-400">{step.task_hint}</p>
          </div>
        </div>
      )}

      {/* User input */}
      <div className="mb-4">
        <label className="text-sm font-medium text-foreground mb-2 block">
          Ваш промпт:
        </label>
        <Textarea
          placeholder="Напишите свой промпт здесь..."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          className="min-h-[120px] resize-none"
          disabled={isVerifying}
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            {userPrompt.length} символов (минимум 20)
          </span>
          {!showHint && step.task_hint && (
            <button onClick={() => setShowHint(true)} className="text-xs text-primary hover:underline">
              Показать подсказку
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleSubmitForVerification}
          className="flex-1 bg-accent hover:bg-accent/90"
          disabled={isVerifying || completed}
        >
          {completed ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Зачтено
            </>
          ) : isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Проверка...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Отправить на проверку
            </>
          )}
        </Button>
      </div>

      {/* Verification Dialog */}
      <Dialog
        open={showResultDialog}
        onOpenChange={(open) => {
          if (!open) {
            setShowDiscussion(false);
            setDiscussionMessages([]);
          }
          setShowResultDialog(open);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              {isVerifying ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  Проверка задания...
                </>
              ) : showDiscussion ? (
                <>
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Обсуждение задания
                </>
              ) : verificationResult?.passed ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Задание зачтено!
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  Требуется доработка
                </>
              )}
            </DialogTitle>
            <DialogDescription>{step.title}</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
            {showDiscussion ? (
              <div className="space-y-4">
                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                  {discussionMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-3 ${
                          msg.role === "user"
                            ? "bg-accent text-white"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isDiscussionLoading && (
                    <div className="flex justify-start">
                      <div className="bg-secondary rounded-lg p-3">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={discussionEndRef} />
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <Input
                    value={discussionInput}
                    onChange={(e) => setDiscussionInput(e.target.value)}
                    onKeyDown={handleDiscussionKeyPress}
                    placeholder="Задайте вопрос..."
                    disabled={isDiscussionLoading}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendDiscussionMessage}
                    size="icon"
                    disabled={isDiscussionLoading || !discussionInput.trim()}
                    className="bg-accent hover:bg-accent/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" onClick={() => setShowDiscussion(false)} className="flex-1">
                    Назад к результату
                  </Button>
                  {verificationResult?.passed && (
                    <Button onClick={handleCloseDialog} className="flex-1">
                      Закрыть
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-secondary/50 rounded-lg p-4 max-h-[35vh] overflow-y-auto">
                  <p className="text-sm whitespace-pre-wrap">
                    {aiResponse || "Анализирую ваш промпт..."}
                  </p>
                </div>

                {!isVerifying && verificationResult && (
                  <div
                    className={`rounded-lg p-4 ${
                      verificationResult.passed
                        ? "bg-green-500/10 border border-green-500/30"
                        : "bg-red-500/10 border border-red-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {verificationResult.passed ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span className="font-medium text-green-600">Зачтено</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-500" />
                          <span className="font-medium text-red-600">
                            Не зачтено -- попробуйте ещё раз
                          </span>
                        </>
                      )}
                    </div>
                    {!verificationResult.passed && (
                      <p className="text-sm text-muted-foreground">
                        Доработайте промпт с учётом замечаний и отправьте повторно.
                      </p>
                    )}
                  </div>
                )}

                {!isVerifying && (
                  <div className="flex gap-3 flex-wrap">
                    {verificationResult?.passed ? (
                      <>
                        <Button onClick={handleCloseDialog} className="flex-1">
                          Закрыть
                        </Button>
                        <Button variant="outline" onClick={handleStartDiscussion} className="flex-1">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Обсудить
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => setShowResultDialog(false)} className="flex-1">
                          Доработать ответ
                        </Button>
                        <Button variant="outline" onClick={handleStartDiscussion} className="flex-1">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Обсудить
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
