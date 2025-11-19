import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ProtectionApercu } from "@util/route/Protection/ProtectionApercu";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { BandeauRequete } from "../../../../common/composant/bandeauApercuRequete/BandeauApercuRequete";
import { IDetailRequeteParams, useDetailRequeteApiHook } from "../../../../common/hook/requete/DetailRequeteHook";
import { ApercuRequetePartieGauche } from "../apercuRequetePartieGauche/ApercuRequetePartieGauche";
import "./scss/ApercuRequeteTemplate.scss";

interface ITemplateProps {
  idRequeteAAfficher?: string;
  setRequete: (req: IRequeteDelivrance) => void;
  setDocumentAfficheCallback?: (docReponse: IDocumentReponse) => void;
}

export const ApercuRequeteTemplate: React.FC<React.PropsWithChildren<ITemplateProps>> = props => {
  const [idRequete, setIdRequete] = useState<string>();
  const { idRequeteParam } = useParams<TUuidRequeteParams>();
  const location = useLocation();
  const [detailRequeteParams, setDetailRequeteParams] = useState<IDetailRequeteParams>({});
  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);
  const [requete, setRequete] = useState<IRequeteDelivrance>();

  useEffect(() => {
    setDetailRequeteParams({
      idRequete: idRequete
    });
  }, [idRequete, location.pathname]);

  useEffect(() => {
    // L'idRequete peut venir de l'URL ou bien être une props dans le cas d'une requete liée
    if (props.idRequeteAAfficher) {
      setIdRequete(props.idRequeteAAfficher);
    } else {
      setIdRequete(idRequeteParam);
    }
  }, [idRequeteParam, props.idRequeteAAfficher]);

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteDelivrance);
    }
  }, [detailRequeteState]);

  useEffect(() => {
    if (requete) {
      props.setRequete(requete);
    }
  }, [requete, props.setRequete]);

  return (
    <div className="ApercuRequete">
      {requete ? (
        <ProtectionApercu
          statut={requete.statutCourant.statut}
          type={requete.type}
          sousType={requete.sousType}
          forcePass={props.idRequeteAAfficher !== undefined}
        >
          <BandeauRequete requete={requete} />
          <div className="contenu-requete">
            <ApercuRequetePartieGauche
              requete={requete}
              onClickDocumentAffiche={props.setDocumentAfficheCallback}
              disabled={props.idRequeteAAfficher !== undefined}
            />
            <div className="side right">{props.children}</div>
          </div>
        </ProtectionApercu>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};
