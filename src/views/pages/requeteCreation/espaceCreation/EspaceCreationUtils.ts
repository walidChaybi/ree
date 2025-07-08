import { NavigationApercuReqCreationParams } from "@hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
import { ICreationActionMiseAjourStatutEtRedirectionParams } from "@hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { ESousTypeCreation, SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { URL_MES_REQUETES_CREATION } from "@router/ReceUrls";
import { autorisePrendreEnChargeReqTableauCreation } from "@util/RequetesUtils";
import { setParamsUseApercuCreation } from "../commun/requeteCreationUtils";

export function getOnClickSurLigneTableauEspaceCreation(
  setOperationEnCours: React.Dispatch<React.SetStateAction<boolean>>,
  setParamsMiseAJour: React.Dispatch<React.SetStateAction<ICreationActionMiseAjourStatutEtRedirectionParams | undefined>>,
  setParamsCreation: React.Dispatch<React.SetStateAction<NavigationApercuReqCreationParams | undefined>>,
  utilisateurConnecte: UtilisateurConnecte
) {
  return (idRequete: string, data: IRequeteTableauCreation[], idx: number) => {
    setOperationEnCours(true);
    const requeteSelect = data[idx];
    if (autorisePrendreEnChargeReqTableauCreation(requeteSelect, utilisateurConnecte)) {
      setParamsMiseAJour({
        libelleAction: EStatutRequete.PRISE_EN_CHARGE,
        statutRequete: "PRISE_EN_CHARGE",
        requete: requeteSelect,
        urlCourante: URL_MES_REQUETES_CREATION,
        typeRequete: "CREATION"
      });
    } else {
      setParamsUseApercuCreation(
        idRequete,
        setParamsCreation,
        SousTypeCreation.getEnumFromLibelleCourt(requeteSelect.sousType).nom as keyof typeof ESousTypeCreation,
        StatutRequete.getEnumFromLibelle(requeteSelect.statut).nom as keyof typeof EStatutRequete,
        requeteSelect.idUtilisateur
      );
    }
  };
}
