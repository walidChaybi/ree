import React, { useCallback, useContext, useEffect, useState } from "react";
import { IFicheActe } from "../../../../../../../model/etatcivil/acte/IFicheActe";
import { DocumentDelivrance } from "../../../../../../../model/requete/enum/DocumentDelivrance";
import { CODE_COPIE_INTEGRALE } from "../../../../../../../model/requete/enum/DocumentDelivranceConstante";
import { IDocumentReponse } from "../../../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../../../model/requete/IRequeteDelivrance";
import { ReinitialiserValiderBoutons } from "../../../../../../common/composant/formulaire/boutons/ReinitialiserValiderBoutons";
import { useMentionsApiHook } from "../../../../../../common/hook/acte/mentions/MentionsApiHook";
import {
  SauvegarderMentionsParam,
  useSauvegarderMentions
} from "../../../../../../common/hook/acte/mentions/SauvegarderMentionsHook";
import {
  getLibelle,
  getValeurOuVide
} from "../../../../../../common/util/Utils";
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
          mentions={mentions}
          mentionSelect={mentionSelect}
          mentionsApi={mentionsApi}
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
