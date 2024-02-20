import { IMentionAffichage } from "@model/etatcivil/acte/mention/IMentionAffichage";
import { handleReorga } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { getLibelle, ZERO } from "@util/Utils";
import { ListeGlisserDeposer } from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import React, { useState } from "react";
import { mappingMentionAffichageVersListeItem } from "../../../../../common/mapping/mappingMentions";
import { MiseAJourMentionsForm } from "./form/MiseAJourMentionsForm";

interface IMiseAJourMentions {
  mentionsAffichees: IMentionAffichage[];
}

const CARACTERES_MAXIMUM_LIBELLE_LISTE = 300;

const MiseAJourMentions: React.FC<IMiseAJourMentions> = ({
  mentionsAffichees
}) => {
  const [mentionsEditees, setMentionsEditees] =
    useState<IMentionAffichage[]>(mentionsAffichees);

  const libelleTitreFormulaire =
    mentionsEditees.length === ZERO
      ? getLibelle("Ajout d'une mention")
      : getLibelle("Ajout d'une autre mention");

  return (
    <>
      <ListeGlisserDeposer
        liste={mappingMentionAffichageVersListeItem(mentionsEditees)}
        handleReorga={(indexPrec: number, indexCourant: number) =>
          handleReorga(
            mentionsEditees,
            setMentionsEditees,
            indexPrec,
            indexCourant
          )
        }
        onClickSupprimer={() => {
          throw new Error("Function not implemented.");
        }}
        onClickModifier={() => {
          throw new Error("Function not implemented.");
        }}
        afficheDragHandle={true}
        useDragHandle={false}
        libellesSontTitres={false}
        nombreCaracteresMaximum={CARACTERES_MAXIMUM_LIBELLE_LISTE}
      />
      <MiseAJourMentionsForm libelleTitreFormulaire={libelleTitreFormulaire} />
    </>
  );
};

export default MiseAJourMentions;
