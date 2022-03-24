import React, { useCallback } from "react";
import { NatureMention } from "../../../../../../../../model/etatcivil/enum/NatureMention";
import { IMentionsResultat } from "../../../../../../../common/hook/acte/MentionsApiHook";
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
}

export const SectionModificationMention: React.FC<
  SectionModificationMentionProps
> = ({
  mentions,
  mentionSelect,
  mentionsApi,
  setMentionSelect,
  setMentions
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
          />
          <div className="FormMention Modification">
            <h3>{getLibelle("Modification d'une mention")}</h3>
            <textarea
              value={getValeurOuVide(mentionSelect?.texte)}
              onChange={handleChangeTexte}
              aria-label="Texte sélectionné"
              onBlur={handleOnBlur}
            />
            <SelectRece
              options={NatureMention.getAllEnumsAsOptions()}
              label="Nature sélectionnée"
              value={NatureMention.getKey(mentionSelect?.nature)}
              onChange={handleChangeSelect}
              aria-label="Nature sélectionnée"
              onBlur={handleOnBlur}
            />
          </div>
        </>
      )}
    </>
  );
};
