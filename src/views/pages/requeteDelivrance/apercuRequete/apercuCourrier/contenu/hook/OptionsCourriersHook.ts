import { getOptionsCourriers } from "@api/appels/requeteApi";
import { OptionsCourrier } from "@model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../../../utils/AfficherMessage";
import { recupererLesOptionsDisponiblesPourLeCourrier } from "../contenuForm/sousFormulaires/GestionOptionsCourrier";

export const useOptionsCourriersApiHook = (
  documentDelivranceChoisi?: IDocumentDelivrance | null,
  requete?: IRequeteDelivrance
): OptionsCourrier => {
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
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de récupérer les options courrier", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        });
    }
  }, [documentDelivranceChoisi, requete?.evenement?.natureActe]);
  return optionsCourrierDisponibles;
};
