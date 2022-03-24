import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IFicheActe } from "../../../../../../../model/etatcivil/acte/IFicheActe";
import { NatureMention } from "../../../../../../../model/etatcivil/enum/NatureMention";
import { IDocumentReponse } from "../../../../../../../model/requete/IDocumentReponse";
import {
  IMentionsParams,
  useMentionsApiHook
} from "../../../../../../common/hook/acte/MentionsApiHook";
import {
  getLibelle,
  getValeurOuVide
} from "../../../../../../common/util/Utils";
import { SelectRece } from "../../../../../../common/widget/formulaire/champsSaisie/SelectField";
import { SectionModificationMention } from "./contenu/SectionModificationMention";
import {
  getEnumNatureMentionOuAutre,
  getRegistreActe,
  IMentionAffichage,
  mappingVersMentionAffichage,
  modificationEffectue
} from "./GestionMentionsUtil";
import "./scss/Mention.scss";

interface GestionMentionsProps {
  acte?: IFicheActe;
  document?: IDocumentReponse;
}

export const GestionMentions: React.FC<GestionMentionsProps> = props => {
  const [mentionSelect, setMentionSelect] = useState<IMentionAffichage>();
  const [mentionAjout, setMentionAjout] = useState<IMentionAffichage>();
  const [mentions, setMentions] = useState<IMentionAffichage[]>();
  const [mentionsParams, setMentionsParams] = useState<IMentionsParams>();

  const mentionsApi = useMentionsApiHook(mentionsParams);

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
  }, [mentionsApi, props]);

  useEffect(() => {
    reinitialisation();
  }, [reinitialisation]);

  const handleAjoutSelect = useCallback(
    (event: any) => {
      if (mentionAjout) {
        const temp = { ...mentionAjout };
        temp.nature = getEnumNatureMentionOuAutre(event.target.value);
        setMentionAjout(temp);
      } else {
        setMentionAjout({
          id: uuidv4(),
          texte: "",
          nature: NatureMention.getEnumFor(event.target.value),
          numeroOrdre: mentions?.length,
          estPresent: true
        } as IMentionAffichage);
      }
    },
    [mentionAjout, mentions]
  );
  const handleAjoutTexte = useCallback(
    (event: any) => {
      if (mentionAjout) {
        const temp = { ...mentionAjout };
        temp.texte = event.target.value;
        setMentionAjout(temp);
      } else {
        setMentionAjout({
          id: uuidv4(),
          texte: event.target.value,
          nature: NatureMention.getEnumFor(""),
          numeroOrdre: mentions?.length,
          estPresent: true
        } as IMentionAffichage);
      }
    },
    [mentions, mentionAjout]
  );

  const ajoutMention = useCallback(() => {
    if (mentionAjout) {
      let temp: IMentionAffichage[] = [];
      if (mentions) {
        temp = [...mentions];
      }
      temp.push(mentionAjout);
      setMentions(temp);
      setMentionSelect(mentionAjout);
      setMentionAjout(undefined);
    }
  }, [mentionAjout, mentions]);

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
      <SectionModificationMention
        mentions={mentions}
        mentionSelect={mentionSelect}
        mentionsApi={mentionsApi}
        setMentionSelect={setMentionSelect}
        setMentions={setMentions}
      />
      <div className="FormMention Ajout">
        <h3>{getLibelle("Ajout d'une mention")}</h3>
        <textarea
          value={getValeurOuVide(mentionAjout?.texte)}
          onChange={handleAjoutTexte}
          placeholder="Texte mention à ajouter"
        />
        <div className="SelectAjout">
          <SelectRece
            options={NatureMention.getAllEnumsAsOptions()}
            label="Nature ajoutée"
            value={NatureMention.getKey(mentionAjout?.nature)}
            onChange={handleAjoutSelect}
          />
          <button
            disabled={!mentionAjout || mentionAjout.texte === ""}
            onClick={ajoutMention}
            title="Ajouter la mention"
          >
            +
          </button>
        </div>
      </div>
      <div className="Boutons">
        <button
          onClick={reinitialisation}
          disabled={modificationEffectue(
            mentions,
            mentionsApi?.mentions,
            props.document
          )}
        >
          {getLibelle("Réinitialiser")}
        </button>
        <button>{getLibelle("Valider")}</button>
      </div>
    </div>
  );
};
