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
    setNumeroOrdreEnModification
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

  const onClickModifierMentions = (id: number) => {
    setNumeroOrdreEnModification(id);
  };

  return (
    <>
      <ListeGlisserDeposer
        liste={mappingMentionsFormVersTableauMentions(
          listeMentions,
          numeroOrdreEnModification
        )}
        handleReorga={(indexPrec: number, indexCourant: number) =>
          handleReorga(listeMentions, setListeMentions, indexPrec, indexCourant)
        }
        onClickSupprimer={id => handlePopinSupression(true, id)}
        onClickModifier={onClickModifierMentions}
        afficheDragHandle={numeroOrdreEnModification === undefined}
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
        isOpen={estPoppinOuverte}
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
  estModification?: number
): ListeItem[] => {
  return mentions.map((mention, index) => {
    return {
      id: `${index}.${mention.typeMention}`,
      estSupprimable: estModification === undefined,
      estModifiable: estModification === undefined,
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
