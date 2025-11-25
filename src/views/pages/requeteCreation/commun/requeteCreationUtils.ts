import { Requete } from "@model/requete/IRequete";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { ESousTypeCreation, SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { UN } from "@util/Utils";
import { NavigationApercuReqCreationParams } from "@views/common/hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";

export const setParamsUseApercuCreation = (
  idRequete: string,
  setParamsCreation: (params: NavigationApercuReqCreationParams) => void,
  sousType: keyof typeof ESousTypeCreation,
  statut: keyof typeof EStatutRequete,
  idUtilisateur?: string
) => {
  return setParamsCreation({
    idRequete: idRequete,
    sousType: sousType,
    statut: statut,
    idUtilisateur: idUtilisateur
  });
};

const getPostulantNationalite = (requete: IRequeteCreationEtablissement): ITitulaireRequeteCreation => {
  return Requete.getTitulaireAvecTypeObjet(requete, TypeObjetTitulaire.POSTULANT_NATIONALITE) as ITitulaireRequeteCreation;
};

const getTitulaireActeTranscritDresse = (requete: IRequeteCreationTranscription): ITitulaireRequeteCreation => {
  return Requete.getTitulaireAvecTypeObjetEnPosition(
    requete,
    TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE,
    UN
  ) as ITitulaireRequeteCreation;
};

export const getPostulantNationaliteOuTitulaireActeTranscritDresse = (
  requete?: IRequeteCreationTranscription | IRequeteCreationEtablissement
): ITitulaireRequeteCreation | undefined => {
  let postulantOuTitulaire;
  if (requete && (SousTypeCreation.estSousTypeTranscription(requete.sousType) || SousTypeCreation.estRCADC(requete.sousType))) {
    postulantOuTitulaire = getTitulaireActeTranscritDresse(requete);
  } else if (requete && SousTypeCreation.estRCEXROuRCEDXROuRCEDXC(requete.sousType)) {
    postulantOuTitulaire = getPostulantNationalite(requete);
  }
  return postulantOuTitulaire;
};
