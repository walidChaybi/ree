import { ReinitialiserValiderBoutons } from "@composant/formulaire/boutons/ReinitialiserValiderBoutons";
import { RECEContext } from "@core/body/Body";
import { useMentionsApiHook } from "@hook/acte/mentions/MentionsApiHook";
import {
  SauvegarderMentionsParam,
  useSauvegarderMentions
} from "@hook/acte/mentions/SauvegarderMentionsHook";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { Mention } from "@model/etatcivil/acte/mention/IMention";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_COPIE_INTEGRALE } from "@model/requete/enum/DocumentDelivranceConstante";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { getLibelle, getValeurOuVide } from "@util/Utils";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { EditionExtraitCopiePageContext } from "../../../EditionExtraitCopiePage";
import { DocumentEC } from "../../../enum/DocumentEC";
import { MentionsCopie } from "./contenu/MentionsCopie";
import { MentionsExtrait } from "./contenu/MentionsExtrait";
import {
  boutonReinitialiserEstDisabled,
  getRegistreActe,
  getValeurEstdeverrouillerCommencement,
  IMentionAffichage,
  mappingVersMentionAffichage,
  modificationEffectue,
  validerMentions
} from "./GestionMentionsUtil";
import "./scss/Mention.scss";

export interface GestionMentionsProps {
  acte?: IFicheActe;
  document?: IDocumentReponse;
  requete: IRequeteDelivrance;
  handleDocumentEnregistre: (index: DocumentEC) => void;
}

export const GestionMentions: React.FC<GestionMentionsProps> = props => {
  const { setIsDirty } = useContext(RECEContext);

  const { setOperationEnCours } = useContext(EditionExtraitCopiePageContext);

  const [mentionSelect, setMentionSelect] = useState<IMentionAffichage>();
  const [mentionAjout, setMentionAjout] = useState<IMentionAffichage>();
  const [mentions, setMentions] = useState<IMentionAffichage[]>();
  const [mentionsParams, setMentionsParams] = useState<string>();
  const [sauvegarderMentionsParams, setSauvegarderMentionsParams] =
    useState<SauvegarderMentionsParam>();
  const [estDeverrouille, setEstdeverrouille] = useState<boolean>(
    getValeurEstdeverrouillerCommencement(props.document)
  );

  const estExtraitPlurilingue = DocumentDelivrance.estExtraitPlurilingue(
    props.document?.typeDocument
  );

  const mentionsApi = useMentionsApiHook(mentionsParams);
  const resultatSauvegarde = useSauvegarderMentions(sauvegarderMentionsParams);

  useEffect(() => {
    if (props.document && resultatSauvegarde) {
      props.handleDocumentEnregistre(DocumentEC.Principal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatSauvegarde]);

  useEffect(() => {
    if (props.acte) {
      setMentionsParams(props.acte.id);
    }
  }, [props.acte]);

  useEffect(() => {
    if (mentions) {
      setIsDirtySiModificationEffectuee(mentions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentions]);

  const setIsDirtySiModificationEffectuee = useCallback(
    (nouvellesMentions: IMentionAffichage[] | undefined) => {
      setIsDirty(
        modificationEffectue(
          nouvellesMentions,
          mentionsApi?.mentions,
          props.document
        )
      );
    },
    [mentionsApi, props.document, setIsDirty]
  );

  const reinitialisation = useCallback(() => {
    if (mentionsApi?.mentions && props.document) {
      const mentionsNew = mappingVersMentionAffichage(
        mentionsApi.mentions,
        props.document
      );
      if (mentionsNew) {
        setMentions(mentionsNew);
        if (estExtraitPlurilingue) {
          mentionsNew[0].texte = Mention.getTexteAPartirPlurilingue(
            mentionsNew[0].texte
          );
        }
        setMentionSelect(mentionsNew[0]);
      }
    }
  }, [mentionsApi, props.document, estExtraitPlurilingue]);

  useEffect(() => {
    reinitialisation();
  }, [reinitialisation]);

  const sauvegarderMentions = useCallback(() => {
    if (mentionsApi && mentions && props.acte?.id && props.document) {
      setOperationEnCours(true);
      setSauvegarderMentionsParams({
        mentionsApi,
        mentions,
        idActe: props.acte?.id,
        document: props.document,
        requete: props.requete
      });
    }
  }, [mentions, mentionsApi, props, setOperationEnCours]);

  const valider = useCallback(() => {
    validerMentions(
      mentions,
      sauvegarderMentions,
      mentionsApi?.mentions,
      props.acte,
      props.document
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
      {DocumentDelivrance.getEnumForUUID(
        getValeurOuVide(props.document?.typeDocument)
      ).code === CODE_COPIE_INTEGRALE ? (
        <MentionsCopie
          estDeverrouille={estDeverrouille}
          setEstdeverrouille={setEstdeverrouille}
          mentions={mentions}
          setMentions={setMentions}
        />
      ) : (
        <MentionsExtrait
          estExtraitPlurilingue={estExtraitPlurilingue}
          mentions={mentions}
          mentionSelect={mentionSelect}
          mentionsApi={mentionsApi?.mentions}
          setMentionSelect={setMentionSelect}
          setMentions={setMentions}
          mentionAjout={mentionAjout}
          setMentionAjout={setMentionAjout}
          natureActe={props.acte?.nature}
        />
      )}
      <ReinitialiserValiderBoutons
        onClickReInitialiser={reinitialisation}
        reInitialiserDisabled={boutonReinitialiserEstDisabled(
          estDeverrouille,
          mentionsApi?.mentions,
          mentions,
          props.document
        )}
        onClickValider={valider}
      />
    </div>
  );
};
