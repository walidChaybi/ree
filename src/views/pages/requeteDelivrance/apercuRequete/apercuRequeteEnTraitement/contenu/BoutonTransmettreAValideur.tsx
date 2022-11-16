import {
  ITransmettreAValideurParams,
  useTransmettreAValideurApiHook
} from "@hook/requete/TransmettreAValideur";
import { receUrl } from "@router/ReceUrls";
import { getUrlPrecedente } from "@util/route/routeUtil";
import { Option } from "@util/Type";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listeValideurToOptions } from "../../../../../common/composant/menuTransfert/MenuTransfertUtil";
import { TransfertPopin } from "../../../../../common/composant/menuTransfert/TransfertPopin";
import { storeRece } from "../../../../../common/util/storeRece";
import { getLibelle } from "../../../../../common/util/Utils";

interface BoutonTransmettreAValideurProps {
  idRequete: string;
}

export const BoutonTransmettreAValideur: React.FC<
  BoutonTransmettreAValideurProps
> = props => {
  const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();
  const [params, setParams] = useState<ITransmettreAValideurParams>();

  const onValidate = useCallback(
    (optionUtilisateur?: Option, texte?: string) => {
      if (optionUtilisateur) {
        const texteObservation = ` - ${texte}`;
        setParams({
          libelleAction: getLibelle("Requête transmise"),
          texteObservation: `${getLibelle("Requête transmise")}${
            texte ?? texteObservation
          }`,
          requeteId: props.idRequete,
          idUtilisateur: optionUtilisateur.value
        });
      }
    },
    [props.idRequete]
  );

  const idAction = useTransmettreAValideurApiHook(params);

  useEffect(() => {
    if (idAction) {
      receUrl.replaceUrl(history, getUrlPrecedente(history.location.pathname));
    }
  }, [idAction, history]);

  return (
    <>
      <Bouton onClick={() => setOpen(true)}>
        {getLibelle("Transmettre à valideur")}
      </Bouton>{" "}
      <TransfertPopin
        onValidate={(optionUtilisateur?: Option, texte?: string) =>
          onValidate(optionUtilisateur, texte)
        }
        open={open}
        onClose={() => setOpen(false)}
        options={listeValideurToOptions(
          storeRece.utilisateurCourant?.idUtilisateur
        )}
        titre={getLibelle("Transmettre à valideur")}
        zoneTexte={true}
      />
    </>
  );
};
