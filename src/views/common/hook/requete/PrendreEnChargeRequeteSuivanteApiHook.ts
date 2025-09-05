import { IErreurTraitementApi } from "@api/IErreurTraitementApi";
import { getPrendreEnChargeRequeteSuivante } from "@api/appels/requeteApi";
import { ECodeErreurFonctionnelle } from "@model/requete/ECodeErreurFonctionnelle";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { useEffect, useState } from "react";
import AfficherMessage from "../../../../utils/AfficherMessage";

interface IPrendreEnChargeRequeteSuivanteResultat {
  idRequete?: string;
  erreur?: IErreurTraitementApi;
}

export function usePrendreEnChargeRequeteSuivanteApiHook(
  type: TypeRequete,
  prendreEnCharge: boolean
): IPrendreEnChargeRequeteSuivanteResultat {
  const [idRequete, setIdRequete] = useState<string>();
  const [erreur, setErreur] = useState<IErreurTraitementApi>();

  useEffect(() => {
    if (prendreEnCharge && TypeRequete.estCreation(type)) {
      getPrendreEnChargeRequeteSuivante()
        .then(response => {
          setIdRequete(response.body.data);
        })
        .catch(({ response }) => {
          const erreurs: IErreurTraitementApi[] = response.body.errors;
          const erreurPlusDeRequeteDisponible = erreurs.find(
            erreur => erreur.code === ECodeErreurFonctionnelle.FCT_AUCUNE_REQUETE_DISPONIBLE_A_PRENDRE_EN_CHARGE
          );
          if (erreurPlusDeRequeteDisponible) {
            setErreur(erreurPlusDeRequeteDisponible);
          } else {
            AfficherMessage.erreur("Impossible de prendre en charge la requête suivante", {
              erreurs: response.body.errors,
              fermetureAuto: true
            });
          }
        });
    }
  }, [type, prendreEnCharge]);

  return { idRequete, erreur };
}
