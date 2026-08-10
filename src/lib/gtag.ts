export const GA_ADS_ID = "AW-18379283575";
export const GA_ADS_CONVERSION_SEND_TO =
  "AW-18379283575/RMQdCPDdxd4cEPe49rtE";

/** Fire Google Ads conversion event (contact form success). */
export function trackAdsConversion() {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "conversion", {
    send_to: GA_ADS_CONVERSION_SEND_TO,
  });
}
