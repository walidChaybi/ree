import { getOptionsCourriers } from "@api/appels/requeteApi";
import { OptionsCourrier } from "@model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { recupererLesOptionsDisponiblesPourLeCourrier } from "../contenuForm/sousFormulaires/GestionOptionsCourrier";

export function useOptionsCourriersApiHook(documentDelivranceChoisi?: DocumentDelivrance, requete?: IRequeteDelivrance): OptionsCourrier {
  const [optionsCourrierDisponibles, setOptionsCourrierDisponibles] = useState<OptionsCourrier>([]);

  useEffect(() => {
    if (documentDelivranceChoisi && requete) {
      getOptionsCourriers()
        .then(result => {
          const options = recupererLesOptionsDisponiblesPourLeCourrier(
            result.body.data,
            documentDelivranceChoisi,
            requete.evenement?.natureActe
          );
          options.sort((option1, option2) => option1.ordreEdition - option2.ordreEdition);
          setOptionsCourrierDisponibles(options);
        })
        .catch(error => {
          logError({
            messageUtilisateur: "Impossible de récupérer les options courrier",
            error
          });
        });
    }
  }, [documentDelivranceChoisi, requete?.evenement?.natureActe]);
  return optionsCourrierDisponibles;
}
