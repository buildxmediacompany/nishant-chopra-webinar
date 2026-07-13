/**
 * Meta Pixel helper utilities.
 *
 * `fbq` is injected by the pixel snippet in layout.tsx — we reference it
 * through `window` so TypeScript doesn't complain and there's no hard
 * dependency on the script loading order.
 */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Fire a `Lead` event whenever any "Register Now" button is clicked.
 * Call this in the onClick handler of every CTA anchor/button.
 */
export function trackRegisterClick() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "InitiateCheckout");
  }
}
