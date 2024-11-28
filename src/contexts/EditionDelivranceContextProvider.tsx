import { getInformationsFicheActe } from "@api/appels/etatcivilApi";
import { getDetailRequete } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import React, { useContext, useEffect, useMemo, useState } from "react";
import PageChargeur from "../composants/commun/chargeurs/PageChargeur";

interface IEditionDelivranceContext {
  requete: IRequeteDelivrance;
  acte: IFicheActe | null;
  rechargerRequete: (onRechargementTermine?: () => void) => void;
}

export const EditionDelivranceContext = React.createContext<IEditionDelivranceContext>({} as IEditionDelivranceContext);

const EditionDelivranceContextProvider: React.FC<
  React.PropsWithChildren<{
    idRequeteParam: string;
    idActeParam: string | undefined;
  }>
> = ({ idRequeteParam, idActeParam, children }) => {
  const { utilisateurs } = useContext(RECEContextData);
  const [requete, setRequete] = useState<IRequeteDelivrance>();
  const [acte, setActe] = useState<IFicheActe | null>();
  const [doitChargerRequete, setDoitChargerRequete] = useState<boolean>(true);
  const [onRechargementTermine, setOnRechargementTermine] = useState<(() => void) | undefined>();
  const valeursContext = useMemo(
    () => ({
      requete: requete ?? ({} as IRequeteDelivrance),
      acte: acte ?? null,
      rechargerRequete: (callbackOnRechargementTermine: (() => void) | undefined) => {
        setDoitChargerRequete(true);
        setOnRechargementTermine(callbackOnRechargementTermine);
      }
    }),
    [requete, acte]
  );

  //TOREFACTOR : passer en useFetch
  const [enRecuperation, setEnRecuperation] = useState<boolean>(false);
  useEffect(() => {
    if (enRecuperation || !doitChargerRequete || !idRequeteParam || !utilisateurs?.length) {
      setDoitChargerRequete(false);
      return;
    }

    setDoitChargerRequete(false);
    setEnRecuperation(true);
    //TOREFACTOR : remplacer par useFetch, et possiblement passer le onRechargementTermine dans le .finally du useFetch
    getDetailRequete(idRequeteParam)
      .then(res => setRequete(mappingRequeteDelivrance(res.body.data, utilisateurs)))
      .finally(() => {
        setEnRecuperation(false);
        onRechargementTermine?.();
      });
  }, [idRequeteParam, doitChargerRequete, utilisateurs]);

  //TOREFACTOR : passer en useFetch
  const [enRecuperationActe, setEnRecuperationActe] = useState<boolean>(false);
  useEffect(() => {
    if (enRecuperationActe || !requete) {
      return;
    }
    //
    let idActe = idActeParam ?? requete?.documentsReponses.find(documentReponse => documentReponse.idActe)?.idActe;

    if (!idActe) {
      setActe(null);

      return;
    }

    setEnRecuperationActe(true);
    //TOREFACTOR : remplacer par useFetch
    getInformationsFicheActe(idActe)
      .then(data => setActe(mapActe(data.body.data)))
      .finally(() => setEnRecuperationActe(false));
  }, [idActeParam, requete]);

  return (
    <EditionDelivranceContext.Provider value={valeursContext}>
      {(enRecuperation || enRecuperationActe) && <PageChargeur />}
      {requete && (acte || acte === null) && children}
    </EditionDelivranceContext.Provider>
  );
};

export default EditionDelivranceContextProvider;
