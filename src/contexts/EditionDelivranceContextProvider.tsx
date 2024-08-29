import { getInformationsFicheActe } from "@api/appels/etatcivilApi";
import { getDetailRequete } from "@api/appels/requeteApi";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import React, { useEffect, useMemo, useState } from "react";
import PageChargeur from "../composants/commun/chargeurs/PageChargeur";

interface IEditionDelivranceContext {
  requete: IRequeteDelivrance;
  acte: IFicheActe | null;
  rechargerRequete: () => void;
}

export const EditionDelivranceContext =
  React.createContext<IEditionDelivranceContext>(
    {} as IEditionDelivranceContext
  );

const EditionDelivranceContextProvider: React.FC<
  React.PropsWithChildren<{
    idRequeteParam: string;
    idActeParam: string | undefined;
  }>
> = ({ idRequeteParam, idActeParam, children }) => {
  const [requete, setRequete] = useState<IRequeteDelivrance>();
  const [acte, setActe] = useState<IFicheActe | null>();
  const [doitChargerRequete, setDoitChargerRequete] = useState<boolean>(true);
  const valeursContext = useMemo(
    () => ({
      requete: requete ?? ({} as IRequeteDelivrance),
      acte: acte ?? null,
      rechargerRequete: () => setDoitChargerRequete(true)
    }),
    [requete, acte]
  );

  /** Remplacer par UseFetch */
  const [enRecuperation, setEnRecuperation] = useState<boolean>(false);
  useEffect(() => {
    if (enRecuperation || !doitChargerRequete) {
      return;
    }

    setDoitChargerRequete(false);
    setEnRecuperation(true);
    getDetailRequete(idRequeteParam)
      .then(res => setRequete(mappingRequeteDelivrance(res.body.data)))
      .finally(() => setEnRecuperation(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idRequeteParam, doitChargerRequete]);
  /**FIN Remplacer par UseFetch */

  /** Remplacer par UseFetch */
  const [enRecuperationActe, setEnRecuperationActe] = useState<boolean>(false);
  useEffect(() => {
    if (enRecuperationActe || !requete) {
      return;
    }

    let idActe =
      idActeParam ??
      requete?.documentsReponses.find(documentReponse => documentReponse.idActe)
        ?.idActe;
    if (!idActe) {
      setActe(null);

      return;
    }

    setEnRecuperationActe(true);
    getInformationsFicheActe(idActe)
      .then(data => setActe(mapActe(data.body.data)))
      .finally(() => setEnRecuperationActe(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idActeParam, requete]);
  /**FIN Remplacer par UseFetch */

  return (
    <EditionDelivranceContext.Provider value={valeursContext}>
      {(enRecuperation || enRecuperationActe) && <PageChargeur />}
      {requete && acte !== undefined && children}
    </EditionDelivranceContext.Provider>
  );
};

export default EditionDelivranceContextProvider;
