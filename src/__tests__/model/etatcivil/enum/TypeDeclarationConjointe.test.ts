import { TypeDeclarationConjointe } from "@model/etatcivil/enum/TypeDeclarationConjointe";
import { premiereLettreEnMajuscule } from "@util/Utils";

test("Attendu: getAllEnumsAsOptions de TypeDeclarationConjointe fonctionne correctement", () => {
  expect(
    TypeDeclarationConjointe.getAllEnumsAsOptions(
      TypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE
    )
  ).toEqual([
    {
      cle: "ABSENCE_DECLARATION_VALIDEE",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE.libelle
      )
    }
  ]);

  expect(
    TypeDeclarationConjointe.getAllEnumsAsOptions(
      TypeDeclarationConjointe.ABSENCE_DECLARATION
    )
  ).toEqual([
    {
      cle: "INDETERMINE",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.INDETERMINE.libelle
      )
    },
    {
      cle: "CHANGEMENT_NOM",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.CHANGEMENT_NOM.libelle
      )
    },

    {
      cle: "CHOIX_NOM",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.CHOIX_NOM.libelle
      )
    },
    {
      cle: "ADJONCTION_NOM",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.ADJONCTION_NOM.libelle
      )
    },
    {
      cle: "ABSENCE_DECLARATION",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.ABSENCE_DECLARATION.libelle
      )
    }
  ]);

  expect(
    TypeDeclarationConjointe.getAllEnumsAsOptions(
      TypeDeclarationConjointe.ADJONCTION_NOM
    )
  ).toEqual([
    {
      cle: "INDETERMINE",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.INDETERMINE.libelle
      )
    },
    {
      cle: "CHANGEMENT_NOM",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.CHANGEMENT_NOM.libelle
      )
    },

    {
      cle: "CHOIX_NOM",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.CHOIX_NOM.libelle
      )
    },
    {
      cle: "ADJONCTION_NOM",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.ADJONCTION_NOM.libelle
      )
    }
  ]);

  expect(TypeDeclarationConjointe.getAllEnumsAsOptions()).toEqual([
    {
      cle: "INDETERMINE",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.INDETERMINE.libelle
      )
    },
    {
      cle: "CHANGEMENT_NOM",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.CHANGEMENT_NOM.libelle
      )
    },

    {
      cle: "CHOIX_NOM",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.CHOIX_NOM.libelle
      )
    },
    {
      cle: "ADJONCTION_NOM",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.ADJONCTION_NOM.libelle
      )
    },
    {
      cle: "ABSENCE_DECLARATION",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.ABSENCE_DECLARATION.libelle
      )
    },
    {
      cle: "ABSENCE_DECLARATION_VALIDEE",
      libelle: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE.libelle
      )
    }
  ]);
});
