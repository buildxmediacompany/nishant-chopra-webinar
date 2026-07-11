import type { SVGProps } from "react";
import { Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Social profiles. lucide-react (v1) ships no brand glyphs, so the icons are
 * inline SVG below. Swap these placeholder URLs for the real handles.
 */
const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/", Icon: InstagramIcon },
  { label: "YouTube", href: "https://youtube.com/", Icon: YoutubeIcon },
  { label: "WhatsApp", href: "https://wa.me/", Icon: WhatsappIcon },
  { label: "Facebook", href: "https://facebook.com/", Icon: FacebookIcon },
] as const;

export function SiteFooter({
  siteName,
  supportEmail,
  supportPhone,
  footerText,
  registrationUrl,
}: {
  siteName?: string | null;
  supportEmail?: string | null;
  supportPhone?: string | null;
  footerText?: string | null;
  registrationUrl?: string | null;
}) {
  const brand = siteName?.trim() || "Nishant Chopra Live";

  return (
    <footer className="relative overflow-hidden bg-stage">
      {/* Curtain glow — a last warm wash of stage light bleeding up from the
          floor, echoing the marigold accent used across the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stage-line to-transparent"
      />

      {/* Last-call strip. Kept light on purpose — the ClosingCta glow card
          directly above carries the full conversion moment. */}
      {registrationUrl && (
        <div className="border-b border-stage-line bg-stage-raised/40">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-utility text-xs uppercase tracking-[0.22em] text-marigold">
                Last call
              </p>
              <p className="mt-1 font-display text-lg text-cream sm:text-xl">
                Not ready to leave? Grab your seat before it fills.
              </p>
            </div>
            <Button
              asChild
              variant="cta"
              size="lg"
              className="shrink-0 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(194,59,51,0.7)]"
            >
              <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
                Register Now
              </a>
            </Button>
          </div>
        </div>
      )}

      {/* Body — three columns on desktop, stacked and centered on mobile. */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-8 pt-12 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-3">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-2xl text-cream">{brand}</p>
          {/* Stage-light underline — the one signature flourish. */}
          <span className="mt-3 block h-px w-16 bg-gradient-to-r from-marigold to-transparent max-sm:mx-auto" />
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-cream-dim max-sm:mx-auto">
            Helping singers find their true voice — one note at a time.
          </p>
        </div>

        {/* Contact */}
        {(supportEmail || supportPhone) && (
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <p className="font-utility text-xs uppercase tracking-[0.22em] text-cream-faint">
              Support
            </p>
            {supportEmail && (
              <a
                href={`mailto:${supportEmail}`}
                className="inline-flex items-center gap-2 font-body text-sm text-cream-dim transition-colors hover:text-cream"
              >
                <Mail className="size-4 text-marigold" />
                {supportEmail}
              </a>
            )}
            {supportPhone && (
              <a
                href={`tel:${supportPhone}`}
                className="inline-flex items-center gap-2 font-body text-sm text-cream-dim transition-colors hover:text-cream"
              >
                <Phone className="size-4 text-marigold" />
                {supportPhone}
              </a>
            )}
          </div>
        )}

        {/* Follow */}
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <p className="font-utility text-xs uppercase tracking-[0.22em] text-cream-faint">
            Follow
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full border border-stage-line text-cream-dim transition-all hover:-translate-y-0.5 hover:border-marigold hover:text-marigold hover:shadow-[0_8px_20px_-8px_rgba(232,169,59,0.5)]"
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stage-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 pb-24 pt-6 text-center sm:flex-row sm:pb-6 sm:text-left">
          <p className="font-body text-xs text-cream-faint">
            {footerText ?? `© ${new Date().getFullYear()} All rights reserved.`}
          </p>
          <p className="font-utility text-xs uppercase tracking-[0.18em] text-cream-faint">
            Made in India · ♪
          </p>
        </div>
      </div>
    </footer>
  );
}

/* --- Inline brand glyphs (simple-icons paths, currentColor) --- */

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
