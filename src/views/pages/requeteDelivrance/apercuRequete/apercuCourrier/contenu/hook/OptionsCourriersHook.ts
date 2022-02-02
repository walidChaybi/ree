import { useEffect, useState } from "react";
import { getOptionsCourriers } from "../../../../../../../api/appels/requeteApi";
import { DocumentDelivrance } from "../../../../../../../model/requete/enum/DocumentDelivrance";
import { OptionsCourrier } from "../../../../../../../model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "../../../../../../../model/requete/IRequeteDelivrance";
import { logError } from "../../../../../../common/util/LogManager";
import { recupererLesOptionsDisponiblesPourLeCourrier } from "../contenuForm/sousFormulaires/GestionOptionsCourrier";

export function useOptionsCourriersApiHook(
  documentDelivranceChoisi?: DocumentDelivrance,
  requete?: IRequeteDelivrance
): OptionsCourrier {
  const [optionsCourrierDisponibles, setOptionsCourrierDisponibles] =
    useState<OptionsCourrier>([]);

  useEffect(() => {
    if (documentDelivranceChoisi && requete) {
      getOptionsCourriers()
        .then(result => {
          const options = recupererLesOptionsDisponiblesPourLeCourrier(
            result.body.data,
            documentDelivranceChoisi,
            requete?.evenement?.natureActe
          );
          setOptionsCourrierDisponibles(options);
        })
        .catch(error => {
          logError({
            messageUtilisateur: "Impossible de récupérer les options courrier",
            error
          });
        });
    }
  }, [documentDelivranceChoisi, requete]);
  return optionsCourrierDisponibles;
}
