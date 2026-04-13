// import RoleGuard from "@/lib/role-guard";

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <RoleGuard allowedRoles={["VOLUNTEER"]} redirectTo="/login">
    <div className="relative min-h-screen overflow-x-hidden bg-cateneo-white">
      {/* Page content */}
      <div className="relative">{children}</div>
    </div>
    // </RoleGuard>
  );
}
