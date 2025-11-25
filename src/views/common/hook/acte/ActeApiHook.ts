import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../utils/AfficherMessage";

export interface IActeApiHookParams {
  idActe?: string;
  recupereImagesEtTexte?: boolean;
  remplaceIdentiteTitulaireParIdentiteTitulaireAM?: boolean;
}

export const useInformationsActeApiHook = ({
  idActe,
  recupereImagesEtTexte,
  remplaceIdentiteTitulaireParIdentiteTitulaireAM
}: IActeApiHookParams): FicheActe | null => {
  const [acte, setActe] = useState<FicheActe | null>(null);

  const { appelApi: recupererActe } = useFetchApi(CONFIG_GET_RESUME_ACTE);

  useEffect(() => {
    if (!idActe) return;

    recupererActe({
      parametres: { path: { idActe: idActe }, query: { recupereImagesEtTexte, remplaceIdentiteTitulaireParIdentiteTitulaireAM } },
      apresSucces: acte => {
        setActe(FicheActe.depuisDto(acte));
      },
      apresErreur: erreurs =>
        AfficherMessage.erreur("Impossible de récupérer les informations de l'acte", {
          erreurs,
          fermetureAuto: true
        })
    });
  }, [idActe, recupereImagesEtTexte, remplaceIdentiteTitulaireParIdentiteTitulaireAM]);

  return acte;
};
