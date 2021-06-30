import { SousTypeDelivrance } from "../../model/requete/v2/enum/SousTypeDelivrance";
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
    ligne2: "61 avenue Foch",
    ligne3: "Appartement 258",
    ligne4: "",
    ligne5: "",
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
export const requete1 = {
  id: idRequete1,
  type: TypeRequete.DELIVRANCE,
  sousType: SousTypeDelivrance.RDCSC,
  requerant
} as IRequeteDelivrance;
