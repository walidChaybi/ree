import { TAppelTraitement, TTraitementApi } from "@api/traitements/TTraitementApi";
import { logError } from "@util/LogManager";
import { useEffect, useMemo, useState } from "react";

type TInformationsTraitement<TReponseSucces, TParam> = {
  statut: "EN_ATTENTE_APPEL" | "EN_COURS" | "TERMINE";
  parametres: TParam | null;
  apresSucces: ((reponse: TReponseSucces) => void) | null;
  apresErreur: ((messageErreur?: string) => void) | null;
  finalement: (() => void) | null;
};

const useTraitementApi = <TParam extends object | undefined, TReponseSucces>(traitement: TTraitementApi<TParam, TReponseSucces>) => {
  const informationsDefaut = useMemo<TInformationsTraitement<TReponseSucces, TParam>>(
    () => ({ statut: "EN_ATTENTE_APPEL", parametres: null, apresSucces: null, apresErreur: null, finalement: null }),
    [traitement]
  );
  const [informationsTraitement, setInformationsTraitement] = useState<TInformationsTraitement<TReponseSucces, TParam>>({
    ...informationsDefaut
  });
  const { lancer, erreurTraitement, reponseTraitement } = traitement.Lancer(() =>
    setInformationsTraitement(prec => ({ ...prec, statut: "TERMINE" }))
  );

  const lancerTraitement = (appel?: TAppelTraitement<TParam, TReponseSucces>): void => {
    if (informationsTraitement.statut !== "EN_ATTENTE_APPEL") {
      return;
    }

    setInformationsTraitement({
      statut: "EN_COURS",
      parametres: appel?.parametres as TParam,
      apresSucces: appel?.apresSucces ?? null,
      apresErreur: appel?.apresErreur ?? null,
      finalement: appel?.finalement ?? null
    });
  };

  useEffect(() => {
    if (informationsTraitement.statut === "EN_COURS" && informationsTraitement.parametres !== null) {
      lancer(informationsTraitement.parametres);

      return;
    }

    if (informationsTraitement.statut !== "TERMINE") {
      return;
    }

    erreurTraitement.enEchec
      ? informationsTraitement?.apresErreur?.(erreurTraitement.message)
      : informationsTraitement?.apresSucces?.(reponseTraitement);
    informationsTraitement?.finalement?.();
    erreurTraitement.message && logError({ messageUtilisateur: erreurTraitement.message });
    setInformationsTraitement({ ...informationsDefaut });
  }, [informationsTraitement]);

  return {
    lancerTraitement: lancerTraitement,
    traitementEnCours: informationsTraitement.statut === "EN_COURS"
  };
};

export default useTraitementApi;
