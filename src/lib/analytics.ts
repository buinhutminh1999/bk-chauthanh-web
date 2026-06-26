type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

function pushEvent(name: string, params?: EventParams) {
  if (typeof window === "undefined") return;

  const cleaned = params
    ? Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== undefined && value !== ""),
      )
    : {};

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...cleaned });

  if (window.gtag) {
    window.gtag("event", name, cleaned);
  }
}

/** GA4 recommended event — form báo giá / liên hệ gửi thành công */
export function trackGenerateLead(params: {
  form_id: string;
  product?: string;
  page_path?: string;
}) {
  pushEvent("generate_lead", {
    form_id: params.form_id,
    product: params.product,
    page_path: params.page_path ?? window.location.pathname,
  });

  if (window.fbq) {
    window.fbq("track", "Lead", {
      content_name: params.form_id,
      content_category: params.product,
    });
  }
}

/** Click gọi điện hoặc Zalo */
export function trackContactClick(params: {
  method: "phone" | "zalo";
  location: string;
}) {
  pushEvent("contact_click", params);
}
