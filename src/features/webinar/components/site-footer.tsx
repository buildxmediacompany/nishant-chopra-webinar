import { Mail, Phone } from "lucide-react";

export function SiteFooter({
  supportEmail,
  supportPhone,
  footerText,
}: {
  supportEmail?: string | null;
  supportPhone?: string | null;
  footerText?: string | null;
}) {
  return (
    <footer className="bg-stage px-4 pb-24 pt-12 sm:pb-12">
      {/* Hairline divider — consistent with the top bar's fading rule. */}
      <div className="mx-auto mb-10 h-px max-w-6xl bg-gradient-to-r from-transparent via-stage-line to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        {(supportEmail || supportPhone) && (
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
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
        <p className="font-body text-xs text-cream-faint">
          {footerText ?? `© ${new Date().getFullYear()} All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}
