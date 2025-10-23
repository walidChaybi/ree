import { CONFIG_PATCH_ACTION_TRANSFERT_REQUETES } from "@api/configurations/requete/actions/PatchActionTransfertRequetesConfigApi";
import { nettoyerAttributsDto } from "@model/commun/dtoUtils";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { useContext, useEffect, useState } from "react";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../utils/AfficherMessage";

export interface ITransfertRequetesParams {
  idService?: string;
  idUtilisateurAAssigner?: string;
  libelleAction: string;
  estTransfert: boolean;
  requetes: { id: string; statut: keyof typeof EStatutRequete }[];
}

export const useTransfertRequetesApi = (params?: ITransfertRequetesParams): { succesDuTransfert: boolean; transfertEnCours: boolean } => {
  const [succesDuTransfert, setSuccesDuTransfert] = useState<boolean>(false);
  const { utilisateurs } = useContext(RECEContextData);
  const { appelApi: patchTransfertRequetes, enAttenteDeReponseApi: transfertEnCours } = useFetchApi(CONFIG_PATCH_ACTION_TRANSFERT_REQUETES);

  useEffect(() => {
    if (!params?.idService && !params?.idUtilisateurAAssigner) return;

    setSuccesDuTransfert(false);
    patchTransfertRequetes({
      parametres: nettoyerAttributsDto({
        body: {
          requetes: params.requetes,
          idService:
            params.idService ?? utilisateurs.find(utilisateur => utilisateur.id === params.idUtilisateurAAssigner)?.idService ?? "",
          idUtilisateurAAssigner: params.idUtilisateurAAssigner,
          libelleAction: params.libelleAction,
          attribuer: !params.estTransfert
        }
      }),
      apresSucces: () => setSuccesDuTransfert(true),
      apresErreur: erreurs =>
        AfficherMessage.erreur(params.estTransfert ? "Impossible de transférer la requête" : "Impossible d'attribuer la requête", {
          erreurs
        })
    });
  }, [params]);

  return { succesDuTransfert, transfertEnCours };
};
