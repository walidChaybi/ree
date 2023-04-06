import { getInformationsFiche } from "@api/appels/etatcivilApi";

test("etatcivil api getInformationsFiche", () => {
  getInformationsFiche("rc", "7566e16c-2b0e-11eb-adc1-0242ac120002").then(
    (result: any) => {
      expect(result).toBeDefined();
    }
  );
});


