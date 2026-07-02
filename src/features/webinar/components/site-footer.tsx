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
    <footer className="border-t border-stage-line px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center">
        {(supportEmail || supportPhone) && (
          <p className="font-body text-sm text-cream-dim">
            Need help? {supportEmail && <span>{supportEmail}</span>}
            {supportEmail && supportPhone && " · "}
            {supportPhone && <span>{supportPhone}</span>}
          </p>
        )}
        <p className="font-body text-xs text-cream-faint">
          {footerText ?? `© ${new Date().getFullYear()} All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}
