import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-session";
import { AdminShell } from "@/features/admin/components/admin-shell";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin/login");
  }

  return <AdminShell userName={session.user.name}>{children}</AdminShell>;
}
