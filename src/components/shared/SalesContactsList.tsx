import { Phone, MessageCircle } from "lucide-react";
import type { SalesContact } from "@/types/content";
import { telLink, zaloLink } from "@/lib/site-constants";
import { cn } from "@/lib/utils";

type Props = {
  contacts: SalesContact[];
  title?: string;
  variant?: "light" | "dark";
  compact?: boolean;
  embedded?: boolean;
  hideTitle?: boolean;
  className?: string;
};

function contactLabel(contact: SalesContact) {
  return `${contact.role} (${contact.name})`;
}

export function SalesContactsList({
  contacts,
  title = "Mọi chi tiết xin liên hệ",
  variant = "light",
  compact = false,
  embedded = false,
  hideTitle = false,
  className,
}: Props) {
  if (!contacts.length) return null;

  const isDark = variant === "dark";
  const isEmbedded = embedded || compact;

  return (
    <div
      className={cn(
        embedded
          ? hideTitle
            ? undefined
            : "space-y-4"
          : cn(
              "rounded-xl border",
              compact ? "p-4" : "p-5",
              isDark ? "border-brand-700 bg-brand-800/40" : "border-brand-200 bg-white",
            ),
        className,
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-widest",
          isDark ? "text-accent" : "text-brand-800",
          hideTitle && "sr-only",
        )}
      >
        {title}
      </p>
      <ul className={cn("space-y-3", !embedded && !hideTitle && (compact ? "mt-3" : "mt-4"), hideTitle && "mt-0")}>
        {contacts.map((contact) => (
          <li
            key={`${contact.name}-${contact.phone}`}
            className={cn(
              isEmbedded
                ? "grid gap-2 sm:grid-cols-[minmax(0,7.5rem)_1fr] sm:items-center sm:gap-4"
                : "flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
            )}
          >
            <span
              className={cn(
                "text-sm font-medium leading-snug",
                isDark ? "text-brand-100" : "text-ink",
                isEmbedded && "sm:whitespace-nowrap",
              )}
            >
              {contactLabel(contact)}
              {!isEmbedded && (
                <span className={isDark ? "text-brand-300" : "text-ink-muted"}> :</span>
              )}
            </span>
            <div
              className={cn(
                "flex flex-wrap items-center gap-x-3 gap-y-1",
                isEmbedded ? "sm:justify-end" : "sm:justify-end",
              )}
            >
              <a
                href={telLink(contact.phone)}
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-semibold tabular-nums",
                  isDark ? "text-white hover:text-accent" : "text-brand-800 hover:text-brand-900",
                )}
              >
                <Phone className="h-3.5 w-3.5 shrink-0 opacity-70" />
                {contact.phone}
              </a>
              <a
                href={zaloLink(contact.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-medium",
                  isDark ? "text-[#4FC3F7] hover:text-white" : "text-[#0068FF] hover:text-[#0058D6]",
                )}
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                Zalo
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
