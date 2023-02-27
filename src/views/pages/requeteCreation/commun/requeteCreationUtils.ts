import { NavigationApercuReqCreationParams } from "@hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { Requete } from "@model/requete/IRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { UN } from "@util/Utils";
import { IRequeteCreationEtablissement } from "./../../../../model/requete/IRequeteCreationEtablissement";
import { ITitulaireRequeteCreation } from "./../../../../model/requete/ITitulaireRequeteCreation";

export function setParamsUseApercuCreation(
  idRequete: string,
  setParamsCreation: (params: NavigationApercuReqCreationParams) => void,
  sousType: string,
  statut?: string,
  idUtilisateur?: string
) {
  const sousTypeRequete = SousTypeCreation.getEnumFromLibelleCourt(sousType);
  const statutRequete = StatutRequete.getEnumFromLibelle(statut);
  return setParamsCreation({
    idRequete: idRequete,
    sousType: sousTypeRequete,
    statut: statutRequete,
    idUtilisateur: idUtilisateur
  });
}

export interface OngletProps {
  titre: string;
  index: number;
  component: JSX.Element;
}

function getPostulantNationalite(
  requete: IRequeteCreationEtablissement
): ITitulaireRequeteCreation {
  return Requete.getTitulaireAvecTypeObjet(
    requete,
    TypeObjetTitulaire.POSTULANT_NATIONALITE
  ) as ITitulaireRequeteCreation;
}

function getTitulaireActeTranscritDresse(
  requete: IRequeteCreationTranscription
): ITitulaireRequeteCreation {
  return Requete.getTitulaireAvecTypeObjetEnPosition(
    requete,
    TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE,
    UN
  ) as ITitulaireRequeteCreation;
}

export function getPostulantNationaliteOuTitulaireActeTranscritDresse(
  requete?: IRequeteCreationTranscription | IRequeteCreationEtablissement
): ITitulaireRequeteCreation | undefined {
  let postulantOuTitulaire;
  if (
    requete &&
    (SousTypeCreation.estSousTypeTranscription(requete.sousType) ||
      SousTypeCreation.estRCADC(requete.sousType))
  ) {
    postulantOuTitulaire = getTitulaireActeTranscritDresse(requete);
  } else if (
    requete &&
    SousTypeCreation.estRCEXROuRCEDXROuRCEDXC(requete.sousType)
  ) {
    postulantOuTitulaire = getPostulantNationalite(requete);
  }
  return postulantOuTitulaire;
}
