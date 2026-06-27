"use client";

import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import type { ProductProcess } from "@/lib/product-process";
import { cn } from "@/lib/utils";

export type ProcessSize = "default" | "compact" | "card";

const STEP_PALETTE = [
  "from-brand-400 to-brand-600",
  "from-brand-500 to-brand-700",
  "from-teal-500 to-brand-600",
  "from-brand-600 to-brand-800",
  "from-accent to-accent-dark",
  "from-brand-700 to-brand-900",
  "from-brand-500 to-teal-700",
  "from-teal-600 to-brand-800",
  "from-accent-light to-brand-700",
];

function StepBox({
  step,
  index,
  size = "default",
}: {
  step: string;
  index: number;
  size?: ProcessSize;
}) {
  const isFinal = /thành phẩm/i.test(step);
  const isCompact = size !== "default";
  const isCard = size === "card";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-md text-center font-medium text-white shadow-sm",
        "bg-gradient-to-br",
        STEP_PALETTE[index % STEP_PALETTE.length],
        isCard
          ? "min-h-[2.1rem] px-1.5 py-1 text-[8px] leading-tight sm:text-[9px]"
          : isCompact
            ? "min-h-[2.5rem] px-2 py-1.5 text-[10px] leading-snug"
            : "min-h-[3.5rem] rounded-lg px-3 py-2.5 text-xs sm:text-sm leading-snug",
        isFinal && "ring-2 ring-accent/60",
      )}
    >
      {size === "default" && (
        <span className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-brand-800 shadow">
          {index + 1}
        </span>
      )}
      <span>{step}</span>
    </div>
  );
}

function FlowArrow({
  direction,
  size = "default",
}: {
  direction: "right" | "left" | "down";
  size?: ProcessSize;
}) {
  const Icon =
    direction === "right" ? ArrowRight : direction === "left" ? ArrowLeft : ArrowDown;
  const isCard = size === "card";
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center text-brand-400",
        isCard ? "h-3 w-3" : size === "compact" ? "h-4 w-4" : "h-5 w-5 sm:h-6 sm:w-6",
      )}
      aria-hidden
    >
      <Icon className="h-full w-full" strokeWidth={2.5} />
    </div>
  );
}

function flowGap(size: ProcessSize) {
  if (size === "card") return "gap-0.5";
  if (size === "compact") return "gap-1";
  return "gap-2 sm:gap-3";
}

function Zigzag2Flow({ steps, size = "default" }: { steps: string[]; size?: ProcessSize }) {
  const pairs: [string, string | null][] = [];
  for (let i = 0; i < steps.length; i += 2) {
    pairs.push([steps[i], steps[i + 1] ?? null]);
  }

  return (
    <div className={cn("flex flex-col", size === "card" ? "gap-0.5" : size === "compact" ? "gap-1" : "gap-3")}>
      {pairs.map(([left, right], row) => {
        const leftIdx = row * 2;
        const rightIdx = leftIdx + 1;
        const reverse = row % 2 === 1;

        return (
          <div key={row} className="flex flex-col items-center">
            <div
              className={cn(
                "grid w-full items-center grid-cols-[1fr_auto_1fr]",
                flowGap(size),
              )}
            >
              {reverse ? (
                <>
                  {right ? <StepBox step={right} index={rightIdx} size={size} /> : <div />}
                  {right && <FlowArrow direction="left" size={size} />}
                  <StepBox step={left} index={leftIdx} size={size} />
                </>
              ) : (
                <>
                  <StepBox step={left} index={leftIdx} size={size} />
                  {right && <FlowArrow direction="right" size={size} />}
                  {right ? <StepBox step={right} index={rightIdx} size={size} /> : <div />}
                </>
              )}
            </div>
            {row < pairs.length - 1 && <FlowArrow direction="down" size={size} />}
          </div>
        );
      })}
    </div>
  );
}

function Grid3x3Flow({ steps, size = "default" }: { steps: string[]; size?: ProcessSize }) {
  const rows = [
    [0, 1, 2],
    [5, 4, 3],
    [6, 7, 8],
  ];

  return (
    <div className={cn("flex flex-col", size === "card" ? "gap-0.5" : size === "compact" ? "gap-1" : "gap-3")}>
      {rows.map((cols, rowIdx) => (
        <div key={rowIdx} className="flex flex-col items-center">
          <div
            className={cn(
              "grid w-full grid-cols-[1fr_auto_1fr_auto_1fr] items-center",
              flowGap(size),
            )}
          >
            {cols.map((stepIdx, colIdx) => {
              const step = steps[stepIdx];
              if (!step) return null;
              const arrowAfter = colIdx < 2 ? (rowIdx === 1 ? "left" : "right") : null;

              return (
                <div key={stepIdx} className="contents">
                  <StepBox step={step} index={stepIdx} size={size} />
                  {arrowAfter && <FlowArrow direction={arrowAfter} size={size} />}
                </div>
              );
            })}
          </div>
          {rowIdx < rows.length - 1 && <FlowArrow direction="down" size={size} />}
        </div>
      ))}
    </div>
  );
}

function PrestressFlow({ steps, size = "default" }: { steps: string[]; size?: ProcessSize }) {
  const rows: number[][] =
    size === "card" && steps.length >= 7
      ? Array.from({ length: Math.ceil(steps.length / 2) }, (_, row) => {
          const start = row * 2;
          const pair = [start, start + 1].filter((i) => i < steps.length);
          return row % 2 === 1 ? pair.reverse() : pair;
        })
      : steps.length === 7
        ? [[0, 1, 2], [5, 4, 3], [6]]
        : steps.length === 8
          ? [[0, 1, 2, 3], [7, 6, 5, 4]]
          : [[0, 1, 2, 3].filter((i) => steps[i])];

  return (
    <div className={cn("flex flex-col", size === "card" ? "gap-0.5" : size === "compact" ? "gap-1" : "gap-3")}>
      {rows.map((cols, rowIdx) => {
        const reverse = rowIdx === 1 && cols.length > 1;

        return (
          <div key={rowIdx} className="flex flex-col items-center">
            <div
              className={cn(
                "flex w-full flex-wrap items-center justify-center",
                flowGap(size),
              )}
            >
              {cols.map((stepIdx, colIdx) => (
                <div key={stepIdx} className="flex items-center">
                  <StepBox step={steps[stepIdx]} index={stepIdx} size={size} />
                  {colIdx < cols.length - 1 && (
                    <FlowArrow direction={reverse ? "left" : "right"} size={size} />
                  )}
                </div>
              ))}
            </div>
            {rowIdx < rows.length - 1 && <FlowArrow direction="down" size={size} />}
          </div>
        );
      })}
    </div>
  );
}

export function ProductionProcess({
  process,
  size,
  compact = false,
  className,
}: {
  process: ProductProcess;
  size?: ProcessSize;
  compact?: boolean;
  className?: string;
}) {
  const resolvedSize: ProcessSize = size ?? (compact ? "compact" : "default");
  const Flow =
    process.layout === "grid-3x3"
      ? Grid3x3Flow
      : process.layout === "prestress"
        ? PrestressFlow
        : Zigzag2Flow;

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-xl bg-white ring-1 ring-brand-100 shadow-card",
        resolvedSize === "card" ? "rounded-lg" : "rounded-2xl",
        className,
      )}
    >
      <div
        className={cn(
          "bg-brand-red text-center",
          resolvedSize === "card" ? "px-2 py-1" : "px-4 py-2.5",
        )}
      >
        <p
          className={cn(
            "font-bold uppercase tracking-wider text-white",
            resolvedSize === "card"
              ? "text-[10px] leading-tight"
              : resolvedSize === "compact"
                ? "text-xs"
                : "text-sm sm:text-base",
          )}
        >
          {process.banner}
        </p>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col",
          resolvedSize === "card" ? "p-1.5" : resolvedSize === "compact" ? "p-2.5" : "p-4 sm:p-6",
        )}
      >
        {resolvedSize === "default" && (
          <h3 className="mb-4 text-center font-display text-lg text-brand-900 sm:text-xl">
            {process.title}
          </h3>
        )}

        <Flow steps={process.steps} size={resolvedSize} />
      </div>
    </div>
  );
}
