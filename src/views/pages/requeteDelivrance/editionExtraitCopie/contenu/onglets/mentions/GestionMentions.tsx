import { ReinitialiserValiderBoutons } from "@composant/formulaire/boutons/ReinitialiserValiderBoutons";
import { RECEContext } from "@core/body/RECEContext";
import { useMentionsApiHook } from "@hook/acte/mentions/MentionsApiHook";
import {
  SauvegarderMentionsParam,
  useSauvegarderMentions
} from "@hook/acte/mentions/SauvegarderMentionsHook";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { Mention } from "@model/etatcivil/acte/mention/IMention";
import {
  IMentionAffichage,
  mappingVersMentionAffichage,
  modificationEffectue
} from "@model/etatcivil/acte/mention/IMentionAffichage";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_COPIE_INTEGRALE } from "@model/requete/enum/DocumentDelivranceConstante";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { estTableauNonVide, getLibelle, getValeurOuVide } from "@util/Utils";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { EditionExtraitCopiePageContext } from "../../../EditionExtraitCopiePage";
import { MentionsCopie } from "./contenu/MentionsCopie";
import { MentionsExtrait } from "./contenu/MentionsExtrait";
import {
  boutonReinitialiserEstDisabled,
  getRegistreActe,
  getValeurEstdeverrouillerCommencement,
  validerMentions
} from "./GestionMentionsUtil";
import "./scss/Mention.scss";

export interface GestionMentionsProps {
  acte?: IFicheActe;
  document?: IDocumentReponse;
  requete: IRequeteDelivrance;
}

export const GestionMentions: React.FC<GestionMentionsProps> = props => {
  const { setIsDirty } = useContext(RECEContext);

  const { setOperationEnCours, rafraichirRequete } = useContext(
    EditionExtraitCopiePageContext
  );

  const [mentionSelect, setMentionSelect] = useState<IMentionAffichage>();
  const [mentionAjout, setMentionAjout] = useState<IMentionAffichage>();
  const [mentions, setMentions] = useState<IMentionAffichage[]>([]);
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
      rafraichirRequete();
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
          props.document,
          props.acte?.nature
        )
      );
    },
    [mentionsApi, props.document, setIsDirty, props.acte]
  );

  const reinitialisation = useCallback(() => {
    if (mentionsApi?.mentions && props.document) {
      const mentionsAAfficher = mappingVersMentionAffichage(
        mentionsApi.mentions,
        props.document,
        props.acte?.nature
      );
      if (estTableauNonVide(mentionsAAfficher)) {
        setMentions(mentionsAAfficher);
        const premiereMention = { ...mentionsAAfficher[0] };
        if (estExtraitPlurilingue) {
          premiereMention.texte = Mention.getTexteAPartirPlurilingue(
            premiereMention.texte
          );
        }
        setMentionSelect(premiereMention);
      }
    }
  }, [mentionsApi, props.document, estExtraitPlurilingue, props.acte]);

  useEffect(() => {
    reinitialisation();
  }, [reinitialisation]);

  const sauvegarderMentions = useCallback(() => {
    if (mentionsApi && mentions && props.acte?.id && props.document) {
      setOperationEnCours(true);
      setSauvegarderMentionsParams({
        mentionsApi,
        mentions,
        acte: props.acte,
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
          props.document,
          props.acte?.nature
        )}
        onClickValider={valider}
        afficherBouton={
          !StatutRequete.estTransmiseAValideur(
            props.requete.statutCourant.statut
          )
        }
      />
    </div>
  );
};
