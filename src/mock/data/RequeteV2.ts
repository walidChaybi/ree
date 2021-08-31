import { SousTypeDelivrance } from "../../model/requete/v2/enum/SousTypeDelivrance";
import { StatutRequete } from "../../model/requete/v2/enum/StatutRequete";
import { TypeRequete } from "../../model/requete/v2/enum/TypeRequete";
import { IRequerant } from "../../model/requete/v2/IRequerant";
import { IRequeteDelivrance } from "../../model/requete/v2/IRequeteDelivrance";

const requerant: IRequerant = {
  id: "0ad81071-9733-47fb-9e46-d6cdbea1c6f3",
  dateCreation: new Date(),
  nomFamille: "Dubois",
  prenom: "Alice",
  courriel: "dubois.alice@gmail.com",
  telephone: "123456793",
  adresse: {
    id: "8ef11f43-caac-47d3-a28a-c4e1f1d29c77",
    ligne2: "Appartement 258",
    ligne3: "Batiment Z",
    ligne4: "61 avenue Foch",
    ligne5: "lieu dit la martinière",
    codePostal: "310 GL24",
    ville: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
    pays: "France"
  },
  //qualiteRequerant: {qualite : IQualite},
  //detailQualiteRece: null,
  // detailQualiteParticulier: {
  //   id: "0ae3fbca-7945-46f6-b2a4-aba889376259",
  //   nomUsage: "Briand"
  // },
  //detailQualiteMandataireHabilite: null,
  //detailQualiteInstitutionnel: null,
  //detailQualiteAutreProfessionnel: null,
  lienRequerant: undefined
} as IRequerant;

export const idRequete1 = "d19650ed-012b-41ec-b7be-9e6ea9101eaa";
export const requete1 = ({
  id: idRequete1,
  type: TypeRequete.DELIVRANCE,
  sousType: SousTypeDelivrance.RDCSC,
  statutCourant: {
    statut: StatutRequete.PRISE_EN_CHARGE
  },
  requerant: requerant,
  titulaires: [
    {
      id: "8ef12021-61df-421b-9b3d-ab6b4344df88",
      position: 1,
      nomNaissance: "Brown",
      nomUsage: "",
      anneeNaissance: 1993,
      moisNaissance: 10,
      jourNaissance: 14,
      villeNaissance: "Sydney",
      paysNaissance: "Australie",
      sexe: "MASCULIN",
      nationalite: "FRANCAISE",
      prenoms: [
        {
          id: "8ef12d35-0d01-4ed1-b026-0038f901a13e",
          numeroOrdre: 1,
          prenom: "Alphonse"
        }
      ],
      parentsTitulaire: []
    }
  ]
} as any) as IRequeteDelivrance;

export const requeteRDD = {
  type: TypeRequete.DELIVRANCE,
  sousType: SousTypeDelivrance.RDC,
  statutCourant: {
    statut: StatutRequete.PRISE_EN_CHARGE
  }
} as IRequeteDelivrance;
