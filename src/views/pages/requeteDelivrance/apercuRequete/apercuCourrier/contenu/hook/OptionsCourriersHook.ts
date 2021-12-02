import { useEffect, useState } from "react";
import { getOptionsCourriers } from "../../../../../../../api/appels/requeteApi";
import { DocumentDelivrance } from "../../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { OptionsCourrier } from "../../../../../../../model/requete/v2/IOptionCourrier";
import { IRequeteDelivrance } from "../../../../../../../model/requete/v2/IRequeteDelivrance";
import { logError } from "../../../../../../common/util/LogManager";
import { recupererLesOptionsDisponiblesPourLeCourrier } from "../contenuForm/sousFormulaires/GestionOptionsCourrier";

export function useOptionsCourriersApiHook(
  documentDelivranceChoisi?: DocumentDelivrance,
  requete?: IRequeteDelivrance
) {
  const [
    optionsCourrierDisponibles,
    setOptionsCourrierDisponibles
  ] = useState<OptionsCourrier>([]);

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
  return {
    optionsCourrierDisponibles
  };
}
