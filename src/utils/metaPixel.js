/**
 * Meta Pixel & Analytics Event Tracker for NIMS Hospital Crowdfunding
 * Safely tracks standard and custom events without breaking if Pixel is not loaded or blocked by AdBlockers.
 */

export const trackMetaEvent = (eventName, params = {}, isCustom = false) => {
  try {
    if (typeof window !== 'undefined') {
      // 1. Meta / Facebook Pixel Tracker
      if (typeof window.fbq === 'function') {
        if (isCustom) {
          window.fbq('trackCustom', eventName, params);
        } else {
          window.fbq('track', eventName, params);
        }
        console.log(`[MetaPixel] Event tracked: ${eventName}`, params);
      } else {
        // Fallback or dev debug log
        console.debug(`[MetaPixel (Simulated)] ${eventName}:`, params);
      }

      // 2. Google Tag Manager / GA4 DataLayer integration
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: eventName,
          ...params
        });
      }
    }
  } catch (err) {
    console.warn('[Analytics] Meta Pixel track warning:', err.message);
  }
};

