"use client";

import React from "react";

import { RoundedButton } from "@/components/ui/rounded-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  USER_ROLES,
  formatUserRole,
  normalizeUserRole,
  type UserRole,
} from "@/lib/user-roles";
import { cn } from "@/lib/utils";

export type EditRoleModalProps = {
  userName?: string;
  currentRole?: UserRole;
  selectedRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
};

export function EditRoleModal({
  userName = "this user",
  currentRole = "Volunteer",
  selectedRole = "Volunteer",
  onRoleChange = () => {},
  onConfirm = () => {},
  onCancel = () => {},
  className,
}: EditRoleModalProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-label={`Edit role for ${userName}`}
      onClick={onCancel}
      onKeyDown={(event) => {
        if (event.key === "Escape") onCancel();
      }}
      tabIndex={-1}
    >
      <div
        className="w-full max-w-2xl rounded-[2.5rem] bg-cateneo-white px-8 py-10 font-gaegu text-cateneo-black shadow-2xl sm:px-12 sm:py-12"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-center text-2xl leading-tight sm:text-3xl md:text-4xl">
          Edit user role
        </p>

        <p className="mt-4 text-center text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          {userName}
        </p>

        <div className="mt-8 rounded-[2rem] border border-cateneo-darkbrown/15 bg-cateneo-white p-5 shadow-sm">
          <label
            htmlFor="user-role-select"
            className="mb-2 block text-xl sm:text-2xl"
          >
            Role
          </label>
          <Select
            value={selectedRole}
            onValueChange={(value) => {
              const role = normalizeUserRole(value);
              if (role) onRoleChange(role);
            }}
          >
            <SelectTrigger
              id="user-role-select"
              autoFocus
              className="h-auto w-full rounded-2xl border-2 border-cateneo-darkbrown bg-cateneo-white px-4 py-3 font-gaegu text-xl text-cateneo-black focus-visible:border-cateneo-darkbrown focus-visible:ring-cateneo-darkbrown/20"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              className="z-[60] rounded-2xl border-cateneo-darkbrown/20 bg-cateneo-white font-gaegu text-cateneo-black"
              onEscapeKeyDown={(event) => event.stopPropagation()}
            >
              {USER_ROLES.map((role) => (
                <SelectItem
                  key={role}
                  value={role}
                  className="rounded-lg py-2 text-xl focus:bg-[#EEDCBE] focus:text-cateneo-darkbrown"
                >
                  {formatUserRole(role)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-3 text-lg text-cateneo-darkbrown/75">
            Current role: {formatUserRole(currentRole)}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <RoundedButton
            type="button"
            onClick={onConfirm}
            disabled={selectedRole === currentRole}
            variant="default"
            className="bg-success-five text-cateneo-white hover:bg-success-four focus-visible:ring-success-three"
          >
            Continue
          </RoundedButton>

          <RoundedButton
            type="button"
            onClick={onCancel}
            variant="default"
            className="bg-[#83271B] text-cateneo-white hover:bg-[#A33A2B] focus-visible:ring-cateneo-darkbrown"
          >
            Cancel
          </RoundedButton>
        </div>
      </div>
    </div>
  );
}
