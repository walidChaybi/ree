import requeteDelivrance, {
  requeteDelivranceInstitutionnel
} from "../../../../mock/data/requeteDelivrance";
import { TypeInstitutionnel } from "../../../../model/requete/v2/enum/TypeInstitutionnel";
import { mappingRequeteDelivranceVersFormulaireRDCSC } from "../../../../views/pages/saisirRequete/hook/mappingRequeteDelivranceVersFormulaireRDCSC";

test("test du mapping Particulier", () => {
  const res = mappingRequeteDelivranceVersFormulaireRDCSC(requeteDelivrance);
  expect(res).toStrictEqual({
    document: "",
    interesse: {
      nomFamille: "Prodesk",
      nomUsage: "",
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
      particulier: { nomFamille: "DUBOIS", nomUsage: "", prenom: "Léonard" }
    },
    adresse: {
      voie: "61 avenue Foch",
      lieuDit: "Appartement 258",
      complementDestinataire: "",
      complementPointGeo: "",
      codePostal: "310 GL24",
      commune: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      pays: "",
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
          identifiantSwift: undefined
        },
        type: { value: "", str: undefined }
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
    interesse: {
      nomFamille: "Prodesk",
      nomUsage: "",
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
        type: TypeInstitutionnel.AMBASSADE,
        nature: "",
        nomInstitution: "",
        nom: "DUBOIS",
        prenom: "Léonard"
      },
      particulier: { nomFamille: "", nomUsage: "", prenom: "" }
    },
    adresse: {
      voie: "61 avenue Foch",
      lieuDit: "Appartement 258",
      complementDestinataire: "",
      complementPointGeo: "",
      codePostal: "310 GL24",
      commune: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      pays: "",
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
          identifiantSwift: undefined
        },
        type: { value: "", str: undefined }
      }
    ]
  });
});
