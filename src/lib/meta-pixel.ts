declare global {
  interface Window {
    fbq?: ((
      event: string,
      eventName: string,
      parameters?: Record<string, string | number | boolean | undefined>,
    ) => void) & {
      q?: unknown[];
      loaded?: boolean;
    };
  }
}

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || "1310247706331944";

export function initMetaPixel() {
  if (typeof window === "undefined") return;

  if (!PIXEL_ID) return;

  const existingScript = document.getElementById("meta-pixel-script");
  if (!existingScript) {
    const script = document.createElement("script");
    script.id = "meta-pixel-script";
    script.async = true;
    script.defer = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      (window.fbq!.q = window.fbq!.q || []).push(args);
    } as NonNullable<typeof window.fbq>;

    fbq.q = [];
    window.fbq = fbq;
  }

  if (!window.fbq.loaded) {
    window.fbq("init", PIXEL_ID);
    window.fbq.loaded = true;
  }
}

export function trackMetaEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;
  if (!PIXEL_ID || !window.fbq) return;

  window.fbq("track", eventName, parameters ?? {});
}

export function trackMetaCustomEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;
  if (!PIXEL_ID || !window.fbq) return;

  window.fbq("trackCustom", eventName, parameters ?? {});
}
