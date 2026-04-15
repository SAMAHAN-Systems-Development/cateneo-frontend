import AdminNavigationBar from "@/components/ui/admin-navigation-bar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cateneo-white">
      <AdminNavigationBar />
      {/* Page content */}
      <div className="relative">{children}</div>
    </div>
  );
}
