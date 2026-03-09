import { useState, useCallback } from "react";
import type { AiProvider } from "@/utils/chatStream";

const STORAGE_KEY = "ai-provider";
const DEFAULT_PROVIDER: AiProvider = "gemini";

// Читаем сохраненный провайдер из localStorage
function getStoredProvider(): AiProvider {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "gemini" || stored === "openrouter") {
      return stored;
    }
  } catch {
    // localStorage может быть недоступен
  }
  return DEFAULT_PROVIDER;
}

// Хук для выбора AI-провайдера с сохранением в localStorage
export function useAiProvider() {
  const [provider, setProviderState] = useState<AiProvider>(getStoredProvider);

  const setProvider = useCallback((newProvider: AiProvider) => {
    setProviderState(newProvider);
    try {
      localStorage.setItem(STORAGE_KEY, newProvider);
    } catch {
      // Игнорируем ошибки записи в localStorage
    }
  }, []);

  return { provider, setProvider } as const;
}
