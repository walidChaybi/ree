import { ParentFormDefaultValues } from "@composant/formulaire/ParentForm";
import { mappingRequeteDelivranceVersFormulaireRDCSC } from "@pages/requeteDelivrance/saisirRequete/hook/mappingRequeteDelivranceVersFormulaireRDCSC";
import requeteDelivrance, {
  requeteDelivranceInstitutionnel
} from "../../../../../mock/data/requeteDelivrance";

test("test du mapping Particulier", () => {
  const res = mappingRequeteDelivranceVersFormulaireRDCSC(requeteDelivrance);
  expect(res).toStrictEqual({
    document: "9a51eeaa-df69-46bc-b03b-735eb84197f8",
    titulaires,
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
        type: { value: "00c885c9-2918-46fe-b743-798b1b90e5dd", str: "Carte professionnelle" }
      }
    ]
  });
});

test("test du mapping Institutionnel", () => {
  const res = mappingRequeteDelivranceVersFormulaireRDCSC(
    requeteDelivranceInstitutionnel
  );
  expect(res).toStrictEqual({
    document: "9a51eeaa-df69-46bc-b03b-735eb84197f8",
    titulaires,
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

const titulaires = {
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
    nationalite: "ETRANGERE",
    parent1: { ...ParentFormDefaultValues },
    parent2: { ...ParentFormDefaultValues }
  },
  titulaire2: {
    noms: {
      nomNaissance: "",
      nomUsage: ""
    },
    prenoms: { prenom1: "", prenom2: "", prenom3: "" },
    sexe: "INCONNU",
    naissance: {
      dateEvenement: {
        annee: "",
        jour: "",
        mois: ""
      },
      villeEvenement: "",
      paysEvenement: ""
    },
    nationalite: "ETRANGERE",
    parent1: { ...ParentFormDefaultValues },
    parent2: { ...ParentFormDefaultValues }
  }
};
