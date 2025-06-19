import { getPrendreEnChargeRequeteSuivante } from "@api/appels/requeteApi";
import { IErreurTraitementApi } from "@api/IErreurTraitementApi";
import { CodeErreurFonctionnelle } from "@model/requete/CodeErreurFonctionnelle";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

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
            erreur => erreur.code === CodeErreurFonctionnelle.FCT_AUCUNE_REQUETE_DISPONIBLE_A_PRENDRE_EN_CHARGE
          );
          if (erreurPlusDeRequeteDisponible) {
            setErreur(erreurPlusDeRequeteDisponible);
          } else {
            logError({
              messageUtilisateur: "Impossible de prendre en charge la requête suivante",
              error: response.body.errors
            });
          }
        });
    }
  }, [type, prendreEnCharge]);

  return { idRequete, erreur };
}
