import { getInformationsFiche } from "@api/appels/etatcivilApi";
import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { expect, test } from "vitest";

test("etatcivil api getInformationsFiche", () => {
  getInformationsFiche(ETypeFiche.RC, "7566e16c-2b0e-11eb-adc1-0242ac120002").then((result: any) => {
    expect(result).toBeDefined();
  });
});
