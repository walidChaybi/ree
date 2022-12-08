import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";

test("Attendu: estTypeFamilleProjetActe de TypeFamille fonctionne correctement", () => {
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.AFF)).toBeTruthy;
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.OPT)).toBeTruthy;
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.PR)).toBeTruthy;
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.XDX)).toBeTruthy;

  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.ACQ)).toBeFalsy;
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.CSL)).toBeFalsy;
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.DEP)).toBeFalsy;
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.COL)).toBeFalsy;
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.AR2)).toBeFalsy;
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.AR3)).toBeFalsy;
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.OP2)).toBeFalsy;
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.OP3)).toBeFalsy;
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.JUG)).toBeFalsy;
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.MAR)).toBeFalsy;
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.CPN)).toBeFalsy;
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.PAC)).toBeFalsy;
});
