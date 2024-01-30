import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import { VisionneuseActe } from "@composant/visionneuseActe/VisionneuseActe";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import React from "react";

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
      <VisionneuseActe
        idActe={props.acte?.id}
        typeActe={props.acte?.type}
        estReecrit={props.acte?.estReecrit}
      />
    </>
  );
};
