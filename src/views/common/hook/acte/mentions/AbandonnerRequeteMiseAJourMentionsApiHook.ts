import { modifierStatutRequeteMiseAJourMentions } from "@api/appels/requeteApi";
import { IEtatTraitementApi } from "@model/requete/IEtatTraitementApi";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export function useModifierStatutRequeteMajMentionsApiHook(
  idRequete: string | undefined,
  statutDemande: StatutRequete
) {
  const [resultat, setResultat] = useState<IEtatTraitementApi>({
    termine: false
  });

  useEffect(() => {
    if (idRequete && statutDemande) {
      modifierStatutRequeteMiseAJourMentions(idRequete, statutDemande)
        .then(() => {
          setResultat({ termine: true });
        })
        .catch(error => {
          setResultat({ termine: true, erreur: error });
          logError({
            messageUtilisateur:
              "Impossible de mettre à jour le statut de la requête",
            error
          });
        });
    }
  }, [idRequete, statutDemande]);

  return resultat;
}
