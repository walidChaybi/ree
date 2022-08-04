import React, { useCallback } from "react";
import { IMention } from "../../../../../../../../model/etatcivil/acte/mention/IMention";
import { TypeMention } from "../../../../../../../../model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "../../../../../../../../model/etatcivil/enum/NatureActe";
import { NatureMention } from "../../../../../../../../model/etatcivil/enum/NatureMention";
import { Generateur } from "../../../../../../../common/util/generateur/Generateur";
import {
  getLibelle,
  getValeurOuVide
} from "../../../../../../../common/util/Utils";
import { SelectRece } from "../../../../../../../common/widget/formulaire/champsSaisie/SelectField";
import { ListeGlisserDeposer } from "../../../../../../../common/widget/listeGlisserDeposer/ListeGlisserDeposer";
import {
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
  mentionsApi?: IMention[];
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
  const handleOnBlur = useCallback(() => {
    handleBlur(
      mentions,
      mentionSelect,
      mentionsApi,
      setMentionSelect,
      setMentions
    );
  }, [mentions, mentionSelect, mentionsApi, setMentionSelect, setMentions]);

  const handleChangeSelect = useCallback(
    (event: any) => {
      if (mentionSelect) {
        const temp = { ...mentionSelect };
        temp.nature = NatureMention.getEnumFor(event.target.value);
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
    (index: number) => {
      if (mentions) {
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
        temp.nature = NatureMention.getEnumFor(event.target.value);
        setMentionAjout(temp);
      } else {
        setMentionAjout({
          id: Generateur.genereCleUnique(),
          texte: "",
          nature: NatureMention.getEnumFor(event.target.value),
          numeroOrdre: getNumeroOrdreMention(mentions),
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
          numeroOrdre: getNumeroOrdreMention(mentions),
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
        (mention, index) => (mention.numeroOrdre = index + 1)
      );
      setMentions(nouvellesMentions);
      setMentionSelect(mentionAjout);
      setMentionAjout(undefined);
    }
  }, [mentionAjout, mentions, setMentionSelect, setMentionAjout, setMentions]);

  return (
    <>
      {mentions && mentions.length > 0 && (
        <>
          <ListeGlisserDeposer
            elementSelect={mentionSelect?.id}
            setElementSelect={id =>
              selectionneEtMiseAJour(
                mentions,
                mentionSelect,
                setMentionSelect,
                id
              )
            }
            liste={mappingVersListe(mentions)}
            handleReorga={(oldIndex: number, newIndex: number) =>
              handleReorga(mentions, setMentions, oldIndex, newIndex)
            }
            handleCheckbox={id => handleCheckBox(mentions, setMentions, id)}
            onClickSupprimer={onClickSupprimer}
            deverrouille={true}
            afficheDragHandle={true}
            useDragHandle={true}
            libellesSontTitres={false}
          />
          <div className="FormMention Modification">
            <h3>{getLibelle("Modification d'une mention")}</h3>
            <div className="SelectModif">
              <span className="SelectNature">
                <label>{getLibelle("Nature mention")}</label>
                <SelectRece
                  pasPremiereOptionVide={true}
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
            <textarea
              value={getValeurOuVide(mentionSelect?.texte)}
              onChange={handleChangeTexte}
              aria-label="Texte sélectionné"
              onBlur={handleOnBlur}
            />
          </div>
        </>
      )}
      <div className="FormMention Ajout">
        <h3>{getLibelle("Ajout d'une mention")}</h3>
        <div className="SelectAjout">
          <span className="SelectNature">
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
          <span className="ConteneurBouton">
            <button
              disabled={
                !mentionAjout ||
                mentionAjout.texte === "" ||
                mentionAjout.nature === NatureMention.getEnumFor("")
              }
              onClick={handleAjoutMention}
              title="Ajouter la mention"
            >
              +
            </button>
          </span>
        </div>
        <textarea
          value={getValeurOuVide(mentionAjout?.texte)}
          onChange={handleAjoutTexte}
          placeholder="Texte mention à ajouter"
        />
      </div>
    </>
  );
};
function getNumeroOrdreMention(
  mentions: IMentionAffichage[] | undefined
): number {
  return mentions ? mentions.length + 1 : 0;
}
