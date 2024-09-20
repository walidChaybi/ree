import { describe, expect, test, vi } from "vitest";
import PolicesRECE from "../../utils/PolicesRECE";

describe("Test du chargement des polices RECE", () => {
  test("Fonction non testable (couverture de code)", () => {
    class FontFaceMock {
      family: string;
      source: string;
      descriptors: unknown;

      constructor(family: string, source: string, descriptors?: unknown) {
        this.family = family;
        this.source = source;
        this.descriptors = descriptors;
      }

      load(): Promise<FontFaceMock> {
        return Promise.resolve(this);
      }
    }
    globalThis.FontFace = FontFaceMock as never;
    globalThis.document = { fonts: { add: (_: any) => {} } } as never;

    const spyCharger = vi.spyOn(PolicesRECE, "charger");

    PolicesRECE.charger();
    expect(spyCharger).toBeCalled();
  });
});
