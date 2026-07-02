import { WebinarForm } from "@/features/admin/webinars/webinar-form";
import { createWebinarAction } from "@/features/admin/webinars/actions";

export default function NewWebinarPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-semibold text-cream">New webinar</h1>
      <p className="mt-1 text-sm text-cream-dim">
        Fill this in, then mark it &quot;Live&quot; from the webinars list when it&apos;s ready to publish.
      </p>
      <div className="mt-8">
        <WebinarForm onSubmit={createWebinarAction} />
      </div>
    </div>
  );
}
