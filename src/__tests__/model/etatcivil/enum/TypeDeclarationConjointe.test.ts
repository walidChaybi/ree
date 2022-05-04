import { TypeDeclarationConjointe } from "../../../../model/etatcivil/enum/TypeDeclarationConjointe";
import { premiereLettreEnMajuscule } from "../../../../views/common/util/Utils";

test("Attendu: getAllEnumsAsOptions de TypeDeclarationConjointe fonctionne correctement", () => {
  expect(
    TypeDeclarationConjointe.getAllEnumsAsOptions(
      TypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE
    )
  ).toEqual([
    {
      value: "ABSENCE_DECLARATION_VALIDEE",
      str: premiereLettreEnMajuscule(
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
      value: "INDETERMINE",
      str: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.INDETERMINE.libelle
      )
    },
    {
      value: "CHANGEMENT_NOM",
      str: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.CHANGEMENT_NOM.libelle
      )
    },

    {
      value: "CHOIX_NOM",
      str: premiereLettreEnMajuscule(TypeDeclarationConjointe.CHOIX_NOM.libelle)
    },
    {
      value: "ADJONCTION_NOM",
      str: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.ADJONCTION_NOM.libelle
      )
    },
    {
      value: "ABSENCE_DECLARATION",
      str: premiereLettreEnMajuscule(
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
      value: "INDETERMINE",
      str: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.INDETERMINE.libelle
      )
    },
    {
      value: "CHANGEMENT_NOM",
      str: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.CHANGEMENT_NOM.libelle
      )
    },

    {
      value: "CHOIX_NOM",
      str: premiereLettreEnMajuscule(TypeDeclarationConjointe.CHOIX_NOM.libelle)
    },
    {
      value: "ADJONCTION_NOM",
      str: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.ADJONCTION_NOM.libelle
      )
    }
  ]);

  expect(TypeDeclarationConjointe.getAllEnumsAsOptions()).toEqual([
    {
      value: "INDETERMINE",
      str: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.INDETERMINE.libelle
      )
    },
    {
      value: "CHANGEMENT_NOM",
      str: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.CHANGEMENT_NOM.libelle
      )
    },

    {
      value: "CHOIX_NOM",
      str: premiereLettreEnMajuscule(TypeDeclarationConjointe.CHOIX_NOM.libelle)
    },
    {
      value: "ADJONCTION_NOM",
      str: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.ADJONCTION_NOM.libelle
      )
    },
    {
      value: "ABSENCE_DECLARATION",
      str: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.ABSENCE_DECLARATION.libelle
      )
    },
    {
      value: "ABSENCE_DECLARATION_VALIDEE",
      str: premiereLettreEnMajuscule(
        TypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE.libelle
      )
    }
  ]);
});
