import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AiProvider } from "@/utils/chatStream";

// Лейблы для отображения названий провайдеров
const providerLabels: Record<AiProvider, string> = {
  gemini: "Gemini",
  openrouter: "OpenRouter",
};

interface AiProviderSelectProps {
  value: AiProvider;
  onChange: (value: AiProvider) => void;
  // Компактный режим для встраивания в хедеры чата
  compact?: boolean;
  disabled?: boolean;
}

// Компонент выбора AI-провайдера
export function AiProviderSelect({
  value,
  onChange,
  compact = false,
  disabled = false,
}: AiProviderSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v as AiProvider)}
      disabled={disabled}
    >
      <SelectTrigger
        className={
          compact
            ? "h-7 w-[120px] text-xs border-white/20 bg-transparent"
            : "h-9 w-[160px] text-sm"
        }
      >
        <SelectValue placeholder="AI Provider" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="gemini">{providerLabels.gemini}</SelectItem>
        <SelectItem value="openrouter">{providerLabels.openrouter}</SelectItem>
      </SelectContent>
    </Select>
  );
}
