import { ReinitialiserValiderBoutons } from "@composant/formulaire/boutons/ReinitialiserValiderBoutons";
import { IMentionsParams, useMentionsApiHook } from "@hook/acte/mentions/MentionsApiHook";
import { SauvegarderMentionsParam, useSauvegarderMentions } from "@hook/acte/mentions/SauvegarderMentionsHook";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { IMentionAffichage, mappingVersMentionAffichage, modificationEffectuee } from "@model/etatcivil/acte/mention/IMentionAffichage";
import { EStatutMention } from "@model/etatcivil/enum/EStatutMention";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { estTableauNonVide } from "@util/Utils";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ECleOngletDocumentDelivre } from "../../../../../../../composants/pages/requetesDelivrance/editionRequete/partieDocument/voletDocuments/VoletDocumentDelivre";
import { EditionDelivranceContext } from "../../../../../../../contexts/EditionDelivranceContextProvider";
import { RECEContextActions } from "../../../../../../../contexts/RECEContextProvider";
import {
  boutonReinitialiserEstDisabled,
  getTexteAPartirMentionPlurilingue,
  getValeurEstdeverrouillerCommencement,
  validerMentions
} from "./GestionMentionsUtil";
import { MentionsCopie } from "./contenu/MentionsCopie";
import { MentionsExtrait } from "./contenu/MentionsExtrait";
import "./scss/Mention.scss";

interface GestionMentionsProps {
  acte?: FicheActe;
  document?: IDocumentReponse;
  requete: IRequeteDelivrance;
  setOngletDocumentDelivre?: (nouvelOnglet: ECleOngletDocumentDelivre) => void;
}

export const GestionMentions: React.FC<GestionMentionsProps> = props => {
  const idActe = useMemo(() => props.acte?.id, [props.acte]);
  const { setIsDirty } = useContext(RECEContextActions);

  const { rechargerRequete } = useContext(EditionDelivranceContext);

  const [mentionSelect, setMentionSelect] = useState<IMentionAffichage>();
  const [mentionAjout, setMentionAjout] = useState<IMentionAffichage>();
  const [mentions, setMentions] = useState<IMentionAffichage[]>([]);
  const [mentionsParams, setMentionsParams] = useState<IMentionsParams>();
  const [sauvegarderMentionsParams, setSauvegarderMentionsParams] = useState<SauvegarderMentionsParam>();
  const [estDeverrouille, setEstDeverrouille] = useState<boolean>(getValeurEstdeverrouillerCommencement(props.document));

  const estExtraitPlurilingue = DocumentDelivrance.estExtraitPlurilingue(props.document?.typeDocument);

  const mentionsApi = useMentionsApiHook(mentionsParams);
  const resultatSauvegarde = useSauvegarderMentions(sauvegarderMentionsParams);

  useEffect(() => {
    if (props.document && resultatSauvegarde) {
      rechargerRequete("requete", () => props.setOngletDocumentDelivre?.(ECleOngletDocumentDelivre.DOCUMENT_EDITE));
    }
  }, [resultatSauvegarde]);

  useEffect(() => {
    if (idActe) {
      setMentionsParams({
        idActe: idActe,
        statutMention: EStatutMention.SIGNEE
      });
    }
  }, [idActe]);

  useEffect(() => {
    if (mentions) {
      setIsDirtySiModificationEffectuee(mentions);
    }
  }, [mentions]);

  const setIsDirtySiModificationEffectuee = useCallback(
    (nouvellesMentions: IMentionAffichage[] | undefined) => {
      setIsDirty(modificationEffectuee(nouvellesMentions, mentionsApi?.mentions, props.document, props.acte?.nature));
    },
    [mentionsApi, props.document, setIsDirty, props.acte]
  );

  const reinitialisation = useCallback(() => {
    if (mentionsApi?.mentions && props.document) {
      const mentionsAAfficher = mappingVersMentionAffichage(mentionsApi.mentions, props.document, props.acte?.nature);
      if (estTableauNonVide(mentionsAAfficher)) {
        setMentions(mentionsAAfficher);
        const premiereMention = { ...mentionsAAfficher[0] };
        if (estExtraitPlurilingue) {
          premiereMention.texte = getTexteAPartirMentionPlurilingue(premiereMention.texte);
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
      setSauvegarderMentionsParams({
        mentionsApi,
        mentions,
        acte: props.acte,
        document: props.document,
        requete: props.requete
      });
    }
  }, [mentions, mentionsApi, props]);

  const valider = useCallback(() => {
    validerMentions(mentions, sauvegarderMentions, mentionsApi?.mentions, props.acte, props.document);
  }, [mentions, sauvegarderMentions, mentionsApi, props]);

  return (
    <div className="Mention">
      {props.acte && (
        <div className="Header">
          <div>
            <h3>{"Nature"}</h3>
            <span>{ENatureActe[props.acte?.nature] ?? ""}</span>
          </div>
          <div>
            <h3>{"Référence"}</h3>
            <span>{props.acte.referenceActe ?? ""}</span>
          </div>
        </div>
      )}
      {DocumentDelivrance.depuisId(props.document?.typeDocument)?.code === ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE ? (
        <MentionsCopie
          estDeverrouille={estDeverrouille}
          setEstdeverrouille={setEstDeverrouille}
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
        afficherBouton={!StatutRequete.estTransmiseAValideur(props.requete.statutCourant.statut)}
        titreBoutons="mentions modifiées"
      />
    </div>
  );
};
