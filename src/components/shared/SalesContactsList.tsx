import { Phone, MessageCircle } from "lucide-react";
import type { SalesContact } from "@/types/content";
import { telLink, zaloLink } from "@/lib/site-constants";
import { cn } from "@/lib/utils";

type Props = {
  contacts: SalesContact[];
  title?: string;
  variant?: "light" | "dark";
  layout?: "buttons" | "footer";
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
  layout = "buttons",
  compact = false,
  embedded = false,
  hideTitle = false,
  className,
}: Props) {
  if (!contacts.length) return null;

  const isDark = variant === "dark";

  if (layout === "footer") {
    return (
      <div className={cn("min-w-0", className)}>
        <p className="section-eyebrow section-eyebrow-light text-[11px]">
          {title}
        </p>
        <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <li key={`${contact.name}-${contact.phone}`}>
              <p className="text-xs text-brand-300">
                {contact.role} · {contact.name}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                <a
                  href={telLink(contact.phone)}
                  className="inline-flex items-center gap-1.5 text-sm text-brand-200 transition-colors hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-accent" />
                  <span className="tabular-nums">{contact.phone}</span>
                </a>
                <a
                  href={zaloLink(contact.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-brand-300 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-3 w-3 shrink-0" />
                  Zalo
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

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
                ? "grid gap-3 sm:grid-cols-[minmax(0,7.5rem)_1fr] sm:items-center sm:gap-4"
                : "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
            )}
          >
            <span
              className={cn(
                "text-sm font-medium leading-snug",
                isDark ? "text-brand-100" : "text-ink",
              )}
            >
              {contactLabel(contact)}
              {!isEmbedded && (
                <span className={isDark ? "text-brand-300" : "text-ink-muted"}> :</span>
              )}
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <a
                href={telLink(contact.phone)}
                className={cn(
                  "inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold tabular-nums transition-colors",
                  isDark
                    ? "bg-brand-700/60 text-white hover:bg-brand-700"
                    : "bg-brand-50 text-brand-800 hover:bg-brand-100",
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
                  "inline-flex min-h-11 items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                  isDark
                    ? "bg-zalo/20 text-zalo-light hover:bg-zalo/30"
                    : "bg-brand-50 text-zalo-hover hover:bg-brand-100 font-semibold",
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
