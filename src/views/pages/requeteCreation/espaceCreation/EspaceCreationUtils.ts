import { NavigationApercuReqCreationParams } from "@hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
import { ICreationActionMiseAjourStatutEtRmcAutoHookParams } from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { IOfficier } from "@model/agent/IOfficier";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { URL_MES_REQUETES_CREATION } from "@router/ReceUrls";
import { autorisePrendreEnChargeReqTableauCreation } from "@util/RequetesUtils";
import { setParamsUseApercuCreation } from "../commun/requeteCreationUtils";

export function getOnClickSurLigneTableauEspaceCreation(
  setOperationEnCours: React.Dispatch<React.SetStateAction<boolean>>,
  setParamsMiseAJour: React.Dispatch<
    React.SetStateAction<
      ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
    >
  >,
  setParamsCreation: React.Dispatch<
    React.SetStateAction<NavigationApercuReqCreationParams | undefined>
  >,
  utilisateurConnecte: IOfficier
) {
  return (idRequete: string, data: IRequeteTableauCreation[], idx: number) => {
    setOperationEnCours(true);
    const requeteSelect = data[idx];
    if (
      autorisePrendreEnChargeReqTableauCreation(
        requeteSelect,
        utilisateurConnecte
      )
    ) {
      setParamsMiseAJour({
        libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        requete: requeteSelect,
        urlCourante: URL_MES_REQUETES_CREATION,
        typeRequete: TypeRequete.CREATION
      });
    } else {
      setParamsUseApercuCreation(
        idRequete,
        setParamsCreation,
        requeteSelect.sousType,
        requeteSelect.statut,
        requeteSelect.idUtilisateur
      );
    }
  };
}
