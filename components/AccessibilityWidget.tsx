import React, { useEffect, useId, useState } from "react";
import { useI18n } from "../i18n";

type ContrastMode = "normal" | "high";

const FONT_KEY = "a11y_font_scale";
const CONTRAST_KEY = "a11y_contrast";

const MIN_SCALE = 0.9;
const MAX_SCALE = 1.25;

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

const AccessibilityWidget: React.FC = () => {
  const { lang } = useI18n();
  const panelId = useId();
  const titleId = useId();

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState<boolean>(false);

  const [fontScale, setFontScale] = useState<number>(() => {
    const saved = Number(localStorage.getItem(FONT_KEY));
    return Number.isFinite(saved) ? saved : 1;
  });

  const [contrast, setContrast] = useState<ContrastMode>(() => {
    return localStorage.getItem(CONTRAST_KEY) === "high" ? "high" : "normal";
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${clamp(fontScale, MIN_SCALE, MAX_SCALE) * 100}%`;
    localStorage.setItem(FONT_KEY, String(fontScale));
  }, [fontScale]);

  useEffect(() => {
    document.body.classList.toggle("a11y-high-contrast", contrast === "high");
    localStorage.setItem(CONTRAST_KEY, contrast);
  }, [contrast]);

  useEffect(() => {
    if (hidden) setOpen(false);
  }, [hidden]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const reset = () => {
    setFontScale(1);
    setContrast("normal");
    setHidden(false);
    localStorage.removeItem(FONT_KEY);
    localStorage.removeItem(CONTRAST_KEY);
  };

  const isMin = fontScale <= MIN_SCALE;
  const isMax = fontScale >= MAX_SCALE;

  const labels =
    lang === "he"
      ? {
          button: "נגישות",
          panelTitle: "נגישות",
          close: "סגור",
          hide: "הסתר",
          textSize: "גודל טקסט",
          contrast: "ניגודיות גבוהה",
          on: "פעיל",
          off: "כבוי",
          reset: "איפוס",
          hiddenHint:
            "להסתרה: לחצי על ה-X ליד הכפתור. ברענון או כניסה מחדש לאתר הכפתור יחזור.",
          minReached: "הגעת להקטנה המקסימלית",
          maxReached: "הגעת להגדלה המקסימלית",
          smaller: "הקטנת טקסט",
          bigger: "הגדלת טקסט",
        }
      : {
          button: "Accessibility",
          panelTitle: "Accessibility",
          close: "Close",
          hide: "Hide",
          textSize: "Text Size",
          contrast: "High Contrast",
          on: "ON",
          off: "OFF",
          reset: "Reset",
          hiddenHint:
            "To hide, click the X next to the button. The widget will return when you refresh or reopen the site.",
          minReached: "Minimum text size reached",
          maxReached: "Maximum text size reached",
          smaller: "Decrease text size",
          bigger: "Increase text size",
        };

  if (hidden) return null;

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[9999] pointer-events-auto">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl scale-110 animate-pulse pointer-events-none" />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/40 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center hover:scale-105"
            aria-label={labels.button}
            aria-expanded={open}
            aria-controls={panelId}
            title={labels.button}
          >
            <AccessibilityIcon className="w-7 h-7" />
          </button>

          <button
            type="button"
            onClick={() => setHidden(true)}
            aria-label={labels.hide}
            title={labels.hide}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-700 shadow hover:bg-slate-50 flex items-center justify-center"
          >
            <XIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div
        id={panelId}
        className={`fixed bottom-24 left-6 z-[9998] w-72 rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        role="dialog"
        aria-labelledby={titleId}
        aria-hidden={!open}
        dir={lang === "he" ? "rtl" : "ltr"}
      >
        <div className="flex items-center justify-between mb-4">
          <div id={titleId} className="font-bold text-slate-800 text-lg">
            {labels.panelTitle}
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={labels.close}
            className="text-slate-500 hover:text-slate-800"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-sm font-semibold text-slate-700 mb-2">{labels.textSize}</div>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={isMin}
              aria-label={labels.smaller}
              onClick={() =>
                setFontScale((s) => clamp(Number((s - 0.05).toFixed(2)), MIN_SCALE, MAX_SCALE))
              }
              className={`flex-1 rounded-xl border px-3 py-2 transition ${
                isMin
                  ? "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "border-slate-200 hover:bg-slate-50 text-slate-800"
              }`}
            >
              A-
            </button>

            <button
              type="button"
              disabled={isMax}
              aria-label={labels.bigger}
              onClick={() =>
                setFontScale((s) => clamp(Number((s + 0.05).toFixed(2)), MIN_SCALE, MAX_SCALE))
              }
              className={`flex-1 rounded-xl border px-3 py-2 transition ${
                isMax
                  ? "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "border-slate-200 hover:bg-slate-50 text-slate-800"
              }`}
            >
              A+
            </button>
          </div>

          <div className="mt-2 text-xs text-slate-500">
            {Math.round(fontScale * 100)}%
          </div>

          {(isMin || isMax) && (
            <div className="mt-2 text-xs font-medium text-amber-600" aria-live="polite">
              {isMin ? labels.minReached : labels.maxReached}
            </div>
          )}
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={() => setContrast((c) => (c === "high" ? "normal" : "high"))}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50 flex items-center justify-between"
            aria-pressed={contrast === "high"}
          >
            <span className="text-slate-800">{labels.contrast}</span>
            <span className="text-slate-500">
              {contrast === "high" ? labels.on : labels.off}
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={reset}
          className="w-full rounded-xl bg-slate-900 text-white px-3 py-2 hover:bg-slate-800 transition-colors"
        >
          {labels.reset}
        </button>

        <div className="mt-3 text-xs text-slate-500 leading-relaxed">
          {labels.hiddenHint}
        </div>
      </div>
    </>
  );
};

export default AccessibilityWidget;

/* ---------- Icons ---------- */

const AccessibilityIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="12" cy="4.5" r="1.6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9.5c3 1.6 9 1.6 12 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.2 21l1.8-6 1.8 6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 15h5" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
  </svg>
);
