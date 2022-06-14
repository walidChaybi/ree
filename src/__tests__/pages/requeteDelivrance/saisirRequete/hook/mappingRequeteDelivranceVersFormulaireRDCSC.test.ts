import requeteDelivrance, {
  requeteDelivranceInstitutionnel
} from "../../../../../mock/data/requeteDelivrance";
import { mappingRequeteDelivranceVersFormulaireRDCSC } from "../../../../../views/pages/requeteDelivrance/saisirRequete/hook/mappingRequeteDelivranceVersFormulaireRDCSC";

test("test du mapping Particulier", () => {
  const res = mappingRequeteDelivranceVersFormulaireRDCSC(requeteDelivrance);
  expect(res).toStrictEqual({
    document: "",
    titulaires: {
      titulaire1: {
        noms: {
          nomNaissance: "Prodesk",
          nomUsage: ""
        },
        prenoms: { prenom1: "Elodie", prenom2: "", prenom3: "" },
        sexe: "FEMININ",
        naissance: {
          dateEvenement: {
            annee: 1990,
            jour: 25,
            mois: 6
          },
          villeEvenement: "Barcelone",
          paysEvenement: "Espagne"
        },
        nationalite: "ETRANGERE"
      },
      titulaire2: {
        nomNaissance: "",
        nomUsage: "",
        prenoms: { prenom1: "", prenom2: "", prenom3: "" },
        sexe: "",
        naissance: {
          dateEvenement: {
            annee: "",
            jour: "",
            mois: ""
          },
          villeEvenement: "",
          paysEvenement: ""
        },
        nationalite: ""
      }
    },
    requerant: {
      typeRequerant: "PARTICULIER",
      mandataire: {
        type: "",
        nature: "",
        raisonSociale: "",
        nom: "",
        prenom: ""
      },
      institutionnel: {
        type: "",
        nature: "",
        nomInstitution: "",
        nom: "",
        prenom: ""
      },
      particulier: { nomNaissance: "RUIZ", nomUsage: "", prenom: "Paul" }
    },
    adresse: {
      voie: "61 avenue Foch",
      lieuDit: "lieu dit la martinière",
      complementDestinataire: "Appartement 258",
      complementPointGeo: "Batiment Z",
      codePostal: "310 GL24",
      commune: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      pays: "France",
      adresseCourriel: "ldubois@wanadoo.fr",
      numeroTelephone: ""
    },
    piecesJointes: [
      {
        base64File: {
          fileName: "Jérome",
          base64String: "",
          taille: 0,
          conteneurSwift: undefined,
          identifiantSwift: undefined,
          mimeType: "",
          extension: undefined
        },
        type: { value: "", str: "Carte professionnelle" }
      }
    ]
  });
});

test("test du mapping Institutionnel", () => {
  const res = mappingRequeteDelivranceVersFormulaireRDCSC(
    requeteDelivranceInstitutionnel
  );
  expect(res).toStrictEqual({
    document: "",
    titulaires: {
      titulaire1: {
        noms: {
          nomNaissance: "Prodesk",
          nomUsage: ""
        },
        prenoms: { prenom1: "Elodie", prenom2: "", prenom3: "" },
        sexe: "FEMININ",
        naissance: {
          dateEvenement: {
            annee: 1990,
            jour: 25,
            mois: 6
          },
          villeEvenement: "Barcelone",
          paysEvenement: "Espagne"
        },
        nationalite: "ETRANGERE"
      },
      titulaire2: {
        nomNaissance: "",
        nomUsage: "",
        prenoms: { prenom1: "", prenom2: "", prenom3: "" },
        sexe: "",
        naissance: {
          dateEvenement: {
            annee: "",
            jour: "",
            mois: ""
          },
          villeEvenement: "",
          paysEvenement: ""
        },
        nationalite: ""
      }
    },
    requerant: {
      typeRequerant: "INSTITUTIONNEL",
      mandataire: {
        type: "",
        nature: "",
        raisonSociale: "",
        nom: "",
        prenom: ""
      },
      institutionnel: {
        type: "AMBASSADE",
        nature: "",
        nomInstitution: "Ambassade du Rwanda",
        nom: "Ruiz",
        prenom: "Paul"
      },
      particulier: { nomNaissance: "", nomUsage: "", prenom: "" }
    },
    adresse: {
      voie: "61 avenue Foch",
      lieuDit: "lieu dit la martinière",
      complementDestinataire: "Appartement 258",
      complementPointGeo: "Batiment Z",
      codePostal: "310 GL24",
      commune: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      pays: "Rwanda",
      adresseCourriel: "ldubois@wanadoo.fr",
      numeroTelephone: ""
    },
    piecesJointes: [
      {
        base64File: {
          fileName: "Jérome",
          base64String: "",
          taille: 0,
          conteneurSwift: undefined,
          identifiantSwift: undefined,
          mimeType: "",
          extension: undefined
        },
        type: { value: "", str: undefined }
      }
    ]
  });
});
