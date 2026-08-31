import { describe, it, expect } from "vitest";
import {
  addCatFormSchema,
  addCatFormDefaultValues,
} from "../schemas/add-cat-form-schema";

const baseValues = {
  ...addCatFormDefaultValues,
  name: "Testy",
  motherCat: "1",
  fatherCat: "2",
  adoptionStatus: "Available",
  location: "MEZZANINE_FLOOR",
  vitamins: ["Nematocide"],
  healthStatus: ["Neutered"],
  color: ["Black"],
  personality: "Friendly test cat",
};


describe("addCatFormSchema age/type consistency", () => {
  it("rejects a recent DOB paired with an adult type", () => {
    const result = addCatFormSchema.safeParse({
      ...baseValues,
      type: "CATenean",
      dateOfBirth: "2026-06-01", // under 1 year ago
    });
    expect(result.success).toBe(false);
  });

  it("accepts a recent DOB paired with KITTENean", () => {
    const result = addCatFormSchema.safeParse({
      ...baseValues,
      type: "KITTENean",
      dateOfBirth: "2026-06-01",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an old DOB paired with KITTENean", () => {
    const result = addCatFormSchema.safeParse({
      ...baseValues,
      type: "KITTENean",
      dateOfBirth: "2015-01-01",
    });
    expect(result.success).toBe(false);
  });

  it("accepts an old DOB paired with CATenean", () => {
    const result = addCatFormSchema.safeParse({
      ...baseValues,
      type: "CATenean",
      dateOfBirth: "2015-01-01",
    });
    expect(result.success).toBe(true);
  });
});
