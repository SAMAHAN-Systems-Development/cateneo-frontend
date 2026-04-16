import SuperAdminNavigationBar from "@/components/ui/superadmin-navigation-bar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cateneo-white">
      <SuperAdminNavigationBar />
      {/* Page content */}
      <div className="relative">{children}</div>
    </div>
  );
}
