import { getLibelle, UN, ZERO } from "@util/Utils";
import {
  ListeGlisserDeposer,
  ListeItem
} from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useContext, useState } from "react";
import {
  IMentions,
  MiseAJourMentionsContext
} from "../../ApercuRequeteMiseAJourPage";
import { MiseAJourMentionsForm } from "./form/MiseAJourMentionsForm";

const CARACTERES_MAXIMUM_LIBELLE_LISTE = 300;

const MiseAJourMentions: React.FC = () => {
  const {
    listeMentions,
    setListeMentions,
    numeroOrdreEnModification,
    setNumeroOrdreEnModification,
    estFormulaireDirty
  } = useContext(MiseAJourMentionsContext);
  const [estPoppinOuverte, setEstPoppinOuverte] = useState<boolean>(false);
  const [itemASupprimer, setItemASupprimer] = useState<number>();

  const getLibelleTitreFormulaire = () => {
    let libelle: string;
    if (numeroOrdreEnModification !== undefined) {
      libelle = getLibelle("Modification d'une mention");
    } else {
      libelle =
        listeMentions.length === ZERO
          ? getLibelle("Ajout d'une mention")
          : getLibelle("Ajout d'une autre mention");
    }
    return libelle;
  };

  const handlePopinSupression = (value: boolean, idItem?: number) => {
    setItemASupprimer(idItem);
    setEstPoppinOuverte(value);
  };

  const supprimerMention = (id?: number) => {
    if (id !== undefined) {
      const listeMentionsFiltree = listeMentions
        .filter(mention => {
          return mention.numeroOrdre !== id + UN;
        })
        .map((mention, index) => {
          return {
            ...mention,
            numeroOrdre: Number(index) + UN
          };
        });
      setListeMentions(listeMentionsFiltree);
      setEstPoppinOuverte(false);
      setItemASupprimer(undefined);
    }
  };

  const onClickModifierMention = (id: number) =>
    setNumeroOrdreEnModification(id);

  const onClickSupprimerMention = (id: number) =>
    handlePopinSupression(true, id);

  return (
    <>
      <ListeGlisserDeposer
        liste={mappingMentionsFormVersTableauMentions(
          listeMentions,
          !estFormulaireDirty
        )}
        handleReorga={(indexPrec: number, indexCourant: number) =>
          handleReorga(listeMentions, setListeMentions, indexPrec, indexCourant)
        }
        onClickSupprimer={onClickSupprimerMention}
        onClickModifier={onClickModifierMention}
        afficheDragHandle={!estFormulaireDirty}
        useDragHandle={false}
        libellesSontTitres={false}
        nombreCaracteresMaximum={CARACTERES_MAXIMUM_LIBELLE_LISTE}
        afficheInfoBulle
      />
      <MiseAJourMentionsForm
        libelleTitreFormulaire={getLibelleTitreFormulaire()}
      />
      <ConfirmationPopin
        boutons={[
          {
            label: getLibelle("OK"),
            action: () => {
              supprimerMention(itemASupprimer);
            }
          },
          {
            label: getLibelle("Annuler"),
            action: () => {
              handlePopinSupression(false);
            }
          }
        ]}
        estOuvert={estPoppinOuverte}
        messages={[
          `Vous avez demandé la suppression d'une mention.\n\nVoulez-vous continuer ?`
        ]}
      />
    </>
  );
};

export default MiseAJourMentions;

const mappingMentionsFormVersTableauMentions = (
  mentions: IMentions[],
  afficheIconesEditionTableauMentions = true
): ListeItem[] => {
  return mentions.map((mention, index) => {
    return {
      id: `${index}.${mention.typeMention}`,
      estSupprimable: afficheIconesEditionTableauMentions,
      estModifiable: afficheIconesEditionTableauMentions,
      checkbox: true,
      libelle: mention.texte
    };
  });
};

const handleReorga = (
  mentions: IMentions[] | undefined,
  setMentions: any,
  oldIndex: number,
  newIndex: number
) => {
  if (mentions) {
    const newList = [...mentions];
    const item = newList[oldIndex];
    newList.splice(oldIndex, UN);
    newList.splice(newIndex, ZERO, item);
    newList.forEach((el, index) => {
      el.numeroOrdre = index + UN;
    });
    setMentions(newList);
  }
};
