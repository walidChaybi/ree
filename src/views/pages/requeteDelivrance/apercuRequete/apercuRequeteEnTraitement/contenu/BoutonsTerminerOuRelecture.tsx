import { TransfertPopin } from "@composant/menuTransfert/TransfertPopin";
import {
  IRetourValideurParams,
  useRetourValideurApiHook
} from "@hook/requete/RetourValideur";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { receUrl } from "@router/ReceUrls";
import { getUrlPrecedente } from "@util/route/routeUtil";
import { Option } from "@util/Type";
import { getLibelle, getValeurOuVide } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BoutonsTerminer } from "./BoutonsTerminer";

interface BoutonsTerminerOuRelectureProps {
  requete: IRequeteDelivrance;
  acte?: IFicheActe;
}

export const BoutonsTerminerOuRelecture: React.FC<
  BoutonsTerminerOuRelectureProps
> = props => {
  const [params, setParams] = useState<IRetourValideurParams>();
  const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();

  function onClickValidate(statut: StatutRequete, texte?: string) {
    setParams({
      libelleAction: statut.libelle,
      statutDemande: statut.nom,
      requeteId: props.requete.id,
      texteObservation:
        statut === StatutRequete.A_REVOIR
          ? getValeurOuVide(texte)
          : getLibelle("Requête approuvée")
    });
  }

  const idAction = useRetourValideurApiHook(params);

  useEffect(() => {
    if (idAction) {
      receUrl.replaceUrl(history, getUrlPrecedente(history.location.pathname));
    }
  }, [idAction, history]);

  return (
    <>
      {props.requete.statutCourant.statut ===
      StatutRequete.TRANSMISE_A_VALIDEUR ? (
        <>
          <Bouton onClick={() => setOpen(true)}>
            {getLibelle("Reprendre le traitement")}
          </Bouton>
          <Bouton
            onClick={() =>
              onClickValidate(
                props.requete.documentsReponses.some(
                  document => document.avecCtv
                )
                  ? StatutRequete.A_SIGNER
                  : StatutRequete.A_VALIDER
              )
            }
          >
            {getLibelle("Relecture approuvée")}
          </Bouton>
          <Bouton onClick={() => setOpen(true)}>
            {getLibelle("Relecture commentée")}
          </Bouton>
        </>
      ) : (
        <BoutonsTerminer requete={props.requete} acte={props.acte} />
      )}
      <TransfertPopin
        onValidate={(optionUtilisateur?: Option, texte?: string) =>
          onClickValidate(StatutRequete.A_REVOIR, texte)
        }
        open={open}
        onClose={() => setOpen(false)}
        titre={getLibelle("Commentaire pour agent requérant")}
        placeholder={getLibelle("En retour")}
      />
    </>
  );
};
