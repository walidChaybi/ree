import { getInformationsFiche } from "@api/appels/etatcivilApi";
import { TFiche, mapActe, mapRcRca } from "@hook/repertoires/MappingRepertoires";
import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export function useFichePageApiHook(actualisationInfosFiche: boolean, typeFiche?: ETypeFiche, identifiant?: string) {
  const [fiche, setFiche] = useState<TFiche | null>(null);
  useEffect(() => {
    if (identifiant != null && typeFiche != null) {
      getInformationsFiche(typeFiche, identifiant)
        .then((result: any) => {
          switch (typeFiche) {
            case ETypeFiche.RC:
            case ETypeFiche.RCA:
              const ficheRcRca = mapRcRca(result.body.data);
              if (ficheRcRca !== null) {
                setFiche(ficheRcRca);
              }

              break;

            case ETypeFiche.PACS:
              const fichePacs = FichePacs.depuisDto(result.body.data);
              if (fichePacs !== null) {
                setFiche(fichePacs);
              }
              break;

            case ETypeFiche.ACTE:
              setFiche(mapActe(result.body.data));
              break;

            default:
              break;
          }
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Impossible de récupérer les informations de la fiche", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        });
    }
  }, [typeFiche, identifiant, actualisationInfosFiche]);

  return {
    fiche
  };
}
