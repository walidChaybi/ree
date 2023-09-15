import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";

test("Attendu: estTypeFamilleProjetActe de TypeFamille fonctionne correctement", () => {
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.AFF)).toBeTruthy();
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.OPT)).toBeTruthy();
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.PR)).toBeTruthy();
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.XDX)).toBeTruthy();

  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.ACQ)).toBeFalsy();
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.CSL)).toBeFalsy();
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.DEP)).toBeFalsy();
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.COL)).toBeFalsy();
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.AR2)).toBeFalsy();
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.AR3)).toBeFalsy();
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.OP2)).toBeFalsy();
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.OP3)).toBeFalsy();
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.JUG)).toBeFalsy();
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.MAR)).toBeFalsy();
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.CPN)).toBeFalsy();
  expect(TypeFamille.estTypeFamilleProjetActe(TypeFamille.PAC)).toBeFalsy();
});

test.each([
  {
    cle: "ACQ",
    libelle: "Acquisition de la nationalité française"
  },
  { cle: "CSL", libelle: "Acte consulaire" },
  { cle: "DEP", libelle: "Acte déposé dans un pays voisin" },
  { cle: "COL", libelle: "Acte issu d'anciennes colonies" },
  {
    cle: "AR2",
    libelle: "Acte reconstitué - Anciens territoires français (hors Algérie)"
  },
  { cle: "AR3", libelle: "Acte reconstitué – Algérie" },
  {
    cle: "OP2",
    libelle: "Actes d'optants à la nationalité (Afrique ou Indochine)"
  },
  {
    cle: "OP3",
    libelle: "Actes d'optants à la nationalité (Algérie)"
  },
  { cle: "JUG", libelle: "Transcription judiciaire" },
  { cle: "MAR", libelle: "Acte dressé en mer ou aux armées" },
  { cle: "CPN", libelle: "Changement de nom ou prénoms" },
  { cle: "AFF", libelle: "Dossier d'affaire" },
  { cle: "XDX", libelle: "Dossier pour acquisition" },
  { cle: "OPT", libelle: "Dossier d'optants" },
  { cle: "PR", libelle: "Pré-dossier" },
  {
    cle: "PAC",
    libelle: "Etranger ayant conclu un PACS en France"
  }
])(
  "DOIT afficher le libelle '$libelle' QUAND le clé de l'enum TypeFamille est '$cle'",
  async params => {
    expect(TypeFamille.getEnumFor(params.cle).libelle).toBe(params.libelle);
  }
);
