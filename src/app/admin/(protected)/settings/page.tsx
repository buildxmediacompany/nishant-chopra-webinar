import { getSiteSettings } from "@/features/admin/settings/queries";
import { updateSettingsAction } from "@/features/admin/settings/actions";
import { SettingsForm } from "@/features/admin/settings/settings-form";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-cream">Settings</h1>
      <p className="mt-1 text-sm text-cream-dim">Site-wide fallback values.</p>
      <div className="mt-8">
        <SettingsForm settings={settings} onSubmit={updateSettingsAction} />
      </div>
    </div>
  );
}
