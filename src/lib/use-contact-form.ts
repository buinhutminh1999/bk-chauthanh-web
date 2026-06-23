"use client";

import { useState } from "react";
import type { ContactFormInput } from "@/lib/contact-schema";

export async function submitContactForm(data: ContactFormInput) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = (await res.json().catch(() => ({}))) as { error?: string };

  if (!res.ok) {
    throw new Error(json.error ?? "Gửi yêu cầu thất bại");
  }
}

export function useContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(data: ContactFormInput) {
    setLoading(true);
    setError(null);
    try {
      await submitContactForm(data);
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gửi yêu cầu thất bại");
    } finally {
      setLoading(false);
    }
  }

  return { loading, sent, error, submit, reset: () => { setSent(false); setError(null); } };
}
