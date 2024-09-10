import { getInformationsFiche } from "@api/appels/etatcivilApi";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { expect, test } from "vitest";

test("etatcivil api getInformationsFiche", () => {
  getInformationsFiche(
    TypeFiche.RC,
    "7566e16c-2b0e-11eb-adc1-0242ac120002"
  ).then((result: any) => {
    expect(result).toBeDefined();
  });
});


