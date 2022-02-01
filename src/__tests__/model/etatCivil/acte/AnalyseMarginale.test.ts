import {
  AnalyseMarginale,
  IAnalyseMarginale
} from "../../../../model/etatcivil/acte/IAnalyseMarginale";

test("Atendu: getLaBonneAnalyseMarginale fonctionne correctement", () => {
  const am1 = {
    dateDebut: new Date(2020, 0, 1),
    dateFin: new Date(2021, 0, 1)
  } as IAnalyseMarginale;

  const am2 = {
    dateDebut: new Date(2021, 0, 2),
    dateFin: new Date(2022, 0, 1)
  } as IAnalyseMarginale;

  const am3 = {
    dateDebut: new Date(2022, 0, 2),
    dateFin: new Date(2030, 0, 1)
  } as IAnalyseMarginale;

  expect(AnalyseMarginale.getLaBonneAnalyseMarginale([am2, am3, am1])).toBe(
    am3
  );

  const am4 = {
    dateDebut: new Date(2022, 3, 1),
    dateFin: new Date(2022, 4, 1)
  } as IAnalyseMarginale;

  const am5 = {
    dateDebut: new Date(2022, 4, 2),
    dateFin: undefined
  } as IAnalyseMarginale;

  expect(AnalyseMarginale.getLaBonneAnalyseMarginale([am5, am4])).toBe(am5);
});
