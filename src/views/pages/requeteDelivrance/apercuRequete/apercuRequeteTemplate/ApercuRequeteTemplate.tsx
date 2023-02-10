import { BandeauRequete } from "@composant/bandeauApercuRequete/BandeauApercuRequete";
import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { ProtectionApercu } from "@util/route/Protection/ProtectionApercu";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ApercuRequetePartieGauche } from "../apercuRequetePartieGauche/ApercuRequetePartieGauche";
import "./scss/ApercuRequeteTemplate.scss";

interface TemplateProps {
  idRequeteAAfficher?: string;
  title: string;
  setRequeteCallback: (req: IRequeteDelivrance) => void;
  setDocumentAfficheCallback?: (docReponse: IDocumentReponse) => void;
}

export const ApercuRequeteTemplate: React.FC<TemplateProps> = props => {
  const [idRequete, setIdRequete] = useState<string>();
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const history = useHistory();
  const { detailRequeteState } = useDetailRequeteApiHook(
    idRequete,
    history.location.pathname.includes(URL_RECHERCHE_REQUETE)
  );
  const [requete, setRequete] = useState<IRequeteDelivrance>();

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
      props.setRequeteCallback(requete);
    }
  }, [requete, props]);

  return (
    <div className="ApercuRequete">
      <title>{props.title}</title>
      {requete && (
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
      )}
    </div>
  );
};
