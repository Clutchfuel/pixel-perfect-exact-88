import { cn } from "@/lib/utils";

export type QuizSurfaceTheme = "light" | "dark";

export const quizSurface = {
  light: {
    page: "bg-white",
    card: "rounded-[20px] border border-ink/10 bg-white p-8 md:p-10 shadow-sm",
    cardInline: { borderColor: undefined, background: undefined },
    muted: "text-muted-ink",
    text: "text-ink",
    optionBorder: "border-ink/10",
    optionBg: "bg-mist/30",
    optionSelected: "border-lime bg-lime/10",
    progressTrack: "bg-ink/10",
    input: "border-ink/15 bg-mist/30 text-ink placeholder:text-ink/35",
  },
  dark: {
    page: "performance-surface",
    pageStyle: { background: "#0A0A0A" } as const,
    card: "rounded-[20px] border p-8 md:p-10",
    cardInline: { borderColor: "#242424", background: "#171717" } as const,
    muted: "text-[#A1A1A1]",
    text: "text-white",
    optionBorder: "#242424",
    optionBg: "#121212",
    optionSelected: "border-lime bg-lime/10",
    progressTrack: "#242424",
    input: "border-[#242424] bg-[#121212] text-white placeholder:text-white/30",
  },
} as const;

export function quizCardClass(theme: QuizSurfaceTheme) {
  return quizSurface[theme].card;
}

export function quizMutedClass(theme: QuizSurfaceTheme) {
  return quizSurface[theme].muted;
}

export function optionButtonStyle(theme: QuizSurfaceTheme, selected: boolean) {
  if (theme === "light") {
    return selected
      ? { borderColor: undefined, background: undefined }
      : { borderColor: undefined, background: undefined };
  }
  const t = quizSurface.dark;
  return {
    borderColor: selected ? "#B7FF00" : t.optionBorder,
    background: selected ? "rgba(183, 255, 0, 0.08)" : t.optionBg,
  };
}

export function optionButtonClass(theme: QuizSurfaceTheme, selected: boolean) {
  return cn(
    "w-full rounded-2xl border px-5 py-4 text-left transition",
    theme === "light"
      ? selected
        ? quizSurface.light.optionSelected
        : "border-ink/10 bg-mist/30"
      : selected
        ? quizSurface.dark.optionSelected
        : "",
  );
}
