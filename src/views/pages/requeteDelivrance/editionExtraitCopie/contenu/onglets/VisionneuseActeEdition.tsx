import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import { provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer } from "@model/agent/IOfficier";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import React, { useEffect, useState } from "react";
import { ActeImage } from "../../../../fiche/hook/constructionComposants/acte/ActeImage";

interface VisionneuseActeEditionProps {
  acte?: IFicheActe;
  detailRequete: IRequeteDelivrance;
}

export const VisionneuseActeEdition: React.FC<
  VisionneuseActeEditionProps
> = props => {
  /* Etat ajout des alertes possible */
  const [ajoutAlertePossible, setAjoutAlertePossible] =
    useState<boolean>(false);

  /* Gestion de l'affichage des boutons d'ajout des alertes */
  useEffect(() => {
    if (props.detailRequete) {
      setAjoutAlertePossible(
        provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer(
          props.detailRequete?.provenanceRequete?.provenance?.libelle
        )
      );
    }
  }, [props.detailRequete]);

  return (
    <>
      <AlertesActes
        idActeInit={props.acte?.id ? props.acte?.id : ""}
        detailRequete={props.detailRequete}
        ajoutAlertePossible={ajoutAlertePossible}
      />
      <ActeImage id={props.acte?.id} estReecrit={props.acte?.estReecrit} />
    </>
  );
};
