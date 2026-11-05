import { describe, it, expect } from "vitest";
import { emi } from "@/data/cars";
describe("emi", () => {
  it("10L at 9.5% over 60 months ≈ ₹21,002", () => expect(Math.round(emi(1000000, 9.5, 60))).toBe(21002));
  it("zero interest splits evenly", () => expect(emi(120000, 0, 12)).toBe(10000));
});
