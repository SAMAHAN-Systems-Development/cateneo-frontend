import { describe, it, expect } from "vitest";
import {
  editCatFormSchema,
  editCatFormDefaultValues,
} from "../schemas/edit-cat-form-schema";

const baseValues = {
  ...editCatFormDefaultValues,
  name: "Testy",
  adoptionStatus: "Available",
  location: "MEZZANINE_FLOOR",
  healthStatus: ["Neutered"],
  color: ["Black"],
  personality: "Friendly test cat",
};


describe("editCatFormSchema age/type consistency", () => {
  it("rejects a recent DOB paired with an adult type", () => {
    const result = editCatFormSchema.safeParse({
      ...baseValues,
      type: "CATenean",
      dateOfBirth: "2026-06-01", // under 1 year ago
    });
    expect(result.success).toBe(false);
  });

  it("accepts a recent DOB paired with KITTENean", () => {
    const result = editCatFormSchema.safeParse({
      ...baseValues,
      type: "KITTENean",
      dateOfBirth: "2026-06-01",
    });
    expect(result.success).toBe(true);
  });
});
