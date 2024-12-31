import TRAITEMENT_CHARGER_REQUETE_ET_ACTE from "@api/traitements/requeteDelivrance/edition/TraitementChargerRequeteEtActe";
import { RECEContextData } from "@core/contexts/RECEContext";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import React, { useContext, useEffect, useMemo, useState } from "react";
import PageChargeur from "../composants/commun/chargeurs/PageChargeur";
import useTraitementApi from "../hooks/api/TraitementApiHook";

interface IRequeteActe {
  requete: IRequeteDelivrance;
  acte: IFicheActe | null;
}

interface IEditionDelivranceContext {
  requete: IRequeteDelivrance;
  acte: IFicheActe | null;
  rechargerRequete: (charger: "les-deux" | "requete" | "acte", onRechargementTermine?: () => void) => void;
}

export const EditionDelivranceContext = React.createContext<IEditionDelivranceContext>({} as IEditionDelivranceContext);

const EditionDelivranceContextProvider: React.FC<
  React.PropsWithChildren<{
    idRequeteParam: string;
    idActeParam: string | undefined;
  }>
> = ({ idRequeteParam, idActeParam, children }) => {
  const { utilisateurs } = useContext(RECEContextData);
  const [requeteActe, setRequeteActe] = useState<IRequeteActe | null>(null);
  const { lancerTraitement: lancerChargementRequeteActe, traitementEnCours: chargementRequeteActeEnCours } =
    useTraitementApi(TRAITEMENT_CHARGER_REQUETE_ET_ACTE);
  const valeursContext = useMemo(
    () => ({
      requete: requeteActe?.requete ?? ({} as IRequeteDelivrance),
      acte: requeteActe?.acte ?? null,
      rechargerRequete: (charger: "les-deux" | "requete" | "acte", callbackOnRechargementTermine?: () => void) => {
        lancerChargementRequeteActe({
          parametres: { idRequete: idRequeteParam, idActe: idActeParam, chargement: charger },
          apresSucces: resultat =>
            setRequeteActe(prec => ({
              ...(prec as IRequeteActe),
              ...(resultat.requete ? { requete: resultat.requete } : {}),
              ...(resultat.acte ? { acte: resultat.acte } : {})
            })),
          finalement: () => callbackOnRechargementTermine?.()
        });
      }
    }),
    [requeteActe]
  );

  useEffect(() => {
    if (requeteActe || !utilisateurs?.length) {
      return;
    }

    lancerChargementRequeteActe({
      parametres: { idRequete: idRequeteParam, idActe: idActeParam, chargement: "les-deux" },
      apresSucces: resultat => setRequeteActe({ requete: resultat.requete as IRequeteDelivrance, acte: resultat.acte })
    });
  }, [utilisateurs]);

  return (
    <EditionDelivranceContext.Provider value={valeursContext}>
      {chargementRequeteActeEnCours && <PageChargeur />}
      {requeteActe && children}
    </EditionDelivranceContext.Provider>
  );
};

export default EditionDelivranceContextProvider;
