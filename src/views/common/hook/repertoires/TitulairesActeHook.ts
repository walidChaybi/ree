import CONFIG_GET_TITULAIRES_ACTE from "@api/configurations/etatCivil/acte/GetTitulairesActeConfigApi";
import { TitulaireActe } from "@model/etatcivil/acte/TitulaireActe";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../utils/AfficherMessage";

export interface IGetTitulairesActeHookParams {
  idActe: string;
  isChecked: boolean;
}

export const useGetTitulairesActeApiHook = (parameters?: IGetTitulairesActeHookParams) => {
  const [titulaires, setTitulaires] = useState<TitulaireActe[] | null>(null);

  const { appelApi: recupererTitulaires } = useFetchApi(CONFIG_GET_TITULAIRES_ACTE);

  useEffect(() => {
    if (!parameters?.idActe || !parameters?.isChecked) return;

    recupererTitulaires({
      parametres: { path: { idActe: parameters.idActe } },
      apresSucces: titulairesDto =>
        setTitulaires(titulairesDto.map(TitulaireActe.depuisDto).filter((titulaire): titulaire is TitulaireActe => titulaire !== null)),
      apresErreur: erreurs => AfficherMessage.erreur("Impossible de récupérer les titulaires associés à l'acte", { erreurs })
    });
  }, [parameters]);

  return titulaires;
};
