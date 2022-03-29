import React, { useCallback, useEffect, useState } from "react";
import { IFicheActe } from "../../../../../../../model/etatcivil/acte/IFicheActe";
import {
  CODE_COPIE_INTEGRALE,
  DocumentDelivrance
} from "../../../../../../../model/requete/enum/DocumentDelivrance";
import { IDocumentReponse } from "../../../../../../../model/requete/IDocumentReponse";
import {
  IMentionsParams,
  useMentionsApiHook
} from "../../../../../../common/hook/acte/mentions/MentionsApiHook";
import {
  IMiseAJourDocumentMentionParams,
  useMiseAJourDocumentMentionApiHook
} from "../../../../../../common/hook/acte/mentions/MiseAJourDocumentMentionApiHook";
import {
  IMiseAJourMentionsParams,
  useMiseAJourMentionsApiHook
} from "../../../../../../common/hook/acte/mentions/MiseAJourMentionsApiHook";
import {
  getLibelle,
  getValeurOuVide
} from "../../../../../../common/util/Utils";
import { MentionsCopie } from "./contenu/MentionsCopie";
import { MentionsExtrait } from "./contenu/MentionsExtrait";
import {
  boutonReinitialiserEstDisabled,
  getRegistreActe,
  getValeurEstDeverouillerCommencement,
  IMentionAffichage,
  mappingVersMentionAffichage,
  saveMentions,
  validerMentions
} from "./GestionMentionsUtil";
import "./scss/Mention.scss";

export interface GestionMentionsProps {
  acte?: IFicheActe;
  document?: IDocumentReponse;
  setIsDirty: any;
}

export const GestionMentions: React.FC<GestionMentionsProps> = props => {
  const [mentionSelect, setMentionSelect] = useState<IMentionAffichage>();
  const [mentionAjout, setMentionAjout] = useState<IMentionAffichage>();
  const [mentions, setMentions] = useState<IMentionAffichage[]>();
  const [mentionsParams, setMentionsParams] = useState<IMentionsParams>();
  const [estDeverouille, setEstDeverouille] = useState<boolean>(
    getValeurEstDeverouillerCommencement(props.document)
  );
  const [mentionsAEnvoyerParams, setMentionsAEnvoyerParams] =
    useState<IMiseAJourMentionsParams>();
  const [documentMajParams, setDocumentMajParams] =
    useState<IMiseAJourDocumentMentionParams>();

  const mentionsApi = useMentionsApiHook(mentionsParams);
  useMiseAJourMentionsApiHook(mentionsAEnvoyerParams);
  useMiseAJourDocumentMentionApiHook(documentMajParams);

  useEffect(() => {
    if (props.acte) {
      setMentionsParams({ idActe: props.acte.id });
    }
  }, [props.acte]);

  const reinitialisation = useCallback(() => {
    if (mentionsApi?.mentions && props.document) {
      const mentionsNew = mappingVersMentionAffichage(
        mentionsApi.mentions,
        props.document
      );
      if (mentionsNew) {
        setMentions(mentionsNew);
        setMentionSelect(mentionsNew[0]);
      }
    }
  }, [mentionsApi, props.document]);

  useEffect(() => {
    reinitialisation();
  }, [reinitialisation]);

  const sauvegarderMentions = useCallback(() => {
    saveMentions(
      mentionsApi,
      mentions,
      props,
      setMentionsAEnvoyerParams,
      setDocumentMajParams
    );
  }, [mentions, mentionsApi, props]);

  const valider = useCallback(() => {
    validerMentions(
      props,
      mentions,
      sauvegarderMentions,
      mentionsApi?.mentions
    );
  }, [mentions, sauvegarderMentions, mentionsApi, props]);

  return (
    <div className="Mention">
      {props.acte && (
        <div className="Header">
          <div>
            <h3>{`${getLibelle("Nature")}`}</h3>
            <span>{props.acte?.nature.libelle}</span>
          </div>
          <div>
            <h3>{`${getLibelle("Référence")}`}</h3>
            <span>{getRegistreActe(props.acte)}</span>
          </div>
        </div>
      )}
      {DocumentDelivrance.getEnumFor(
        getValeurOuVide(props.document?.typeDocument)
      ).code === CODE_COPIE_INTEGRALE ? (
        <MentionsCopie
          estDeverouille={estDeverouille}
          setEstDeverouille={setEstDeverouille}
          mentions={mentions}
          setMentions={setMentions}
        />
      ) : (
        <MentionsExtrait
          mentions={mentions}
          mentionSelect={mentionSelect}
          mentionsApi={mentionsApi}
          setMentionSelect={setMentionSelect}
          setMentions={setMentions}
          mentionAjout={mentionAjout}
          setMentionAjout={setMentionAjout}
        />
      )}
      <div className="Boutons">
        <button
          onClick={reinitialisation}
          disabled={boutonReinitialiserEstDisabled(
            estDeverouille,
            props.setIsDirty,
            mentionsApi?.mentions,
            mentions,
            props.document
          )}
        >
          {getLibelle("Réinitialiser")}
        </button>
        <button onClick={valider}>{getLibelle("Valider")}</button>
      </div>
    </div>
  );
};
