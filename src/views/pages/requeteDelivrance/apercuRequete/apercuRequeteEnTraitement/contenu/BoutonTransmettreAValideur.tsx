import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { getValideursVersOptions } from "@views/common/composant/menuTransfert/MenuTransfertUtil";
import { ITransfertPopinForm, TransfertPopin } from "@views/common/composant/menuTransfert/TransfertPopin";
import { ITransmettreAValideurParams, useTransmettreAValideurApiHook } from "@views/common/hook/requete/TransmettreAValideur";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { RECEContextData } from "../../../../../../contexts/RECEContextProvider";

interface BoutonTransmettreAValideurProps {
  idRequete: string;
}

export const BoutonTransmettreAValideur: React.FC<BoutonTransmettreAValideurProps> = props => {
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { utilisateurs, utilisateurConnecte } = useContext(RECEContextData);
  const [params, setParams] = useState<ITransmettreAValideurParams>();

  const onValidate = useCallback(
    (valeurs: ITransfertPopinForm) => {
      if (valeurs.optionChoisie) {
        const texteObservation = ` - ${valeurs.texte}`;
        setParams({
          libelleAction: "Requête transmise",
          texteObservation: `${"Requête transmise"}${valeurs.texte ? texteObservation : ""}`,
          requeteId: props.idRequete,
          idUtilisateurValideur: valeurs.optionChoisie.cle
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
      <BoutonDoubleSubmit onClick={() => setOpen(true)}>{"Transmettre à valideur"}</BoutonDoubleSubmit>{" "}
      <TransfertPopin
        onValidate={onValidate}
        open={open}
        onClose={() => setOpen(false)}
        options={getValideursVersOptions(utilisateurs, utilisateurConnecte.id, true)}
        titre={"Transmettre à valideur"}
        placeholder={"Pour vérification"}
        libelleAvantTexte={"Message pour valideur :"}
      />
    </>
  );
};
