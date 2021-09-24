import { useEffect, useState } from "react";
import { getOptionsCourriers } from "../../../../../../api/appels/requeteApi";
import { DocumentDelivrance } from "../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { OptionsCourrier } from "../../../../../../model/requete/v2/IOptionCourrier";
import { logError } from "../../../../../common/util/LogManager";
import { recupererLesOptionsParDefautDuCourrier } from "../contenuForm/sousFormulaires/GestionOptionsCourrier";

export function useOptionsCourriersApiHook(
  documentDelivranceChoisi?: DocumentDelivrance
) {
  const [
    optionsCourrierPossible,
    setOptionsCourrierPossible
  ] = useState<OptionsCourrier>([]);

  useEffect(() => {
    if (documentDelivranceChoisi) {
      getOptionsCourriers()
        .then(result => {
          const options = recupererLesOptionsParDefautDuCourrier(
            result.body.data,
            documentDelivranceChoisi
          );
          setOptionsCourrierPossible(options);
        })
        .catch(error => {
          logError({
            messageUtilisateur: "Impossible de récupérer les options courrier",
            error
          });
        });
    }
  }, [documentDelivranceChoisi]);
  return {
    optionsCourrierPossible
  };
}
