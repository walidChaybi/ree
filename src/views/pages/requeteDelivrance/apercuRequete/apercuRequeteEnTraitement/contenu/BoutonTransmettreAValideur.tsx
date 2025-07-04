import { listeValideurToOptions } from "@composant/menuTransfert/MenuTransfertUtil";
import { ITransfertPopinForm, TransfertPopin } from "@composant/menuTransfert/TransfertPopin";
import { RECEContextData } from "@core/contexts/RECEContext";
import { ITransmettreAValideurParams, useTransmettreAValideurApiHook } from "@hook/requete/TransmettreAValideur";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

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
          idUtilisateur: valeurs.optionChoisie.cle
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
        options={listeValideurToOptions(utilisateurs, utilisateurConnecte.id)}
        titre={"Transmettre à valideur"}
        placeholder={"Pour vérification"}
        libelleAvantTexte={"Message pour valideur :"}
      />
    </>
  );
};
