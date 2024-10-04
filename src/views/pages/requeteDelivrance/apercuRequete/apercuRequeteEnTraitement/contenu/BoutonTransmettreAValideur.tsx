import { listeValideurToOptions } from "@composant/menuTransfert/MenuTransfertUtil";
import { TransfertPopin } from "@composant/menuTransfert/TransfertPopin";
import {
  ITransmettreAValideurParams,
  useTransmettreAValideurApiHook
} from "@hook/requete/TransmettreAValideur";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { Option } from "@util/Type";
import { getLibelle } from "@util/Utils";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface BoutonTransmettreAValideurProps {
  idRequete: string;
}

export const BoutonTransmettreAValideur: React.FC<
  BoutonTransmettreAValideurProps
> = props => {
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState<ITransmettreAValideurParams>();

  const onValidate = useCallback(
    (optionUtilisateur?: Option, texte?: string) => {
      if (optionUtilisateur) {
        const texteObservation = ` - ${texte}`;
        setParams({
          libelleAction: getLibelle("Requête transmise"),
          texteObservation: `${getLibelle("Requête transmise")}${
            texte ? texteObservation : ""
          }`,
          requeteId: props.idRequete,
          idUtilisateur: optionUtilisateur.cle
        });
      }
    },
    [props.idRequete]
  );

  const idAction = useTransmettreAValideurApiHook(params);

  useEffect(() => {
    if (idAction) {
      replaceUrl(navigate, getUrlPrecedente(location.pathname));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAction]);

  return (
    <>
      <BoutonDoubleSubmit onClick={() => setOpen(true)}>
        {getLibelle("Transmettre à valideur")}
      </BoutonDoubleSubmit>{" "}
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
        placeholder={getLibelle("Pour vérification")}
        libelleAvantTexte={getLibelle("Message pour valideur :")}
      />
    </>
  );
};
