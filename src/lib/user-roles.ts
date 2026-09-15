export const USER_ROLES = ["Volunteer", "SuperAdmin"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export function normalizeUserRole(value?: string): UserRole | undefined {
  switch (value?.trim().toUpperCase()) {
    case "VOLUNTEER":
      return "Volunteer";
    case "SUPERADMIN":
      return "SuperAdmin";
    default:
      return undefined;
  }
}

export function formatUserRole(value?: string): string {
  const role = normalizeUserRole(value);
  if (role === "SuperAdmin") return "Superadmin";
  return role ?? value ?? "-";
}
