"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getMyProfile } from "@/client/service/user-service";

type Role = "ADMIN" | "SUPERADMIN" | "VOLUNTEER";

type CurrentUserCache = {
  user: {
    role: string;
  } | null;
};

interface RoleGuardProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  redirectTo?: string;
}

const RoleGuard = ({
  allowedRoles,
  children,
  redirectTo = "/login",
}: RoleGuardProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<CurrentUserCache>([
    "currentUser",
  ]);
  const [resolvedRole, setResolvedRole] = useState<string | undefined>(
    currentUser?.user?.role,
  );
  const [isChecking, setIsChecking] = useState<boolean>(!currentUser?.user);

  const normalizeRole = (value: string) =>
    value
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .replace(/[\s_-]/g, "")
      .toUpperCase();

  useEffect(() => {
    const roleFromCache = currentUser?.user?.role;
    if (roleFromCache) {
      setResolvedRole(roleFromCache);
      setIsChecking(false);
      return;
    }

    let disposed = false;

    const loadCurrentUser = async () => {
      try {
        const me = await getMyProfile();

        if (disposed) return;

        setResolvedRole(me.role);
        queryClient.setQueryData(["currentUser"], {
          user: { role: me.role },
        });
      } catch {
        if (disposed) return;
        setResolvedRole(undefined);
      } finally {
        if (!disposed) {
          setIsChecking(false);
        }
      }
    };

    void loadCurrentUser();

    return () => {
      disposed = true;
    };
  }, [currentUser?.user?.role, queryClient]);

  const normalizedRole = resolvedRole ? normalizeRole(resolvedRole) : undefined;
  const normalizedAllowedRoles = allowedRoles.map((role) =>
    normalizeRole(role),
  );
  const isAllowed = Boolean(
    normalizedRole && normalizedAllowedRoles.includes(normalizedRole),
  );

  useEffect(() => {
    if (!isChecking && !isAllowed) {
      router.replace(redirectTo);
    }
  }, [isAllowed, isChecking, redirectTo, router]);

  if (isChecking || !isAllowed) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;
