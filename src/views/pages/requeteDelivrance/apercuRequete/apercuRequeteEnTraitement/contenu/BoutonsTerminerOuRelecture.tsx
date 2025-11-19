import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { ITransfertPopinForm, TransfertPopin } from "@views/common/composant/menuTransfert/TransfertPopin";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "../../../../../common/hook/requete/CreationActionMiseAjourStatutHook";
import { IRegenerationDocumentsParams, useRegenerationDocumentsHook } from "../../../../../common/hook/requete/RegenerationDocumentsHook";
import { IRetourValideurParams, useRetourValideurApiHook } from "../../../../../common/hook/requete/RetourValideur";
import { getDefaultValuesCourrier } from "../../apercuCourrier/contenu/contenuForm/CourrierFonctions";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";
import { BoutonsTerminer } from "./BoutonsTerminer";

interface BoutonsTerminerOuRelectureProps {
  requete: IRequeteDelivrance;
  acte?: FicheActe;
}

export const BoutonsTerminerOuRelecture: React.FC<BoutonsTerminerOuRelectureProps> = props => {
  const [retourParams, setRetourParams] = useState<IRetourValideurParams>();
  const [majStatutParams, setMajStatutParams] = useState<ICreationActionMiseAjourStatutHookParams>();
  const [regenerationParams, setRegenerationParams] = useState<IRegenerationDocumentsParams>();
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useRegenerationDocumentsHook(regenerationParams);

  useCreationActionMiseAjourStatut(majStatutParams);

  function onClickValidate(statut: StatutRequete, texte?: string) {
    setRetourParams({
      libelleAction: statut === StatutRequete.A_REVOIR ? statut.libelle : `Requête approuvée - ${statut.libelle}`,
      statutDemande: statut.nom,
      requeteId: props.requete.id,
      texteObservation: statut === StatutRequete.A_REVOIR ? `Requête relue - ${texte ?? ""}` : "Requête approuvée"
    });
  }

  const idActionRetour = useRetourValideurApiHook(retourParams);

  useEffect(() => {
    if (idActionRetour) {
      replaceUrl(navigate, getUrlPrecedente(location.pathname));
    }
  }, [idActionRetour]);

  const onClickReprise = (statut: keyof typeof EStatutRequete) => {
    setRegenerationParams({
      requete: props.requete,
      regenererCourrier: true,
      acte: props.acte,
      valeursCourrierParDefaut: getDefaultValuesCourrier(props.requete),
      callBack: () =>
        setMajStatutParams({
          libelleAction: "Requête reprise",
          statutRequete: statut,
          requete: mappingRequeteDelivranceToRequeteTableau(props.requete)
        })
    });
  };

  return (
    <>
      {props.requete.statutCourant.statut === StatutRequete.TRANSMISE_A_VALIDEUR ? (
        <>
          {!SousTypeDelivrance.estRDCSDouRDCSC(props.requete.sousType) && (
            <BoutonDoubleSubmit
              onClick={() => onClickReprise(props.requete.documentsReponses.some(document => document.avecCtv) ? "A_SIGNER" : "A_VALIDER")}
            >
              {"Reprendre le traitement"}
            </BoutonDoubleSubmit>
          )}
          <BoutonDoubleSubmit
            onClick={() =>
              onClickValidate(
                props.requete.documentsReponses.some(document => document.avecCtv) ? StatutRequete.A_SIGNER : StatutRequete.A_VALIDER
              )
            }
          >
            {"Relecture approuvée"}
          </BoutonDoubleSubmit>
          <BoutonDoubleSubmit onClick={() => setOpen(true)}>{"Relecture commentée"}</BoutonDoubleSubmit>
        </>
      ) : (
        <BoutonsTerminer
          requete={props.requete}
          acte={props.acte}
        />
      )}
      <TransfertPopin
        onValidate={(valeurs: ITransfertPopinForm) => onClickValidate(StatutRequete.A_REVOIR, valeurs.texte)}
        open={open}
        onClose={() => setOpen(false)}
        titre={"Commentaire pour agent requérant"}
        placeholder={"En retour"}
      />
    </>
  );
};
