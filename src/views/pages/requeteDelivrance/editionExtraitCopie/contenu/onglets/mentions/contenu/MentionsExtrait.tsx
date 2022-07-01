import React, { useCallback } from "react";
import { TypeMention } from "../../../../../../../../model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "../../../../../../../../model/etatcivil/enum/NatureActe";
import { NatureMention } from "../../../../../../../../model/etatcivil/enum/NatureMention";
import { IMentionsResultat } from "../../../../../../../common/hook/acte/mentions/MentionsApiHook";
import { Generateur } from "../../../../../../../common/util/generateur/Generateur";
import {
  getLibelle,
  getValeurOuVide
} from "../../../../../../../common/util/Utils";
import { SelectRece } from "../../../../../../../common/widget/formulaire/champsSaisie/SelectField";
import { ListeGlisserDeposer } from "../../../../../../../common/widget/listeGlisserDeposer/ListeGlisserDeposer";
import {
  getEnumNatureMentionOuAutre,
  handleBlur,
  handleCheckBox,
  handleReorga,
  IMentionAffichage,
  mappingVersListe,
  selectionneEtMiseAJour
} from "../GestionMentionsUtil";

export interface SectionModificationMentionProps {
  mentions?: IMentionAffichage[];
  mentionSelect?: IMentionAffichage;
  mentionsApi?: IMentionsResultat;
  setMentionSelect: any;
  setMentions: any;
  setMentionAjout: any;
  mentionAjout?: IMentionAffichage;
  natureActe?: NatureActe;
}

export const MentionsExtrait: React.FC<SectionModificationMentionProps> = ({
  mentions,
  mentionSelect,
  mentionsApi,
  setMentionSelect,
  setMentions,
  setMentionAjout,
  mentionAjout,
  natureActe
}) => {
  function selectionneMention(id: string) {
    selectionneEtMiseAJour(mentions, mentionSelect, setMentionSelect, id);
  }
  const handleOnBlur = useCallback(() => {
    handleBlur(
      mentions,
      mentionSelect,
      mentionsApi?.mentions,
      setMentionSelect,
      setMentions
    );
  }, [mentions, mentionSelect, mentionsApi, setMentionSelect, setMentions]);

  const handleChangeSelect = useCallback(
    (event: any) => {
      if (mentionSelect) {
        const temp = { ...mentionSelect };
        temp.nature = getEnumNatureMentionOuAutre(event.target.value);
        setMentionSelect(temp);
      }
    },
    [mentionSelect, setMentionSelect]
  );

  const handleChangeTexte = useCallback(
    (event: any) => {
      if (mentionSelect) {
        const temp = { ...mentionSelect };
        temp.texte = event.target.value;
        setMentionSelect(temp);
      }
    },
    [mentionSelect, setMentionSelect]
  );

  const onClickSupprimer = useCallback(
    (id: string) => {
      if (mentions) {
        const index = mentions.findIndex(el => el.id === id);
        const temp = [...mentions];
        temp.splice(index, 1);
        setMentions(temp);
      }
    },
    [mentions, setMentions]
  );

  const handleAjoutSelect = useCallback(
    (event: any) => {
      if (mentionAjout) {
        const temp = { ...mentionAjout };
        temp.nature = getEnumNatureMentionOuAutre(event.target.value);
        setMentionAjout(temp);
      } else {
        setMentionAjout({
          id: Generateur.genereCleUnique(),
          texte: "",
          nature: NatureMention.getEnumFor(event.target.value),
          numeroOrdre: mentions?.length,
          estPresent: true,
          aPoubelle: true
        } as IMentionAffichage);
      }
    },
    [mentionAjout, mentions, setMentionAjout]
  );
  const handleAjoutTexte = useCallback(
    (event: any) => {
      if (mentionAjout) {
        const temp = { ...mentionAjout };
        temp.texte = event.target.value;
        setMentionAjout(temp);
      } else {
        setMentionAjout({
          id: Generateur.genereCleUnique(),
          texte: event.target.value,
          nature: NatureMention.getEnumFor(""),
          numeroOrdre: mentions?.length,
          estPresent: true,
          aPoubelle: true
        } as IMentionAffichage);
      }
    },
    [mentions, mentionAjout, setMentionAjout]
  );

  const handleAjoutMention = useCallback(() => {
    if (mentionAjout) {
      let nouvellesMentions: IMentionAffichage[] = [];
      if (mentions) {
        nouvellesMentions = [...mentions];
      }
      nouvellesMentions.push(mentionAjout);
      nouvellesMentions.forEach(
        (mention, index) => (mention.numeroOrdre = index)
      );
      setMentions(nouvellesMentions);
      setMentionSelect(mentionAjout);
      setMentionAjout(undefined);
    }
  }, [mentionAjout, mentions, setMentionSelect, setMentionAjout, setMentions]);

  const handleSort = useCallback(
    (oldIndex: number, newIndex: number) => {
      handleReorga(mentions, setMentions, oldIndex, newIndex);
    },
    [mentions, setMentions]
  );

  const handleCheck = useCallback(
    (id: string) => {
      handleCheckBox(mentions, setMentions, id);
    },
    [mentions, setMentions]
  );

  return (
    <>
      {mentions && mentions.length > 0 && (
        <>
          <ListeGlisserDeposer
            elementSelect={mentionSelect?.id}
            setElementSelect={selectionneMention}
            liste={mappingVersListe(mentions)}
            handleReorga={handleSort}
            handleCheckbox={handleCheck}
            onClickSupprimer={onClickSupprimer}
            deverrouille={true}
            afficheDragHandle={true}
            useDragHandle={true}
            libellesSontTitres={false}
          />
          <div className="FormMention Modification">
            <h3>{getLibelle("Modification d'une mention")}</h3>
            <textarea
              value={getValeurOuVide(mentionSelect?.texte)}
              onChange={handleChangeTexte}
              aria-label="Texte sélectionné"
              onBlur={handleOnBlur}
            />
            <span>
              <label>{getLibelle("Nature mention")}</label>
              <SelectRece
                options={
                  // Un TypeMention est lié à une nature d'acte. Ce qui permet de récuperer les Nature
                  natureActe
                    ? NatureMention.getEnumsAsOptions(
                        TypeMention.getNaturesMentionPourActe(natureActe)
                      )
                    : NatureMention.getAllEnumsAsOptions()
                }
                label="Nature sélectionnée"
                value={NatureMention.getUuidFromNature(mentionSelect?.nature)}
                onChange={handleChangeSelect}
                aria-label="Nature sélectionnée"
                onBlur={handleOnBlur}
              />
            </span>
          </div>
        </>
      )}
      <div className="FormMention Ajout">
        <h3>{getLibelle("Ajout d'une mention")}</h3>
        <textarea
          value={getValeurOuVide(mentionAjout?.texte)}
          onChange={handleAjoutTexte}
          placeholder="Texte mention à ajouter"
        />
        <div className="SelectAjout">
          <span>
            <label>{getLibelle("Nature mention")}</label>
            <SelectRece
              options={
                // Un TypeMention est lié à une nature d'acte. Ce qui permet de récuperer les Nature
                natureActe
                  ? NatureMention.getEnumsAsOptions(
                      TypeMention.getNaturesMentionPourActe(natureActe)
                    )
                  : NatureMention.getAllEnumsAsOptions()
              }
              label="Nature ajoutée"
              value={NatureMention.getUuidFromNature(mentionAjout?.nature)}
              onChange={handleAjoutSelect}
            />
          </span>
          <button
            disabled={!mentionAjout || mentionAjout.texte === ""}
            onClick={handleAjoutMention}
            title="Ajouter la mention"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};
