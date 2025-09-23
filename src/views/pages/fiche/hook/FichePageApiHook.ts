import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import { CONFIG_GET_FICHE_INSCRIPTION } from "@api/configurations/etatCivil/repertoireCivil/GetFicheInscription";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { FichePacs, IFichePacsDto } from "@model/etatcivil/pacs/FichePacs";
import { FicheRcRca, IFicheRcaDto, IFicheRcDto } from "@model/etatcivil/rcrca/FicheRcRca";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../utils/AfficherMessage";
import { TFiche } from "../FicheUtils";

export const useFichePageApiHook = (actualisationInfosFiche: boolean, typeFiche?: ETypeFiche, identifiant?: string) => {
  const [fiche, setFiche] = useState<TFiche | null>(null);

  const { appelApi: recupererFicheActe } = useFetchApi(CONFIG_GET_RESUME_ACTE);
  const { appelApi: recupererFicheInscription } = useFetchApi(CONFIG_GET_FICHE_INSCRIPTION);

  useEffect(() => {
    if (!identifiant || !typeFiche) return;

    if (typeFiche === ETypeFiche.ACTE) {
      recupererFicheActe({
        parametres: {
          path: { idActe: identifiant },
          query: { recupereImagesEtTexte: false, remplaceIdentiteTitulaireParIdentiteTitulaireAM: false }
        },
        apresSucces: ficheActeDto => setFiche(FicheActe.depuisDto(ficheActeDto)),
        apresErreur: erreurs => AfficherMessage.erreur("Impossible de récupérer les informations de la fiche acte", { erreurs })
      });
    } else {
      recupererFicheInscription({
        parametres: { path: { idFiche: identifiant, typeFiche: typeFiche.toLowerCase() } },
        apresSucces: ficheInscriptionDto => {
          switch (typeFiche) {
            case ETypeFiche.RC:
              setFiche(FicheRcRca.RcDepuisDto(ficheInscriptionDto as IFicheRcDto));
              break;

            case ETypeFiche.RCA:
              setFiche(FicheRcRca.RcaDepuisDto(ficheInscriptionDto as IFicheRcaDto));
              break;

            case ETypeFiche.PACS:
              setFiche(FichePacs.depuisDto(ficheInscriptionDto as IFichePacsDto));
              break;
          }
        },
        apresErreur: erreurs => AfficherMessage.erreur("Impossible de récupérer les informations de la fiche inscription", { erreurs })
      });
    }
  }, [typeFiche, identifiant, actualisationInfosFiche]);

  return fiche;
};
