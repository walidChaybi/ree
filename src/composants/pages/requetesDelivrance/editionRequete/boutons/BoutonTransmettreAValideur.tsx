import { listeValideurToOptions } from "@composant/menuTransfert/MenuTransfertUtil";
import { ITransfertPopinForm, TransfertPopin } from "@composant/menuTransfert/TransfertPopin";
import { ITransmettreAValideurParams, useTransmettreAValideurApiHook } from "@hook/requete/TransmettreAValideur";
import { Option } from "@util/Type";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import Bouton, { IBoutonProps } from "../../../../commun/bouton/Bouton";

interface BoutonTransmettreAValideurProps extends IBoutonProps {
  idRequete: string;
}

export const BoutonTransmettreAValideur: React.FC<BoutonTransmettreAValideurProps> = ({ idRequete, ...props }) => {
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { utilisateurs, utilisateurConnecte } = useContext(RECEContextData);
  const [transmettreAValideurParams, setTransmettreAValideurParams] = useState<ITransmettreAValideurParams>();

  const onValidate = useCallback(
    (optionUtilisateur?: Option, texte?: string) => {
      if (optionUtilisateur) {
        const texteObservation = ` - ${texte}`;
        setTransmettreAValideurParams({
          libelleAction: "Requête transmise",
          texteObservation: `${"Requête transmise"}${texte ? texteObservation : ""}`,
          requeteId: idRequete,
          idUtilisateur: optionUtilisateur.cle
        });
      }
    },
    [idRequete]
  );

  const idAction = useTransmettreAValideurApiHook(transmettreAValideurParams);

  useEffect(() => {
    if (idAction) {
      replaceUrl(navigate, getUrlPrecedente(location.pathname));
    }
  }, [idAction]);

  return (
    <>
      <Bouton
        onClick={() => setOpen(true)}
        {...props}
      >
        Transmettre à valideur
      </Bouton>
      <TransfertPopin
        onValidate={(valeurs: ITransfertPopinForm) => onValidate(valeurs.optionChoisie, valeurs.texte)}
        open={open}
        onClose={() => setOpen(false)}
        options={listeValideurToOptions(utilisateurs, utilisateurConnecte.id)}
        titre="Transmettre à valideur"
        placeholder="Pour vérification"
        libelleAvantTexte="Message pour valideur :"
      />
    </>
  );
};
