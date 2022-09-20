import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import React from "react";
import { ActeImage } from "../../../../fiche/hook/constructionComposants/acte/ActeImage";

interface VisionneuseActeEditionProps {
  acte?: IFicheActe;
  detailRequete: IRequeteDelivrance;
}

export const VisionneuseActeEdition: React.FC<
  VisionneuseActeEditionProps
> = props => {
  return (
    <>
      <AlertesActes
        idActeInit={props.acte?.id ? props.acte?.id : ""}
        detailRequete={props.detailRequete}
      />
      <ActeImage id={props.acte?.id} estReecrit={props.acte?.estReecrit} />
    </>
  );
};
