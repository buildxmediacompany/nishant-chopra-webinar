import { AdminPageHeader } from "@/features/admin/components/page-header";
import { getSiteSettings } from "@/features/admin/settings/queries";
import { updateSettingsAction } from "@/features/admin/settings/actions";
import { SettingsForm } from "@/features/admin/settings/settings-form";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader title="Settings" description="Site-wide fallback values." />
      <SettingsForm settings={settings} onSubmit={updateSettingsAction} />
    </div>
  );
}
